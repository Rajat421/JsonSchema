"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _toConsumableArray2 = require("babel-runtime/helpers/toConsumableArray");

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _getPrototypeOf = require("babel-runtime/core-js/object/get-prototype-of");

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require("babel-runtime/helpers/possibleConstructorReturn");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

var _inherits2 = require("babel-runtime/helpers/inherits");

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _Dialogs = require("react-md/lib/Dialogs");

var _Dialogs2 = _interopRequireDefault(_Dialogs);

var _Button = require("react-md/lib/Buttons/Button");

var _Button2 = _interopRequireDefault(_Button);

var _TextFields = require("react-md/lib/TextFields");

var _TextFields2 = _interopRequireDefault(_TextFields);

var _Toolbars = require("react-md/lib/Toolbars");

var _Toolbars2 = _interopRequireDefault(_Toolbars);

var _head = require("next/dist/lib/head.js");

var _head2 = _interopRequireDefault(_head);

var _reactJsonTree = require("react-json-tree");

var _reactJsonTree2 = _interopRequireDefault(_reactJsonTree);

var _underscore = require("underscore");

var _underscore2 = _interopRequireDefault(_underscore);

var _form = require("../component/form");

var _form2 = _interopRequireDefault(_form);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var RestTest = function (_Component) {
  (0, _inherits3.default)(RestTest, _Component);

  (0, _createClass3.default)(RestTest, null, [{
    key: "getInitialProps",
    value: function () {
      var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(args) {
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                return _context.abrupt("return", {});

              case 1:
              case "end":
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

  function RestTest(props) {
    (0, _classCallCheck3.default)(this, RestTest);

    var _this = (0, _possibleConstructorReturn3.default)(this, (RestTest.__proto__ || (0, _getPrototypeOf2.default)(RestTest)).call(this));

    _this.openDialog = function (c) {
      _this.setState({ render_component: c, visible: true });
    };

    _this.closeDialog = function () {
      _this.setState({ visible: false });
    };

    _this._handleSchema = _this._handleSchema.bind(_this);
    _this.openDialog = _this.openDialog.bind(_this);
    _this.closeDialog = _this.closeDialog.bind(_this);
    _this.state = {
      json: {},
      globalVar: {},
      paths: [],
      operations: [],
      visible: false,
      parameters: [],
      components: []
    };
    _this.json = {};

    return _this;
  }

  (0, _createClass3.default)(RestTest, [{
    key: "_handleSchema",
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
    key: "_setRequestUrls",
    value: function _setRequestUrls(path) {
      var _this3 = this;

      var temp = [];
      console.log(path);
      var comp_arry = [];

      _underscore2.default.each(path, function (value, key) {
        var op = [];
        var comp = void 0;
        if (_underscore2.default.isObject(value)) {
          _underscore2.default.each(value, function (operation, operationName) {
            comp = {};
            comp['path'] = key;
            comp['component_name'] = operationName + '-' + key;
            comp['method'] = operationName;
            comp = (0, _extends3.default)({}, comp, operation);
            delete comp['parameters'];
            _underscore2.default.map(operation.parameters, function (param, i) {
              if (param.in === 'body') {
                comp['body_param'] = [].concat((0, _toConsumableArray3.default)(comp.body_param || {}), [param]);
              } else if (param.in === 'path') {
                comp['path_param'] = [].concat((0, _toConsumableArray3.default)(comp.path_param || {}), [param]);
              } else if (param.in === 'query') {
                comp['query_param'] = [].concat((0, _toConsumableArray3.default)(comp.query_param || {}), [param]);
              } else if (param.in === 'formData') {
                comp['formData_param'] = [].concat((0, _toConsumableArray3.default)(comp.formData_param || {}), [param]);
              } else if (param.in === 'header') {
                comp['header_param'] = [].concat((0, _toConsumableArray3.default)(comp.header_param || {}), [param]);
              }
              return param;
            });
            op.push({ key: operationName, operation: operation });
            comp_arry.push(comp);
          });
        } else {}
        temp.push({ key: key, op: op });
      });
      this.setState({
        paths: temp,
        components: comp_arry
      }, function () {
        console.log(_this3.state.components);
      });
    }
  }, {
    key: "_setGlobalVariable",
    value: function _setGlobalVariable(json) {

      var obj = {
        host: json.host,
        basePath: json.basePath || '',
        schemes: json.schemes || [],
        responseContentType: json.consumes || [],
        requestContentType: json.produces || []
      };
      this.setState({
        globalVar: obj
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this4 = this;

      var nav = _react2.default.createElement(_Button2.default, { icon: true, onClick: this.closeDialog }, "X");
      var action = _react2.default.createElement(_Button2.default, { flat: true, label: "Save", onClick: this.closeDialog });
      return _react2.default.createElement("div", null, _react2.default.createElement(_head2.default, null, _react2.default.createElement("title", null, "Tixdo"), _react2.default.createElement("meta", { charSet: "utf-8" }), _react2.default.createElement("meta", { name: "viewport", content: "initial-scale=1.0, width=device-width" }), _react2.default.createElement("link", { rel: "apple-touch-icon", href: "https:s3.amazonaws.com/tixdotest/images/favicon.png" }), _react2.default.createElement("link", { rel: "icon", href: "https://s3.amazonaws.com/tixdotest/images/favicon.png", type: "image/png" }), _react2.default.createElement("link", { rel: "stylesheet", href: "/static/css/react-md.light_blue-yellow.min.css" })), _react2.default.createElement("div", { className: "md-grid" }, _react2.default.createElement("div", { className: "md-cell--3 md-cell--middle md-text-right" }, "ADD"), _react2.default.createElement("div", { className: "md-cell--3  md-cell--1-offset md-text-left" }, _react2.default.createElement(_TextFields2.default, {
        id: "helpMultiline",
        placeholder: "",
        rows: 4,
        maxRows: 4,
        onChange: this._handleSchema
      }))), _react2.default.createElement("div", null, _react2.default.createElement("h2", null, "Full Schema"), _react2.default.createElement(_reactJsonTree2.default, { data: this.state.json })), _react2.default.createElement("div", null, _react2.default.createElement("h2", null, "Global Schema"), _react2.default.createElement(_reactJsonTree2.default, { data: this.state.globalVar })), _react2.default.createElement("h2", null, " Components "), _react2.default.createElement("div", { className: "md-grid" }, this.state.components.map(function (c, i) {
        return _react2.default.createElement("div", { key: i, className: "md-cell--2 md-text-center",
          style: { border: '1px solid grey', boxShadow: '2px 0px',
            cursor: 'pointer', margin: '10px auto 10px auto',
            padding: '10px auto 10px auto' },
          onClick: function onClick() {
            return _this4.openDialog(c);
          } }, _react2.default.createElement("h4", null, _react2.default.createElement("u", null, c.component_name)));
      })), _react2.default.createElement(_Dialogs2.default, {
        id: 'Dialog',
        visible: this.state.visible,
        fullPage: true,
        "aria-label": "New Event",
        onHide: this.closeDialog
      }, _react2.default.createElement(_Toolbars2.default, {
        colored: true,
        nav: nav,
        actions: action,
        title: "New Event",
        fixed: true
      }), _react2.default.createElement("div", { className: "md-grid", style: { marginTop: '150px' } }, _react2.default.createElement(_reactJsonTree2.default, { data: this.state.render_component }))));
    }
  }]);

  return RestTest;
}(_react.Component);

exports.default = RestTest;