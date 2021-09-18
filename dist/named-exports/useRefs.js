"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useEventRefs = exports.useRefs = exports.createRefsProxyFactory = void 0;

var _objectPath = _interopRequireDefault(require("object-path"));

var _react = _interopRequireWildcard(require("react"));

var _eventHandle = require("./event-handle");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const refsProxyHandler = (refs, key) => ({
  get(target, prop) {
    if (prop === 'current') return refs.get(key);
    if (prop in target) return target[prop];
  },

  set(target, prop, value) {
    if (prop === 'current') {
      refs.set(key, value);
      return true;
    }

    if (target in refs) target[prop] = value;
    return true;
  }

});

const createRefsProxyFactory = refs => key => new Proxy( /*#__PURE__*/_react.default.createRef(), refsProxyHandler(refs, key));

exports.createRefsProxyFactory = createRefsProxyFactory;

const useRefs = (initialRefs = {}) => {
  const ref = (0, _react.useRef)(initialRefs);

  const get = (key, defaultValue) => {
    if (!key) {
      return ref.current;
    }

    return _objectPath.default.get(ref.current, key, defaultValue);
  };

  const set = (key, value) => {
    if (!ref.current) return;

    _objectPath.default.set(ref.current, key, value);
  };

  const del = key => {
    if (!ref.current) return;

    _objectPath.default.del(ref.current, key);
  };

  const clear = () => {
    if (!ref.current) return;
    ref.current = null;
  };

  const refs = {
    get,
    set,
    del,
    clear,
    ...ref.current
  };
  refs.createProxy = createRefsProxyFactory(refs);
  return refs;
};

exports.useRefs = useRefs;

const useEventRefs = (initialRefs = {}, refProxy = false) => {
  const {
    get: refsGet,
    set: refsSet,
    del: refsDel,
    clear: refsClear,
    createProxy: refsCreateProxy,
    ...refs
  } = useRefs(initialRefs);
  const [handle, setHandle] = (0, _eventHandle.useEventHandle)({});

  const get = (key, defaultValue) => {
    const val = refsGet.get(key, defaultValue);

    if (!key) {
      return ref.current;
    }

    return _objectPath.default.get(ref.current, key, defaultValue);
  };

  const set = (key, value) => {
    handle.dispatchEvent(new _eventHandle.ComponentEvent('before-set', {
      key,
      value
    }));
    refsSet(key, value);
    handle.dispatchEvent(new _eventHandle.ComponentEvent('set', {
      key,
      value
    }));
  };

  const del = key => {
    handle.dispatchEvent(new _eventHandle.ComponentEvent('before-del', {
      key
    }));
    refsDel(key);
    handle.dispatchEvent(new _eventHandle.ComponentEvent('del', {
      key
    }));
  };

  const clear = () => {
    handle.dispatchEvent(new _eventHandle.ComponentEvent('before-clear', {}));
    refsClear(key);
    handle.dispatchEvent(new _eventHandle.ComponentEvent('clear', {}));
  };

  const handleDecorated = {
    get: refsGet,
    set,
    del,
    clear,
    ...refs
  };
  setHandle(handleDecorated);
  handle.createProxy = createRefsProxyFactory(handle);
  return handle;
};
/**
 * @api {ReactHook} useRefs() useRefs()
 * @apiGroup ReactHook
 * @apiName useRefs
 * @apiDescription Creates a single reference object that can be managed using the `get`/`set`/`del`/`clear` functions.
 * @apiExample Usage
import React, { useEffect, useState } from 'react';
import { useRefs } from '@atomic-reactor/reactium-sdk-core';

const MyComponent = () => {
    const refs = useRefs();
    const [state, setState] = useState({ input: null });

    const onClick = () => {
        const inputElm = refs.get('input');
        setState({ ...state, input: inputElm.value });
        inputElm.value = '';
    };

    return (
        <div ref={elm => refs.set('container', elm)}>
            {state.input && <div>{state.input}</div>}
            <input type='text' ref={elm => refs.set('input', elm)} />
            <button onClick={onClick}>Update</button>
        </div>
    );
};
* @apiExample Proxy Reference Usage
// sometimes you need a forwarded ref to be a ref object from useRef() or React.createRef()
// You can create proxy factory for the refs to achieve this.
import React, { useEffect, useState } from 'react';
import { EventForm } from '@atomic-reactor/reactium-ui';
import { useRefs } from '@atomic-reactor/reactium-sdk-core';

const MyComponent = () => {
   const refs = useRefs();
   // creates a factory for React.createRef() object to your refs
   const refProxy = refs.createProxy('form');

   const [state, setState] = useState({});

   const onSubmit = e => {
       const formRef = refs.get('form');
       setState({ ...formRef.getValue() });
   };

   // EventForm expects a reference object, not a callback function
   // When EventForm references ref.current, it will actually get refs.get('form').
   // When EventForm sets the ref.current value, it will actually perform refs.set('form', value);
   return (
       <EventForm ref={refProxy} onSubmit={onSubmit}>
           <input type='text' name="foo" />
           <button type="submit">Submit the Form</button>
       </EventForm>
   );
};
 */

/**
  * @api {ReactHook} useEventRefs() useEventRefs()
  * @apiVersion 1.0.7
  * @apiGroup ReactHook
  * @apiName useEventRefs
  * @apiDescription Like useRefs, creates a single reference object that can be managed using the `get`/`set`/`del`/`clear` functions, however also an EventTarget object.
  * `set`/`del`/`clear` methods dispatch `before-set`/`set`, `before-del`/`del`, and `before-clear`/`clear` events respectively.
  * @apiExample Usage
 import React, { useState } from 'react';
 import { useRefs } from '@atomic-reactor/reactium-sdk-core';

 const MyComponent = () => {
     const refs = useEventRefs();
     const [ready, setReady] = useState(false);

     const onChildRefReady = e => {
         if (e.key === 'my.component') {
             setReady(refs.get(e.key) !== undefined);
         }
     };

     useEffect(() => {
         refs.addEventListener('set', onChildRefReady);
         return () => refs.removeEventListener('set', onChildRefReady);
     }, []);

     return (
         <MyForwardRefComponent ref={cmp => refs.set('my.component', cmp)} />
         {ready && <Controller control={refs.get('my.component')} />}
     );
 };
  */


exports.useEventRefs = useEventRefs;