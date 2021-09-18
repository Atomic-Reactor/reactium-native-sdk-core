"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _reactNativeMmkv = require("react-native-mmkv");

var _memoryCache = _interopRequireDefault(require("memory-cache"));

var _objectPath = _interopRequireDefault(require("object-path"));

var _underscore = _interopRequireDefault(require("underscore"));

var _v = _interopRequireDefault(require("uuid/v4"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @api {Object} Cache Cache
 * @apiVersion 3.0.3
 * @apiName Cache
 * @apiGroup Reactium.Cache
 * @apiDescription Cache allows you to easily store application data in memory.
 */
const denormalizeKey = keyString => {
  return Array.isArray(keyString) ? keyString : keyString.split('.');
};

const normalizeKey = key => {
  return Array.isArray(key) ? key.join('.') : key;
};

const getKeyRoot = key => {
  const k = denormalizeKey(key)[0];
  return k;
};

const getValue = key => {
  const v = _memoryCache.default.get(getKeyRoot(key));

  return v;
};

class Cache {
  constructor() {
    this._store = null;
    this._loaded = false;
    this._subscribers = {};
    this._subscribedPaths = {};
  }

  get keys() {
    return _memoryCache.default.keys;
  }

  get subscribers() {
    return this._subscribers;
  }

  get subscribedPaths() {
    return this._subscribedPaths;
  }

  get size() {
    return _memoryCache.default.size;
  }

  get store() {
    const s = this._store || new _reactNativeMmkv.MMKV();
    this._store = s;
    return s;
  }

  get memsize() {
    return _memoryCache.default.memsize;
  }

  subscribe(key, cb) {
    const id = (0, _v.default)();
    const keyParts = denormalizeKey(normalizeKey(key));
    this._subscribers[id] = cb;

    for (let i = 0; i < keyParts.length; i++) {
      const partial = keyParts.slice(0, i + 1);
      const key = normalizeKey(partial);

      if (!(key in this._subscribedPaths)) {
        this._subscribedPaths[key] = {};
      }

      _objectPath.default.set(this._subscribedPaths[key], id, id);
    }

    return () => {
      delete this._subscribers[id];

      for (let i = 0; i < keyParts.length; i++) {
        const partial = keyParts.slice(0, i + 1);
        const key = normalizeKey(partial);

        _objectPath.default.del(this._subscribedPaths[key], id);
      }
    };
  }

  keySubscribers(key) {
    const keyParts = denormalizeKey(normalizeKey(key));
    let keySubs = [];

    for (let i = 0; i < keyParts.length; i++) {
      const partial = keyParts.slice(0, i + 1);
      const key = normalizeKey(partial);

      if (key in this._subscribedPaths) {
        keySubs = _underscore.default.uniq(keySubs.concat(Object.keys(this._subscribedPaths[key])));
      }
    }

    return keySubs.reduce((subs, id) => subs.concat([this._subscribers[id]]), []);
  }

  put(key, value, time, timeoutCallback) {
    key = normalizeKey(key);
    let curr = getValue(key);
    const keyArray = denormalizeKey(key);
    const keyRoot = keyArray[0];
    const subscribers = this.keySubscribers(key);
    const params = [time];

    const expireCallback = () => {
      const subscribers = this.keySubscribers(key);
      if (timeoutCallback) timeoutCallback();
      subscribers.forEach(cb => {
        cb({
          op: 'expire',
          key
        });
      });
    };

    if (time) params.push(expireCallback);

    if (keyArray.length > 1) {
      curr = curr || {};
      keyArray.shift();

      _objectPath.default.set(curr, keyArray.join('.'), value);

      _memoryCache.default.put(keyRoot, curr, ...params);
    } else {
      _memoryCache.default.put(key, value, ...params);
    }

    this.store.set('store', JSON.stringify(this.get()));
    subscribers.forEach(cb => {
      cb({
        op: 'set',
        key,
        value
      });
    });
  }

  set(...args) {
    this.put(...args);
  }

  get(key, defaultValue) {
    key = normalizeKey(key);

    if (!key) {
      const keys = _memoryCache.default.keys();

      return keys.reduce((obj, key) => {
        obj[key] = _memoryCache.default.get(key);
        return obj;
      }, {});
    }

    const keyArray = String(key).split('.');

    if (keyArray.length > 1) {
      keyArray.shift();
      return _objectPath.default.get(getValue(key), keyArray.join('.'), defaultValue);
    } else {
      return _memoryCache.default.get(key) || defaultValue;
    }
  }

  del(key, ...args) {
    key = normalizeKey(key);
    let curr = getValue(key);
    const keyRoot = getKeyRoot(key);
    const keyArray = denormalizeKey(key);
    const subscribers = this.keySubscribers(key);

    if (curr) {
      if (keyArray.length > 1) {
        curr = curr || {};
        keyArray.shift();

        _objectPath.default.del(curr, keyArray.join('.'));

        _memoryCache.default.put(keyRoot, curr, ...args);
      } else {
        _memoryCache.default.del(key);
      }
    }

    this.store.set('store', JSON.stringify(this.get()));
    subscribers.forEach(cb => {
      cb({
        op: 'del',
        key
      });
    });
  }

  clear() {
    _memoryCache.default.clear();

    const subscribers = Object.values(this._subscribers);
    this.store.set('store', JSON.stringify(this.get()));
    subscribers.forEach(cb => {
      cb({
        op: 'clear'
      });
    });
  }

  merge(values, options) {
    const dayjs = require('dayjs');

    options = options || {
      skipDuplicates: false
    };
    values = Object.keys(values).reduce((obj, key) => {
      const value = values[key];

      const expire = _objectPath.default.get(value, 'expire');

      if (typeof expire === 'number') {
        value.expire = dayjs(Date.now()).add(expire, 'milliseconds').valueOf();
      }

      obj[key] = value;
      Object.values(subscribers).forEach(cb => {
        cb({
          op: 'merge',
          obj
        });
      });
      return obj;
    }, {});
    return _memoryCache.default.importJson(JSON.stringify(values));
  }

  load() {
    if (this._loaded !== false) return;
    let store = this.store.getString('store') || '{}';
    store = typeof store === 'string' ? JSON.parse(store) : store;
    Object.entries(store).forEach(([key, value]) => this.set(key, value));
    this._loaded = true;
  }

} // Statics


Cache.denormalizeKey = denormalizeKey;
Cache.normalizeKey = normalizeKey;
Cache.getKeyRoot = getKeyRoot;

var _default = new Cache();

exports.default = _default;