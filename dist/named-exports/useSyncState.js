"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useSyncState = void 0;

var _react = require("react");

var _objectPath = _interopRequireDefault(require("object-path"));

var _underscore = _interopRequireDefault(require("underscore"));

var _eventHandle = require("./event-handle");

var _nodePolyfill = require("../node-polyfill");

var _hook = _interopRequireDefault(require("../hook"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class ReactiumSyncState extends _nodePolyfill.EventTarget {
  constructor(initialState) {
    super();

    this.get = (path, defaultValue) => {
      if (typeof path == 'string' || Array.isArray(path)) {
        return _objectPath.default.get(this.stateObj.state, path, defaultValue);
      } else {
        return this.stateObj.state;
      }
    };

    this._setArgs = (path, value) => {
      // path looks like object path or is explicitly false
      if ((path === false || typeof path == 'string' || Array.isArray(path)) && typeof value != 'undefined') {
        return [path, value];
      } // path looks like the value


      return [false, path];
    };

    this._conditionallyMerge = (previous, next) => {
      const noMergeConditions = [(p, n) => !_underscore.default.isObject(p) || !_underscore.default.isObject(n), (p, n) => typeof p != typeof n, (p, n) => _underscore.default.isElement(n), (p, n) => _underscore.default.isBoolean(n), (p, n) => _underscore.default.isArray(n), (p, n) => _underscore.default.isString(n), (p, n) => _underscore.default.isNumber(n), (p, n) => _underscore.default.isDate(n), (p, n) => _underscore.default.isError(n), (p, n) => _underscore.default.isRegExp(n), (p, n) => _underscore.default.isNull(n), (p, n) => _underscore.default.isSymbol(n)];

      _hook.default.runSync('use-sync-state-merge-conditions', noMergeConditions, this); // merge not possible or necessary


      if (!_underscore.default.isEmpty(noMergeConditions.filter(condition => condition(previous, next)))) {
        return next;
      }

      return { ...previous,
        ...next
      };
    };

    this.extend = (prop, method) => {
      if (typeof method == 'function') {
        this[prop] = method.bind(this);
      }
    };

    this.set = (pathArg, valueArg, update = true) => {
      const [path, value] = this._setArgs(pathArg, valueArg);

      if (path) {
        _objectPath.default.set(this.stateObj.state, path, this._conditionallyMerge(_objectPath.default.get(this.stateObj.state, path), value));
      } else {
        this.stateObj.state = this._conditionallyMerge(this.stateObj.state, value);
      }

      if (update) {
        this.dispatchEvent(new _eventHandle.ComponentEvent('set', {
          path,
          value
        }));
        if (typeof this.updater == 'function') this.updater(new Date());
      }

      return this;
    };

    this.stateObj = {
      state: initialState
    };
  }

}
/**
 * @api {ReactHook} useSyncState(initialState) useSyncState()
 * @apiDescription Intended to provide an object to get and set state synchrounously, while providing a EventTarget object that can dispatch a 'set' event when
 * the state is updated.
 * @apiParam {Mixed} initialState The initial state.
 * @apiName useSyncState
 * @apiGroup ReactHook
 * @apiExample SimpleExample
 * import React from 'react';
 * import { useSyncState } from 'reactium-core/sdk';
 * export const SimpleExample = () => {
    const clickState = useSyncState({ clicks: 1 });
    const clicks = clickState.get('clicks');
    return (
        <div>Clicked {clicks} times <button
            onClick={() => clickState.set('clicks', clicks + 1)}>Click Me</button>
        </div>
    );
 };
 * @apiExample EventTarget
 * import React from 'react';
 * import { useSyncState, useRegisterHandle } from 'reactium-core/sdk';
 * export const Clicker = () => {
    const clickState = useSyncState({ clicks: 1 });
    const clicks = clickState.get('clicks');
    useRegisterHandle('ClickState', () => clickState);

    return (
        <div>Clicked {clicks} times <button
            onClick={() => clickState.set('clicks', clicks + 1)}>Click Me</button>
        </div>
    );
 };
 * @apiExample Consumer
 * import React, { useState, useEventEffect } from 'react';
 * import { useHandle } from 'reactium-core/sdk';
 * // communicate state with other components
 * export const Listener = () => {
    const [clicked, setClicked] = useState(false);
    const handle = useHandle('ClickState')
    const numClicks = handle.get('clicks');

    const remoteClicked = e => {
        if (numClicks < e.get('clicks')) {
            setClicked(true);
        }
    };

    useEventEffect(handle, { set: remoteClicked }, []);

    return (
        <div>Clicker {clicked ? 'unclicked' : 'clicked'}</div>
    );
 };
 */


const useSyncState = initialState => {
  const stateRef = (0, _react.useRef)(new ReactiumSyncState(initialState));
  const [, updater] = (0, _react.useState)(new Date());
  stateRef.current.updater = updater;
  return stateRef.current;
};

exports.useSyncState = useSyncState;