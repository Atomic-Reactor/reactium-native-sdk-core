"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _objectPath = _interopRequireDefault(require("object-path"));

var _registry = _interopRequireDefault(require("../utils/registry"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Style extends _registry.default {
  constructor() {
    super('style', 'id', _registry.default.MODES.CLEAN);
  }

}

var _default = new Style();

exports.default = _default;