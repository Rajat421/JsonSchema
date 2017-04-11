'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initStore = undefined;

var _redux = require('redux');

var _reduxThunk = require('redux-thunk');

var _reduxThunk2 = _interopRequireDefault(_reduxThunk);

var _reduxLogger = require('redux-logger');

var _reduxLogger2 = _interopRequireDefault(_reduxLogger);

var _reactReduxLoadingBar = require('react-redux-loading-bar');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var store = null;

var initStore = exports.initStore = function initStore(reducer, initialState, isServer) {

  if (process.env.NODE_ENV === 'production') {
    if (isServer && typeof window === 'undefined') {
      return (0, _redux.createStore)(reducer, initialState, (0, _redux.applyMiddleware)(_reduxThunk2.default, (0, _reactReduxLoadingBar.loadingBarMiddleware)()));
    } else {
      if (!store) {
        store = (0, _redux.createStore)(reducer, initialState, (0, _redux.applyMiddleware)(_reduxThunk2.default));
      }
      return store;
    }
  } else {
    if (isServer && typeof window === 'undefined') {
      return (0, _redux.createStore)(reducer, initialState, (0, _redux.applyMiddleware)(_reduxThunk2.default, (0, _reduxLogger2.default)(), (0, _reactReduxLoadingBar.loadingBarMiddleware)()));
    } else {
      if (!store) {
        store = (0, _redux.createStore)(reducer, initialState, (0, _redux.applyMiddleware)(_reduxThunk2.default, (0, _reduxLogger2.default)()));
      }
      return store;
    }
  }
};