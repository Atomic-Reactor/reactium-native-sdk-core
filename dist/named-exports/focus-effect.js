"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useFocusEffect = void 0;

var _underscore = _interopRequireDefault(require("underscore"));

var _objectPath = _interopRequireDefault(require("object-path"));

var _react = require("react");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @api {ReactHook} useFocusEffect(container,dependencies) useFocusEffect()
 * @apiGroup ReactHook
 * @apiName useFocusEffect
 * @apiParam {Element} container The DOM element to search for the 'data-focus' element.
 * @apiParam {Array} [dependencies] Dependencies list passed to `useEffect`.
 * @apiParam (Returns) {Boolean} focused If the 'data-focus' element was found.
 * @apiExample Reactium Usage
import cn from 'classnames';
import React, { useRef } from 'react';
import { useFocusEffect } from 'reactium-core/sdk';

const MyComponent = props => {
    const containerRef = useRef();

    const [focused] = useFocusEffect(containerRef.current);

    return (
        <form ref={containerRef}>
            <input className={cn({ focused })} type='text' data-focus />
            <button type='submit'>Submit</button>
        </form>
    );
};
 * @apiExample Returns
{Array} [focused:Element, setFocused:Function]
 */
const useFocusEffect = (container, deps) => {
  const [focused, setFocused] = (0, _react.useState)();
  (0, _react.useEffect)(() => {
    container = _objectPath.default.has(container, 'current') ? container.current : container;

    const isEmpty = _underscore.default.chain([container]).compact().isEmpty().value();

    if (focused || isEmpty) return;
    const elm = container.querySelector('*[data-focus]');

    if (elm) {
      try {
        elm.focus();
      } catch (err) {
        console.error(err);
      }

      setFocused(elm);
    }
  }, _underscore.default.flatten([deps, focused]));
  return [focused, setFocused];
};

exports.useFocusEffect = useFocusEffect;