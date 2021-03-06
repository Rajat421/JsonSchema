'use strict';

var _path2 = require('path');

var _path3 = _interopRequireDefault(_path2);

var _url = require('url');

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _clone = require('clone');

var _clone2 = _interopRequireDefault(_clone);

var _traverseAsync = require('traverse-async');

var _traverse = require('traverse');

var _traverse2 = _interopRequireDefault(_traverse);

var _dagMap = require('dag-map');

var _dagMap2 = _interopRequireDefault(_dagMap);

var _md = require('md5');

var _md2 = _interopRequireDefault(_md);

var _utils = require('./utils');

var utils = _interopRequireWildcard(_utils);

var _web = require('./loaders/web');

var _web2 = _interopRequireDefault(_web);

var _file = require('./loaders/file');

var _file2 = _interopRequireDefault(_file);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var defaults = {
  cache: true,
  cacheTTL: 300000, // ms
  baseFolder: process.cwd()
};

var defaultKeys = Object.keys(defaults);

var cache = {};

var loaders = {
  web: _web2.default,
  file: _file2.default
};

/**
 * Returns the reference schema that refVal points to.
 * If the ref val points to a ref within a file, the file is loaded and fully derefed, before we get the
 * pointing property. Derefed files are cached. Derefed web urls are cached according to options.
 *
 * @param refVal
 * @param refType
 * @param parent
 * @param options
 * @param state
 * @param fn
 * @private
 */
function getRefSchema(refVal, refType, parent, options, state, fn) {
  var customLoaderOptions = _lodash2.default.pick(options, defaultKeys);
  var loader = typeof options.loader === 'function' ? options.loader : null;
  var filePath = void 0;
  var fullRefFilePath = void 0;

  if (refType === 'file') {
    filePath = utils.getRefFilePath(refVal);
    fullRefFilePath = utils.isAbsolute(filePath) ? filePath : _path3.default.resolve(state.cwd, filePath);
  }

  function loaderHandler(err, loaderValue) {
    if (!err && loaderValue) {
      (function () {
        var oldBasePath = void 0;

        if (refType === 'file') {
          var dirname = _path3.default.dirname(filePath);
          if (dirname === '.') {
            dirname = '';
          }

          if (dirname) {
            oldBasePath = state.cwd;
            var newBasePath = _path3.default.resolve(state.cwd, dirname);
            options.baseFolder = state.cwd = newBasePath;
          }
        }

        derefSchema(loaderValue, options, state, function (err, derefedValue) {
          // reset
          if (oldBasePath) {
            options.baseFolder = state.cwd = oldBasePath;
          }

          if (err) {
            return fn(err);
          }

          var newVal = void 0;
          if (derefedValue) {
            if (refType === 'file' && fullRefFilePath && !cache[fullRefFilePath]) {
              cache[fullRefFilePath] = derefedValue;
            }

            if (refVal.indexOf('#') >= 0) {
              var refPaths = refVal.split('#');
              var refPath = refPaths[1];
              var refNewVal = utils.getRefPathValue(derefedValue, refPath);
              if (refNewVal) {
                newVal = refNewVal;
              }
            } else {
              newVal = derefedValue;
            }
          }

          return fn(null, newVal);
        });
      })();
    } else if (loader) {
      loader(refVal, customLoaderOptions, fn);
    } else {
      fn(err);
    }
  }

  if (refType && loaders[refType]) {
    var loaderValue = void 0;
    if (refType === 'file') {
      if (cache[fullRefFilePath]) {
        loaderValue = cache[fullRefFilePath];
        loaderHandler(null, loaderValue);
      } else {
        loaders[refType](refVal, options, loaderHandler);
      }
    } else {
      loaders[refType](refVal, options, loaderHandler);
    }
  } else if (refType === 'local') {
    var newValue = utils.getRefPathValue(parent, refVal);
    fn(undefined, newValue);
  } else if (loader) {
    loader(refVal, customLoaderOptions, fn);
  } else {
    fn();
  }
}

