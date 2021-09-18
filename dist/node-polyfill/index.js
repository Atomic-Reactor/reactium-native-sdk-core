"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "EventTarget", {
  enumerable: true,
  get: function () {
    return _eventTarget.default;
  }
});
Object.defineProperty(exports, "Event", {
  enumerable: true,
  get: function () {
    return _event.default;
  }
});
Object.defineProperty(exports, "CustomEvent", {
  enumerable: true,
  get: function () {
    return _customEvent.default;
  }
});

var _eventTarget = _interopRequireDefault(require("./event-target"));

var _event = _interopRequireDefault(require("./event"));

var _customEvent = _interopRequireDefault(require("./custom-event"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

if (typeof window === 'undefined') {
  if (typeof global.EventTarget === 'undefined') global.EventTarget = _eventTarget.default;
  if (typeof global.CustomEvent === 'undefined') global.CustomEvent = _customEvent.default;
  if (typeof global.Event === 'undefined') global.Event = _event.default;
}