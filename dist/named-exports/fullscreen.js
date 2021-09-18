"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Fullscreen = void 0;

var _fullscrn = _interopRequireDefault(require("fullscrn"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @api {Class} Fullscreen Fullscreen
 * @apiGroup Reactium.Utilities
 * @apiName Fullscreen
 * @apiDescription Cross browser utility for toggling fullscreen mode.
 * @apiParam (Event) {Event} fullscreenchange Triggered when the browser's fullscreen state changes.
 * @apiExample Usage:
 // isExpanded()
 Reactium.Utils.Fullscreen.isExpanded();

 // isCollapsed()
 Reactium.Utils.Fullscreen.isCollapsed();

 // collapse()
 Reactium.Utils.Fullscreen.collapse();

 // expand()
 Reactium.Utils.Fullscreen.expand();

 // toggle()
 Reactium.Utils.Fullscreen.toggle();

 // Event: fullscreenchange
import React, { useEffect, useState } from 'react';
import Reactium from 'reactium-core/sdk';

const MyComponent = () => {
    const [state, setState] = useState(Reactium.Utils.Fullscreen.isExpanded());

    const update = () => {
        setState(Reactium.Utils.Fullscreen.isExpanded());
    }

    useEffect(() => {
        // ssr safety
        if (typeof document === 'undefined') return;

        // listen for fullscreenchange
        document.addEventListener('fullscreenchange', update);

        // prevent memory leak
        return () => {
            document.removeEventListener('fullscreenchange', update);
        };
    });

    return (<div>{state}</div>);
};
 */
class FullscreenClass {
  constructor(element) {
    this.isExpanded = () => document.fullscreen;

    this.isCollapsed = () => !document.fullscreen;

    this.collapse = () => document.exitFullscreen();

    this.expand = async () => {
      init();
      this.element.requestFullscreen();
    };

    this.toggle = () => this.isExpanded() ? this.collapse() : this.expand();

    this.initialized = false;
    this.element = element;
  }

  init() {
    if (this.initialized === true) return;

    if (!this.element) {
      this.element = document;
    }

    document.addEventListener('fullscreenchange', update);
    this.initialized = true;
  }

  update() {
    document.body.classList.remove('fullscreen');

    if (!this) {
      document.removeEventListener('fullscreenchange', update);
      return;
    }

    if (document.fullscreen) {
      document.body.classList.add('fullscreen');
    }
  }

}

const Fullscreen = new FullscreenClass();
exports.Fullscreen = Fullscreen;