/**
 * Add to state history
 * @param {Object} state the state
 * @param {String} type ref type
 * @param {String} value ref value
 * @private
 */
function addToHistory(state, type, value) {
  var dest = void 0;

  if (type === 'web') {
    var url = (0, _url.parse)(value);
    dest = url.host.concat(url.path);
  } else if (type === 'file') {
    dest = utils.getRefFilePath(value);
  } else {
    if (value === '#') {
      return false;
    }
    dest = state.current.concat(':' + value);
  }

  if (dest) {
    dest = dest.toLowerCase();
    if (state.history.indexOf(dest) >= 0) {
      return false;
    }

    state.history.push(dest);
  }
  return true;
}

/**
 * Set the current into state
 * @param {Object} state the state
 * @param {String} type ref type
 * @param {String} value ref value
 * @private
 */
function setCurrent(state, type, value) {
  var dest = void 0;
  if (type === 'web') {
    var url = (0, _url.parse)(value);
    dest = url.host.concat(url.path);
  } else if (type === 'file') {
    dest = utils.getRefFilePath(value);
  }

  if (dest) {
    state.current = dest;
  }
}

/**
 * Check the schema for local circular refs using DAG
 * @param {Object} schema the schema
 * @return {Error|undefined} <code>Error</code> if circular ref, <code>undefined</code> otherwise if OK
 * @private
 */
function checkLocalCircular(schema) {
  var dag = new _dagMap2.default();
  var locals = (0, _traverse2.default)(schema).reduce(function (acc, node) {
    if (!_lodash2.default.isNull(node) && !_lodash2.default.isUndefined(null) && typeof node.$ref === 'string') {
      var refType = utils.getRefType(node);
      if (refType === 'local') {
        var value = utils.getRefValue(node);
        if (value) {
          var _path = this.path.join('/');
          acc.push({
            from: _path,
            to: value
          });
        }
      }
    }
    return acc;
  }, []);

  if (!locals || !locals.length) {
    return;
  }

  if (_lodash2.default.some(locals, function (elem) {
    return elem.to === '#';
  })) {
    return new Error('Circular self reference');
  }

  var check = _lodash2.default.find(locals, function (elem) {
    var from = elem.from.concat('/');
    var dest = elem.to.substring(2).concat('/');
    try {
      dag.addEdge(from, dest);
    } catch (err) {
      return elem;
    }

    if (from.indexOf(dest) >= 0) {
      return elem;
    }
  });

  if (check) {
    return new Error('Circular self reference from ' + check.from + ' to ' + check.to);
  }
}

/**
 * Derefs $ref types in a schema
 * @param schema
 * @param options
 * @param state
 * @param type
 * @param fn
 * @private
 */
