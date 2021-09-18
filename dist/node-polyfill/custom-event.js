"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _event = _interopRequireDefault(require("./event"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Custom extends _event.default {
  constructor(type) {
    super(type);
  }

}

var _default = Custom;
exports.default = _default;