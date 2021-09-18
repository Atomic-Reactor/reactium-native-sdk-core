import _ from 'underscore';
import Registry from './registry';

const Utils = {};

Utils.registryFactory = (name, idField, mode) =>
    new Registry(name, idField, mode);

Utils.Registry = Registry;

export default Utils;
