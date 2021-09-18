"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useDerivedState = void 0;

var _react = _interopRequireWildcard(require("react"));

var _objectPath = _interopRequireDefault(require("object-path"));

var _underscore = _interopRequireDefault(require("underscore"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const shallowEquals = require('shallow-equals');
/**
 * @api {ReactHook} useDerivedState(props,subscriptions,updateAll) useDerivedState()
 * @apiDescription Sometimes you would like to derive state from your component props,
 * and also allow either a prop change, or an internal state change either to take effect.
 * This hook will allow you to create a state object from your component props,
 * and subscribe (by array of object-paths) only to those prop changes you would like to see
 * reflected in a rendering updates to your component state.
 * This hook returns an array similar in nature to the return of React's built-in
 * `useState()` hook (`[state,setState]`), with some differences.
 *
 * 1. The initial value coming from props (on first render) will contain all that was present in
 the props object passed to it. Note that any values that are not present in your component props
 on first render, or that which are explicitly subscribed to, will not exist in the returned
 state element.
 * 2. The setState callback can receive whole or partial state objects, and will be merged
 with the existing state.
 * 3. There is a third element function `forceRefresh`
 * @apiParam {Object} props the component props
 * @apiParam {Array} [subscriptions] Array of string object-paths in your component
 props you would like to update your component state for. By default, this is empty,
 and if left empty you will get only the initial props, and no updates. Each selected
 property is shallow compared with the previous version of that prop (not the current state).
 Only a change of prop will trigger a prop-based update and rerender.
 * @apiParam {Boolean} [updateAll=false] When true, an update to any subscribed
 object-path on your props will cause *all* the props to imprint on your component
 state.
 * @apiVersion 0.0.14
 * @apiName useDerivedState
 * @apiGroup ReactHook
 * @apiExample Returns
// The hook returns an array containing [state, setState, forceRefresh]
const [state, setState, forceRefresh] = useDerivedState(props, ['path.to.value1', 'path.to.value2']);
* @apiExample Usage
import React from 'react';
import { useDerivedState } from 'reactium-core/sdk';
import op from 'object-path';

const MyComponent = props => {
    const [state, setState] = useDerivedState(props, ['path.to.value1', 'path.to.value2']);
    const value1 = op.get(state, 'path.to.value1', 'Default value 1');
    const value2 = op.get(state, 'path.to.value2', 'Default value 2');

    // setState merges this object with previous state
    const updateValue1 = () => setState({
        path: {
            to: {
                value1: 'foo',
            }
        }
    });

    return (<div>
        <div>Value 1: {value1}</div>
        <div>Value 2: {value2}</div>
        <button onClick={updateValue1}>Update Value 1</button>
    </div>);
}

export default MyComponent;
 */


const useDerivedState = (props, subscriptions = [], updateAll = false) => {
  const getDerivedState = fromValues => subscriptions.reduce((values, path) => {
    values[path] = _objectPath.default.get(fromValues, path);
    return values;
  }, {}); // rerender trigger


  const [, setUpdated] = (0, _react.useState)(Date.now());

  const forceRefresh = () => setUpdated(Date.now()); // everything


  const derivedStateRef = (0, _react.useRef)({ ...props
  }); // only what we care about in props

  const propsVersion = (0, _react.useRef)(Date.now());
  const derivedState = getDerivedState(props);
  const subscribedRef = (0, _react.useRef)(derivedState); // ignores irrelevant prop changes

  const internalPropSetState = (path, value) => {
    const currentValue = _objectPath.default.get(subscribedRef.current, [path]);

    if (!shallowEquals(currentValue, value)) {
      const newSubscribed = { ...subscribedRef.current
      };
      const newDerivedState = { ...derivedStateRef.current
      };

      _objectPath.default.set(newSubscribed, [path], value);

      _objectPath.default.set(newDerivedState, path, value);

      subscribedRef.current = newSubscribed;
      derivedStateRef.current = newDerivedState;
      return true;
    }

    return false;
  }; // public setState always respected and merged everything


  const setState = (newExternalState, silent = false) => {
    Object.entries(newExternalState).forEach(([key, value]) => {
      _objectPath.default.set(derivedStateRef.current, key, value);
    });

    if (silent !== true) {
      forceRefresh();
    }
  }; // compare last knows subscribed prop values with current version


  const getChanges = fromValues => {
    const changed = [];
    subscriptions.forEach(path => {
      const oldVal = _objectPath.default.get(subscribedRef.current, [path]);

      const newVal = _objectPath.default.get(fromValues, [path]);

      if (typeof oldVal !== typeof newVal || !shallowEquals(oldVal, newVal)) {
        changed.push(path);
      }
    });
    return changed;
  }; // only trigger useEffect if subscriptions have changed or subscribed prop values have changed


  const changedDerived = getChanges(derivedState);

  if (changedDerived.length > 0) {
    propsVersion.current = Date.now();
  }

  (0, _react.useEffect)(() => {
    if (changedDerived.length > 0) {
      const shouldRerender = changedDerived.reduce((hasPropUpdates, path) => {
        return hasPropUpdates || internalPropSetState(path, _objectPath.default.get(derivedState, [path]));
      }, false);

      if (shouldRerender) {
        if (updateAll) {
          setState({ ...props
          });
        } else {
          forceRefresh();
        }
      }
    }
  }, [subscriptions.sort().join('|'), propsVersion.current]); // full derived state, public setState, and method to force refresh without changing anything

  return [derivedStateRef.current, setState, forceRefresh];
};

exports.useDerivedState = useDerivedState;