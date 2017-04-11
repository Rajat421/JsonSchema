'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _store = require('../store');

var _cookie = require('cookie');

var _cookie2 = _interopRequireDefault(_cookie);

var _TextFields = require('react-md/lib/TextFields');

var _TextFields2 = _interopRequireDefault(_TextFields);

var _head = require('next/dist/lib/head.js');

var _head2 = _interopRequireDefault(_head);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _class = function (_React$Component) {
  (0, _inherits3.default)(_class, _React$Component);

  (0, _createClass3.default)(_class, null, [{
    key: 'getInitialProps',
    value: function () {
      var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(args) {
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                return _context.abrupt('return', {});

              case 1:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function getInitialProps(_x) {
        return _ref.apply(this, arguments);
      }

      return getInitialProps;
    }()
  }]);

  function _class(props) {
    (0, _classCallCheck3.default)(this, _class);

    var _this = (0, _possibleConstructorReturn3.default)(this, (_class.__proto__ || (0, _getPrototypeOf2.default)(_class)).call(this));

    _this._handleSchema = _this._handleSchema.bind(_this);
    _this.json = {};
    return _this;
  }

  (0, _createClass3.default)(_class, [{
    key: '_handleSchema',
    value: function _handleSchema(val) {
      this.json = JSON.parse(val);
      console.log(this.json, '==========>');
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement('div', null, _react2.default.createElement(_head2.default, null, _react2.default.createElement('title', null, 'Tixdo'), _react2.default.createElement('meta', { charSet: 'utf-8' }), _react2.default.createElement('meta', { name: 'viewport', content: 'initial-scale=1.0, width=device-width' }), _react2.default.createElement('link', { rel: 'apple-touch-icon', href: 'https:s3.amazonaws.com/tixdotest/images/favicon.png' }), _react2.default.createElement('link', { rel: 'icon', href: 'https://s3.amazonaws.com/tixdotest/images/favicon.png', type: 'image/png' }), _react2.default.createElement('link', { rel: 'stylesheet', href: '/static/css/react-md.light_blue-yellow.min.css' })), _react2.default.createElement('div', { className: 'md-grid' }, _react2.default.createElement('div', { className: 'md-cell--3 md-cell--middle md-text-right' }, 'ADD'), _react2.default.createElement('div', { className: 'md-cell--3  md-cell--1-offset md-text-left' }, _react2.default.createElement(_TextFields2.default, {
        id: 'helpMultiline',
        placeholder: '',
        rows: 4,
        maxRows: 4,
        onChange: this._handleSchema
      }))));
    }
  }]);

  return _class;
}(_react2.default.Component);

exports.default = _class;