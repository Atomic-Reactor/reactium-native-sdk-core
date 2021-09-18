"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _objectPath = _interopRequireDefault(require("object-path"));

var _registry = _interopRequireDefault(require("../utils/registry"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Route extends _registry.default {
  constructor() {
    super('router', 'id', _registry.default.MODES.CLEAN);
    this.__nav = null;
  }

  register(id, data = {}) {
    const reqs = ['name', 'component'];
    const err = reqs.reduce((e, key) => {
      e += !_objectPath.default.get(data, key) ? 1 : 0;
      return e;
    }, 0);

    if (err > 0) {
      throw new Error('Route.register() error. Data object must define the name and component values');
    } else {
      super.register(id, data);
    }
  }

  get navigation() {
    return this.__nav;
  }

  set navigation(value) {
    this.__nav = value;
  }

}

var _default = new Route('router');

exports.default = _default;