"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isElectronWindow = exports.isElectron = exports.isBrowserWindow = exports.isServerWindow = exports.isWindow = void 0;

var _utils = _interopRequireDefault(require("../utils"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const isWindow = _utils.default.isWindow;
exports.isWindow = isWindow;
const isServerWindow = _utils.default.isServerWindow;
exports.isServerWindow = isServerWindow;
const isBrowserWindow = _utils.default.isBrowserWindow;
exports.isBrowserWindow = isBrowserWindow;
const isElectron = _utils.default.isElectron;
exports.isElectron = isElectron;
const isElectronWindow = _utils.default.isElectron;
exports.isElectronWindow = isElectronWindow;