function derefSchema(schema, options, state, fn) {
  if (typeof state === 'function') {
    fn = state;
    state = {};
  }

  var check = checkLocalCircular(schema);
  if (check instanceof Error) {
    return fn(check);
  }

  if (state.circular) {
    return fn(new Error('circular references found: ' + state.circularRefs.toString()), null);
  } else if (state.error) {
    return fn(state.error);
  }

  function final(newObject) {
    var error = void 0;
    if (state.circular) {
      error = new Error('circular references found: ' + state.circularRefs.toString());
    } else if (state.error && options.failOnMissing) {
      error = state.error;
    }
    return fn(error, newObject);
  }

  var queue = (0, _traverseAsync.traverse)(schema, function (node, next) {
    var self = this;
    if (_lodash2.default.isNull(node) || _lodash2.default.isUndefined(null)) {
      return next();
    }

    if (typeof node.$ref !== 'string') {
      return next();
    }

    var refType = utils.getRefType(node);
    var refVal = utils.getRefValue(node);

    var addOk = addToHistory(state, refType, refVal);
    if (!addOk) {
      state.circular = true;
      state.circularRefs.push(refVal);
      return next();
    }

    setCurrent(state, refType, refVal);
    getRefSchema(refVal, refType, schema, options, state, function (err, newValue) {
      if (err) {
        state.error = err;
        if (state.circular) {
          return final(schema);
        }
        if (options.failOnMissing) {
          return final(schema);
        }
      }

      state.history.pop();

      if (!err && !newValue) {
        if (state.missing.indexOf(refVal) === -1) {
          state.missing.push(refVal);
        }
        if (options.failOnMissing) {
          state.error = new Error('Missing $ref: ' + refVal);
          return final(schema);
        }
        return next();
      }

      var obj = void 0;

      if (self.parent && self.parent[self.key]) {
        obj = self.parent;
      } else if (self.node && self.node[self.key]) {
        obj = self.node;
      }

      if (obj && newValue) {
        obj[self.key] = newValue;
        if (state.missing.indexOf(refVal) !== -1) {
          state.missing.splice(state.missing.indexOf(refVal), 1);
        }
      } else if (self.isRoot && newValue) {
        // special case of root schema being replaced
        state.history.pop();
        if (state.missing.indexOf(refVal) === -1) {
          state.missing.push(refVal);
        }

        queue.break();
        return final(newValue);
      }

      return next();
    });
  }, final);
}

/**
 * Derefs <code>$ref</code>'s in JSON Schema to actual resolved values. Supports local, file and web refs.
 * @param {Object} schema - The JSON schema
 * @param {Object} options - options
 * @param {String} options.baseFolder - the base folder to get relative path files from. Default is <code>process.cwd()</code>
 * @param {String} options.cache - whether to cache the result from the request. Default: <code>true</code>.
 * @param {Number} options.cacheTTL - the time to keep request result in cache. Default is <code>5 minutes</code>.
 * @param {Boolean} options.failOnMissing - By default missing / unresolved refs will be left as is with their ref value intact.
 *                                        If set to <code>true</code> we will error out on first missing ref that we cannot
 *                                        resolve. Default: <code>false</code>.
 * @param {Function} options.loader - a function for custom loader. Invoked if we could not resolve the ref type,
 *                                  or if there was an error resolving a web or file ref types.
 *                                  function with signature: <code>function(refValue, options, fn)</code>
 *                                  <code>refValue</code> - the string value of the ref being resolved. Ex: <code>db://my_database_id</code>
 *                                  <code>options</code> - options parameter passed to <code>deref</code>
 *                                  <code>fn</code> - the final callback function, in form <code>function(err, newValue)</code>
 *                                  <code>err</code> - error if ref is valid for the loader but there was an error resolving the ref.
 *                                  If used in combination with <code>failOnMissing</code> option it will abort the whole deref process.
 *                                  <code>newValue</code> - the resolved ref value, or <code>null</code> or <code>undefined</code> if the ref isn't for this custom
 *                                  <code>loader</code> and we should just leave the <code>$ref</code> as is.
 * @param fn {Function} The final callback in form <code>(error, newSchema)</code>
 */
function deref(schema, options, fn) {
  if (typeof options === 'function') {
    fn = options;
    options = {};
  }

  if (!fn) {
    fn = _lodash2.default.noop;
  }

  options = _lodash2.default.defaults(options, defaults);

  var bf = options.baseFolder;
  var cwd = bf;
  if (!utils.isAbsolute(bf)) {
    cwd = _path3.default.resolve(process.cwd(), bf);
  }

  var state = {
    graph: new _dagMap2.default(),
    circular: false,
    circularRefs: [],
    cwd: cwd,
    missing: [],
    history: []
  };

  try {
    var str = JSON.stringify(schema);
    state.current = (0, _md2.default)(str);
  } catch (err) {
    return fn(err);
  }

  var baseSchema = (0, _clone2.default)(schema);

  cache = {};

  return derefSchema(baseSchema, options, state, fn);
}

module.exports = deref;