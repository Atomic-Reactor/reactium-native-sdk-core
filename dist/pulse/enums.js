"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _v = _interopRequireDefault(require("uuid/v4"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const ENUMS = {
  ERROR: {
    ID: 'Pulse.register() - ID is a required parameter',
    CALLBACK: 'Pulse.register() - The callback function is a required parameter'
  },
  DEBUG: false,
  DEFAULT: {
    ATTEMPTS: -1,
    AUTOSTART: true,
    DELAY: 1000,
    REPEAT: -1
  },
  STATUS: {
    ERROR: 'ERROR',
    READY: 'READY',
    RUNNING: 'RUNNING',
    STARTED: 'STARTED',
    STOPED: 'STOPPED'
  }
};
var _default = ENUMS;
exports.default = _default;