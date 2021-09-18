"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useHookComponent = void 0;

var _component = _interopRequireDefault(require("../component"));

var _asyncEffect = require("./async-effect");

var _react = require("react");

var _objectPath = _interopRequireDefault(require("object-path"));

var _v = _interopRequireDefault(require("uuid/v4"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @api {ReactHook} useHookComponent(hookName,defaultComponent,...params) useHookComponent()
 * @apiDescription A React hook used to define React component(s) that can be
 overrided by Reactium plugins, using the `Reactium.Component.register()` function.
 * @apiParam {String} hookName the unique string used to register component(s).
 * @apiParam {Component} defaultComponent the default React component(s) to be returned by the hook.
 * @apiParam {Mixed} params variadic list of parameters to be passed to the Reactium hook specified by hookName.
 * @apiName useHookComponent
 * @apiGroup ReactHook
 * @apiExample parent.js
import React from 'react';
import { useHookComponent } from 'reactium-core/sdk';

// component to be used unless overriden by Reactium.Component.register()
const DefaultComponent = () => <div>Default or Placeholder component</div>

export props => {
    const MyComponent = useHookComponent('my-component', DefaultComponent);
    return (
        <div>
            <MyComponent {...props} />
        </div>
    );
};
* @apiExample reactium-hooks.js
import React from 'react';
import Reactium from 'reactium-core/sdk';

// component to be used unless overriden by Reactium.Component.register()
const ReplacementComponent = () => <div>My Plugin's Component</div>

Reactium.Component.register('my-component', ReplacementComponent);
 */
// Use forwardRef on default component in case registered
// component requires forwarded ref;
const forwardRefNoop = /*#__PURE__*/(0, _react.forwardRef)((props, ref) => null);

const useHookComponent = (hook = 'component', defaultComponent = forwardRefNoop) => {
  const component = (0, _react.useRef)({});

  _objectPath.default.set(component.current, 'component', _component.default.get(hook, defaultComponent));

  return _objectPath.default.get(component.current, 'component');
};

exports.useHookComponent = useHookComponent;