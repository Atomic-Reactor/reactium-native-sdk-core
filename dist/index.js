"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  Cache: true,
  Component: true,
  Enums: true,
  Handle: true,
  Hook: true,
  Plugin: true,
  Pulse: true,
  Registry: true,
  Route: true,
  Style: true,
  Utils: true,
  Zone: true
};
Object.defineProperty(exports, "Cache", {
  enumerable: true,
  get: function () {
    return _cache.default;
  }
});
Object.defineProperty(exports, "Component", {
  enumerable: true,
  get: function () {
    return _component.default;
  }
});
Object.defineProperty(exports, "Enums", {
  enumerable: true,
  get: function () {
    return _enums.default;
  }
});
Object.defineProperty(exports, "Handle", {
  enumerable: true,
  get: function () {
    return _handle.default;
  }
});
Object.defineProperty(exports, "Hook", {
  enumerable: true,
  get: function () {
    return _hook.default;
  }
});
Object.defineProperty(exports, "Plugin", {
  enumerable: true,
  get: function () {
    return _plugin.default;
  }
});
Object.defineProperty(exports, "Pulse", {
  enumerable: true,
  get: function () {
    return _pulse.default;
  }
});
Object.defineProperty(exports, "Registry", {
  enumerable: true,
  get: function () {
    return _registry.default;
  }
});
Object.defineProperty(exports, "Route", {
  enumerable: true,
  get: function () {
    return _route.default;
  }
});
Object.defineProperty(exports, "Style", {
  enumerable: true,
  get: function () {
    return _style.default;
  }
});
Object.defineProperty(exports, "Utils", {
  enumerable: true,
  get: function () {
    return _utils.default;
  }
});
Object.defineProperty(exports, "Zone", {
  enumerable: true,
  get: function () {
    return _zone.default;
  }
});
exports.default = void 0;

require("./node-polyfill");

var _package = _interopRequireDefault(require("../package"));

var _cache = _interopRequireDefault(require("./cache"));

var _component = _interopRequireDefault(require("./component"));

var _enums = _interopRequireDefault(require("./enums"));

var _handle = _interopRequireDefault(require("./handle"));

var _hook = _interopRequireDefault(require("./hook"));

var _plugin = _interopRequireDefault(require("./plugin"));

var _pulse = _interopRequireDefault(require("./pulse"));

var _registry = _interopRequireDefault(require("./utils/registry"));

var _route = _interopRequireDefault(require("./route"));

var _style = _interopRequireDefault(require("./style"));

var _utils = _interopRequireDefault(require("./utils"));

var _zone = _interopRequireDefault(require("./zone"));

var _actinium = _interopRequireWildcard(require("./actinium"));

Object.keys(_actinium).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _actinium[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _actinium[key];
    }
  });
});

var _namedExports = require("./named-exports");

Object.keys(_namedExports).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _namedExports[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _namedExports[key];
    }
  });
});

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Reactium = { ..._actinium.default,
  Cache: _cache.default,
  Component: _component.default,
  Enums: _enums.default,
  Handle: _handle.default,
  Hook: _hook.default,
  Plugin: _plugin.default,
  Pulse: _pulse.default,
  Registry: _registry.default,
  Route: _route.default,
  Style: _style.default,
  Utils: _utils.default,
  Zone: _zone.default,
  version: _package.default.version
};
exports.default = Reactium;