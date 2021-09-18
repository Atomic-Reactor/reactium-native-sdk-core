import './node-polyfill';
import pkgjson from '~/package';
import Cache from './cache';
import Component from './component';
import Enums from './enums';
import Handle from './handle';
import Hook from './hook';
import Plugin from './plugin';
import Pulse from './pulse';
import Registry from './utils/registry';
import Route from './route';
import Style from './style';
import Utils from './utils';
import Zone from './zone';
import Actinium from './actinium';

const Reactium = {
    ...Actinium,
    Cache,
    Component,
    Enums,
    Handle,
    Hook,
    Plugin,
    Pulse,
    Registry,
    Route,
    Style,
    Utils,
    Zone,
    version: pkgjson.version,
};

export * from './actinium';
export * from './named-exports';

export {
    Cache,
    Component,
    Enums,
    Handle,
    Hook,
    Plugin,
    Pulse,
    Reactium as default,
    Registry,
    Route,
    Style,
    Utils,
    Zone,
};
