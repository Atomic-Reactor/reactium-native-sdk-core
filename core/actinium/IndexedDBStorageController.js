// var _idbKeyval = require("idb-keyval");
var _idbKeyval = require('memory-cache');

try {
  // var ParseStore = (0, _idbKeyval.createStore)('parseDB', 'parseStore');
  // var IndexedDBStorageController = {
  //   async: 1,
  //   getItemAsync: function (path) {
  //     return (0, _idbKeyval.get)(path, ParseStore);
  //   },
  //   setItemAsync: function (path, value) {
  //     return (0, _idbKeyval.put)(path, value, ParseStore);
  //   },
  //   removeItemAsync: function (path) {
  //     return (0, _idbKeyval.del)(path, ParseStore);
  //   },
  //   getAllKeysAsync: function () {
  //     return (0, _idbKeyval.keys)(ParseStore);
  //   },
  //   clear: function () {
  //     return (0, _idbKeyval.clear)(ParseStore);
  //   }
  // };

  var IndexedDBStorageController = {
    async: 1,
    getItemAsync: function (path) {
      return (0, _idbKeyval.get)(path);
    },
    setItemAsync: function (path, value) {
      return (0, _idbKeyval.put)(path, value);
    },
    removeItemAsync: function (path) {
      return (0, _idbKeyval.del)(path);
    },
    getAllKeysAsync: function () {
      return (0, _idbKeyval.keys)();
    },
    clear: function () {
      return (0, _idbKeyval.clear)();
    }
  };

  module.exports = IndexedDBStorageController;
} catch (e) {}
