"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _underscore = _interopRequireDefault(require("underscore"));

var _registry = _interopRequireDefault(require("./registry"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Utils = {};

Utils.registryFactory = (name, idField, mode) => new _registry.default(name, idField, mode);

Utils.Registry = _registry.default;
var _default = Utils;
exports.default = _default;