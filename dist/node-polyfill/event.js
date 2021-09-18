"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

class Event {
  constructor(type) {
    this.type = null;
    this.bubbles = false;
    this.cancelBubble = false;
    this.cancelable = true;
    this.composed = false;
    this.defaultPrevented = false;
    this.target = null;
    this.type = type;
  }

  preventDefault() {
    if (cancelable) this.defaultPrevented = true;
  }

  stopPropagation() {}

  stopImmediatePropagation() {}

}

Event.createEvent = type => new Event(type);

var _default = Event;
exports.default = _default;