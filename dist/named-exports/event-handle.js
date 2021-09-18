"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useEventEffect = exports.useEventHandle = exports.ComponentEvent = void 0;

var _objectPath = _interopRequireDefault(require("object-path"));

var _react = _interopRequireWildcard(require("react"));

var _nodePolyfill = require("../node-polyfill");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class ComponentEvent extends _nodePolyfill.CustomEvent {
  constructor(type, data) {
    super(type, data);

    _objectPath.default.del(data, 'type');

    _objectPath.default.del(data, 'target');

    Object.entries(data || {}).forEach(([key, value]) => {
      if (key === 'proto__' || key === '__proto__') return;

      if (!this[key]) {
        try {
          this[key] = value;
        } catch (err) {}
      } else {
        key = `__${key}`;
        this[key] = value;
      }
    });
  }

}

exports.ComponentEvent = ComponentEvent;

class ComponentTarget extends _nodePolyfill.EventTarget {
  constructor(handle = {}) {
    delete handle.update;
    super();

    this.update = values => Object.entries(values).forEach(([key, value]) => this[key] = value);

    this.update(handle);
  }

}
/**
 * @api {ReactHook} useEventHandle(handle) useEventHandle()
 * @apiDescription React hook to create an imperative handle that is also an implementation of EventTarget. Can be used in
conjunction with useImperativeHandle (React built-in) or useRegisterHandle/useHandle (Reactium SDK hooks).
 * @apiParam {Object} handle Interface for interacting with your component.
 * @apiName useEventHandle
 * @apiGroup ReactHook
 * @apiExample EventHandleComponent.js
import React, { useEffect } from 'react';
import { useRegisterHandle, useEventHandle } from 'reactium-core/sdk';

const EventHandleComponent = () => {
     const [ value, setValue ] = useState(1);
     const createHandle = () => ({
         value, setValue,
     });

     const [ handle, setHandle ] = useEventHandle(createHandle());

     useEffect(() => {
         setHandle(createHandle());
     }, [value]);

     useRegisterHandle('EventHandleComponent', () => handle);

     const onClick = () => {
         if (handle) {
            setValue(value + 1);
            handle.dispatchEvent(new CustomEvent('do-something'));
         }
     }

     return (<button onClick={onClick}>Click Me ({value})</button>);
 };

 export default EventHandleComponent;
 * @apiExample EventHandleConsumer.js
import React, { useEffect, useState } from 'react';
import { useHandle } from 'reactium-core/sdk';

const EventHandleConsumer = props => {
    const [state, setState] = useState();
    const handleEventTarget = useHandle('EventHandleComponent');

    // when 'do-something' event occurs on
    // EventHandleComponent, this component can react
    const onDoSomething = e => {
        setState(e.target.value);
    };

    useEffect(() => {
        if (handleEventTarget) {
            handleEventTarget.addEventListener('do-something', onDoSomething);
        }
        return () => handleEventTarget.removeEventListener('do-something', onDoSomething);
    }, [handleEventTarget]);

    return (
        <div>
            value: {state}
        </div>
    );
};

export default EventHandleConsumer;
 */


const useEventHandle = value => {
  const [handle] = (0, _react.useState)(new ComponentTarget(value));

  const setHandle = value => {
    handle.update(value);
  };

  return [handle, setHandle];
};
/**
 * @api {ReactHook} useEventEffect(eventTarget,eventCallbacks,deps) useEventEffect()
 * @apiVersion 1.0.7
 * @apiDescription React hook to short hand for addEventListener and removeEventLister for one or more callbacks.
 * @apiParam {Object} eventTarget Some event target object (implementing addEventListener and removeEventLister)
 * @apiParam {Object} eventCallbacks Object keys are event names, and Object values are callbacks to be subscribed/unsubscribed.
 * @apiParam {useEffectDeps} deps consistent with React useEffect deps list.
 * @apiName useEventEffect
 * @apiGroup ReactHook
 * @apiExample EventEffectComponent.js
 import React, { useState } from 'react';
 import { useEventEffect } from 'reactium-core/sdk';

 const EventEffectComponent = () => {
     const [size, setSize] = useState({
         width: window.innerWidth,
         height: window.innerHeight,
     });

     const [online, setOnline] = useState(window.onLine);

     const onResize = e => {
         setSize({
             width: window.innerWidth,
             height: window.innerHeight,
         });
     };

     const onNetworkChange = e => {
         setOnline(window.onLine);
     };

     useEventEffect(
         window,
         {
             resize: onResize,
             online: onNetworkChange,
             offline: onNetworkChange,
         },
         [],
     );

     return (
         <div className='status'>
             <span className='status-width'>width: {size.width}</span>
             <span className='status-height'>height: {size.height}</span>
             <span className={`status-${online ? 'online' : 'offline'}`}></span>
         </div>
     );
 };
*/


exports.useEventHandle = useEventHandle;

const useEventEffect = (target = null, handlers = {}, deps) => {
  (0, _react.useEffect)(() => {
    const subs = {}; // sanitize handlers

    Object.entries(handlers).forEach(([type, cb]) => {
      if (typeof cb === 'function') {
        subs[type] = cb;
      }
    }); // duck-type EventTarget

    if (typeof target === 'object' && 'addEventListener' in target && 'removeEventListener' in target) {
      Object.entries(subs).forEach(([type, cb]) => target.addEventListener(type, cb));
    }

    return () => {
      Object.entries(subs).forEach(([type, cb]) => target.removeEventListener(type, cb));
    };
  }, deps);
};

exports.useEventEffect = useEventEffect;