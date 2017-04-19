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

var _Dialogs = require('react-md/lib/Dialogs');

var _Dialogs2 = _interopRequireDefault(_Dialogs);

var _Button = require('react-md/lib/Buttons/Button');

var _Button2 = _interopRequireDefault(_Button);

var _List = require('react-md/lib/Lists/List');

var _List2 = _interopRequireDefault(_List);

var _ListItem = require('react-md/lib/Lists/ListItem');

var _ListItem2 = _interopRequireDefault(_ListItem);

var _TextFields = require('react-md/lib/TextFields');

var _TextFields2 = _interopRequireDefault(_TextFields);

var _Toolbars = require('react-md/lib/Toolbars');

var _Toolbars2 = _interopRequireDefault(_Toolbars);

var _head = require('next/dist/lib/head.js');

var _head2 = _interopRequireDefault(_head);

var _reactJsonTree = require('react-json-tree');

var _reactJsonTree2 = _interopRequireDefault(_reactJsonTree);

var _FontIcons = require('react-md/lib/FontIcons');

var _FontIcons2 = _interopRequireDefault(_FontIcons);

var _underscore = require('underscore');

var _underscore2 = _interopRequireDefault(_underscore);

var _form = require('../component/form');

var _form2 = _interopRequireDefault(_form);

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

    _this.openDialog = function (parameters) {
      _this.setState({ parameters: parameters, visible: true });
    };

    _this.closeDialog = function () {
      _this.setState({ visible: false });
    };

    _this._handleSchema = _this._handleSchema.bind(_this);
    _this.openDialog = _this.openDialog.bind(_this);
    _this.closeDialog = _this.closeDialog.bind(_this);
    _this.state = {
      json: {},
      globalvar: {},
      paths: [],
      operations: [],
      visible: false,
      parameters: []
    };
    _this.json = {};

    return _this;
  }

  (0, _createClass3.default)(_class, [{
    key: '_handleSchema',
    value: function _handleSchema(val) {
      var _this2 = this;

      this.json = JSON.parse(val);
      this.setState({
        json: this.json
      }, function () {
        _this2._setGlobalVariable(_this2.state.json);
        _this2._setRequestUrls(_this2.state.json.paths);
      });
    }
  }, {
    key: '_setRequestUrls',
    value: function _setRequestUrls(path) {
      var temp = [];

      _underscore2.default.each(path, function (value, key) {
        var op = [];
        if (_underscore2.default.isObject(value)) {
          _underscore2.default.each(value, function (operation, operationName) {
            op.push({ key: operationName, operation: operation });
          });
        }
        temp.push({ key: key, op: op });
      });
      this.setState({ paths: temp });
      console.log(temp);
    }
  }, {
    key: '_setGlobalVariable',
    value: function _setGlobalVariable(json) {

      var obj = {
        host: json.host,
        basePath: json.basePath || '',
        schemes: json.schemes || [],
        responseContentType: json.consumes || [],
        requestContentType: json.produces || []
      };
      this.setState({
        globalvar: obj
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      var nav = _react2.default.createElement(_Button2.default, { icon: true, onClick: this.closeDialog }, 'X');
      var action = _react2.default.createElement(_Button2.default, { flat: true, label: 'Save', onClick: this.closeDialog });
      return _react2.default.createElement('div', null, _react2.default.createElement(_head2.default, null, _react2.default.createElement('title', null, 'Tixdo'), _react2.default.createElement('meta', { charSet: 'utf-8' }), _react2.default.createElement('meta', { name: 'viewport', content: 'initial-scale=1.0, width=device-width' }), _react2.default.createElement('link', { rel: 'apple-touch-icon', href: 'https:s3.amazonaws.com/tixdotest/images/favicon.png' }), _react2.default.createElement('link', { rel: 'icon', href: 'https://s3.amazonaws.com/tixdotest/images/favicon.png', type: 'image/png' }), _react2.default.createElement('link', { rel: 'stylesheet', href: '/static/css/react-md.light_blue-yellow.min.css' })), _react2.default.createElement('div', { className: 'md-grid' }, _react2.default.createElement('div', { className: 'md-cell--3 md-cell--middle md-text-right' }, 'ADD'), _react2.default.createElement('div', { className: 'md-cell--3  md-cell--1-offset md-text-left' }, _react2.default.createElement(_TextFields2.default, {
        id: 'helpMultiline',
        placeholder: '',
        rows: 4,
        maxRows: 4,
        onChange: this._handleSchema
      }))), _react2.default.createElement('div', null, _react2.default.createElement('h2', null, 'Full Schema'), _react2.default.createElement(_reactJsonTree2.default, { data: this.state.json })), _react2.default.createElement('div', null, _react2.default.createElement('h2', null, 'Global Schema'), _react2.default.createElement(_reactJsonTree2.default, { data: this.state.globalvar })), this.state.paths.map(function (val, i) {
        return _react2.default.createElement('div', { key: i }, _react2.default.createElement('h2', null, val.key || ''), val.op.map(function (operation, k) {
          return _react2.default.createElement('div', { key: k }, _react2.default.createElement('h2', null, operation.key || ''), _react2.default.createElement(_reactJsonTree2.default, { data: operation.operation || '' }), _react2.default.createElement(_Button2.default, { raised: true, label: 'Try Operation',
            onClick: function onClick() {
              return _this3.openDialog(operation.operation.parameters);
            } }));
        }), _react2.default.createElement(_Dialogs2.default, {
          id: 'Dialog',
          visible: _this3.state.visible,
          fullPage: true,
          'aria-label': 'New Event',
          onHide: _this3.closeDialog
        }, _react2.default.createElement(_Toolbars2.default, {
          colored: true,
          nav: nav,
          actions: action,
          title: 'New Event',
          fixed: true
        }), _react2.default.createElement(_form2.default, { parameters: _this3.state.parameters || [] })));
      }));
    }
  }]);

  return _class;
}(_react2.default.Component);

exports.default = _class;