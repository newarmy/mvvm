/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	var parentJsonpFunction = window["webpackJsonp"];
/******/ 	window["webpackJsonp"] = function webpackJsonpCallback(chunkIds, moreModules, executeModules) {
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [], result;
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(chunkIds, moreModules, executeModules);
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 	};
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// objects to store loaded and loading chunks
/******/ 	var installedChunks = {
/******/ 		4: 0
/******/ 	};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/ 	// This file contains only the entry chunk.
/******/ 	// The chunk loading function for additional chunks
/******/ 	__webpack_require__.e = function requireEnsure(chunkId) {
/******/ 		var installedChunkData = installedChunks[chunkId];
/******/ 		if(installedChunkData === 0) {
/******/ 			return new Promise(function(resolve) { resolve(); });
/******/ 		}
/******/
/******/ 		// a Promise means "currently loading".
/******/ 		if(installedChunkData) {
/******/ 			return installedChunkData[2];
/******/ 		}
/******/
/******/ 		// setup Promise in chunk cache
/******/ 		var promise = new Promise(function(resolve, reject) {
/******/ 			installedChunkData = installedChunks[chunkId] = [resolve, reject];
/******/ 		});
/******/ 		installedChunkData[2] = promise;
/******/
/******/ 		// start chunk loading
/******/ 		var head = document.getElementsByTagName('head')[0];
/******/ 		var script = document.createElement('script');
/******/ 		script.type = 'text/javascript';
/******/ 		script.charset = 'utf-8';
/******/ 		script.async = true;
/******/ 		script.timeout = 120000;
/******/
/******/ 		if (__webpack_require__.nc) {
/******/ 			script.setAttribute("nonce", __webpack_require__.nc);
/******/ 		}
/******/ 		script.src = __webpack_require__.p + "" + chunkId + ".js";
/******/ 		var timeout = setTimeout(onScriptComplete, 120000);
/******/ 		script.onerror = script.onload = onScriptComplete;
/******/ 		function onScriptComplete() {
/******/ 			// avoid mem leaks in IE.
/******/ 			script.onerror = script.onload = null;
/******/ 			clearTimeout(timeout);
/******/ 			var chunk = installedChunks[chunkId];
/******/ 			if(chunk !== 0) {
/******/ 				if(chunk) {
/******/ 					chunk[1](new Error('Loading chunk ' + chunkId + ' failed.'));
/******/ 				}
/******/ 				installedChunks[chunkId] = undefined;
/******/ 			}
/******/ 		};
/******/ 		head.appendChild(script);
/******/
/******/ 		return promise;
/******/ 	};
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "http://localhost:63343/mvvm/js/";
/******/
/******/ 	// on error function for async loading
/******/ 	__webpack_require__.oe = function(err) { console.error(err); throw err; };
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 75);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

var core = module.exports = { version: '2.5.6' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

// Thank's IE8 for his funny defineProperty
module.exports = !__webpack_require__(8)(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(43), __esModule: true };

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(7);
module.exports = function (it) {
  if (!isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(5);
var core = __webpack_require__(0);
var ctx = __webpack_require__(14);
var hide = __webpack_require__(50);
var has = __webpack_require__(6);
var PROTOTYPE = 'prototype';

var $export = function (type, name, source) {
  var IS_FORCED = type & $export.F;
  var IS_GLOBAL = type & $export.G;
  var IS_STATIC = type & $export.S;
  var IS_PROTO = type & $export.P;
  var IS_BIND = type & $export.B;
  var IS_WRAP = type & $export.W;
  var exports = IS_GLOBAL ? core : core[name] || (core[name] = {});
  var expProto = exports[PROTOTYPE];
  var target = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE];
  var key, own, out;
  if (IS_GLOBAL) source = name;
  for (key in source) {
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    if (own && has(exports, key)) continue;
    // export native or passed
    out = own ? target[key] : source[key];
    // prevent global pollution for namespaces
    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
    // bind timers to global for call from export context
    : IS_BIND && own ? ctx(out, global)
    // wrap global constructors for prevent change them in library
    : IS_WRAP && target[key] == out ? (function (C) {
      var F = function (a, b, c) {
        if (this instanceof C) {
          switch (arguments.length) {
            case 0: return new C();
            case 1: return new C(a);
            case 2: return new C(a, b);
          } return new C(a, b, c);
        } return C.apply(this, arguments);
      };
      F[PROTOTYPE] = C[PROTOTYPE];
      return F;
    // make static versions for prototype methods
    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
    if (IS_PROTO) {
      (exports.virtual || (exports.virtual = {}))[key] = out;
      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
      if (type & $export.R && expProto && !expProto[key]) hide(expProto, key, out);
    }
  }
};
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library`
module.exports = $export;


/***/ }),
/* 5 */
/***/ (function(module, exports) {

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self
  // eslint-disable-next-line no-new-func
  : Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef


/***/ }),
/* 6 */
/***/ (function(module, exports) {

var hasOwnProperty = {}.hasOwnProperty;
module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};


/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};


/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(3);
var IE8_DOM_DEFINE = __webpack_require__(18);
var toPrimitive = __webpack_require__(23);
var dP = Object.defineProperty;

exports.f = __webpack_require__(1) ? Object.defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return dP(O, P, Attributes);
  } catch (e) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

var shared = __webpack_require__(61)('keys');
var uid = __webpack_require__(64);
module.exports = function (key) {
  return shared[key] || (shared[key] = uid(key));
};


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = __webpack_require__(52);
var defined = __webpack_require__(15);
module.exports = function (it) {
  return IObject(defined(it));
};


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.13 ToObject(argument)
var defined = __webpack_require__(15);
module.exports = function (it) {
  return Object(defined(it));
};


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = VMFactory;

var _newBaseComp = __webpack_require__(28);

var _newBaseComp2 = _interopRequireDefault(_newBaseComp);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function VMFactory(opt) {
    var NewClass = _newBaseComp2.default.extend({
        // 组件的初始函数
        init: opt.init
    });
    console.dir(NewClass);
    return new NewClass({
        // 事件的回调函数 和 一些常规函数 （会代理到组件实例中）
        methods: opt.methods,
        // 事件列表， 事件都绑定到element中
        events: opt.events,
        // 组件容器dom
        element: opt.element,
        // 自定义的属性，（会代理到组件实例中）
        selfParam: opt.selfParam,
        // 子组件列表
        childComponents: opt.childComponents,
        // 组件间通信用的
        stateBus: opt.stateBus,
        // 组件模板
        tpl: opt.template,
        // 跟模板相关的数据
        data: opt.data,
        // 数据流
        store: opt.store,
        // 调试用的标志位
        isDev: opt.isDev
    });
}

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

// optional / simple context binding
var aFunction = __webpack_require__(47);
module.exports = function (fn, that, length) {
  aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 1: return function (a) {
      return fn.call(that, a);
    };
    case 2: return function (a, b) {
      return fn.call(that, a, b);
    };
    case 3: return function (a, b, c) {
      return fn.call(that, a, b, c);
    };
  }
  return function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};


/***/ }),
/* 15 */
/***/ (function(module, exports) {

// 7.2.1 RequireObjectCoercible(argument)
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on  " + it);
  return it;
};


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(7);
var document = __webpack_require__(5).document;
// typeof document.createElement is 'object' in old IE
var is = isObject(document) && isObject(document.createElement);
module.exports = function (it) {
  return is ? document.createElement(it) : {};
};


/***/ }),
/* 17 */
/***/ (function(module, exports) {

// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = !__webpack_require__(1) && !__webpack_require__(8)(function () {
  return Object.defineProperty(__webpack_require__(16)('div'), 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys = __webpack_require__(58);
var enumBugKeys = __webpack_require__(17);

module.exports = Object.keys || function keys(O) {
  return $keys(O, enumBugKeys);
};


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

// most Object methods by ES6 should accept primitives
var $export = __webpack_require__(4);
var core = __webpack_require__(0);
var fails = __webpack_require__(8);
module.exports = function (KEY, exec) {
  var fn = (core.Object || {})[KEY] || Object[KEY];
  var exp = {};
  exp[KEY] = exec(fn);
  $export($export.S + $export.F * fails(function () { fn(1); }), 'Object', exp);
};


/***/ }),
/* 21 */
/***/ (function(module, exports) {

module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};


/***/ }),
/* 22 */
/***/ (function(module, exports) {

// 7.1.4 ToInteger
var ceil = Math.ceil;
var floor = Math.floor;
module.exports = function (it) {
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = __webpack_require__(7);
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function (it, S) {
  if (!isObject(it)) return it;
  var fn, val;
  if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it))) return val;
  if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  throw TypeError("Can't convert object to primitive value");
};


/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _componentFactory = __webpack_require__(13);

var _componentFactory2 = _interopRequireDefault(_componentFactory);

var _child = __webpack_require__(70);

var _child2 = _interopRequireDefault(_child);

var _gson = __webpack_require__(71);

var _gson2 = _interopRequireDefault(_gson);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var gobj = new _componentFactory2.default({
    template: _gson2.default,
    isDev: true,
    events: {
        'click': 'show'
    },
    methods: {
        show: function show(e) {
            alert(e.target.innerHTML);
        }
    }
}); //vm类, 
/**

*/

var c1obj = new _componentFactory2.default({
    element: $('.box1'),
    childComponents: {
        'grandSon': gobj
    },
    template: _child2.default,
    isDev: true,
    events: {
        'click p': 'show'
    },
    methods: {
        show: function show(e, that) {
            alert(that.html());
        }
    }

});

exports.default = c1obj;

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _defineProperty = __webpack_require__(2);

var _defineProperty2 = _interopRequireDefault(_defineProperty);

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; (0, _defineProperty2.default)(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              * SPA 项目程序入口
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              * 1. 注册路径
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              * 2. 路径管理
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              * 3. 显示首页
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              * */


var _hashRoute = __webpack_require__(29);

var _hashRoute2 = _interopRequireDefault(_hashRoute);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * {{param}}
 *  table : 路由表
 *  beforeRouter: function () 所用导航前都要执行的函数
 * */
var SPA = function () {
    function SPA(opt) {
        _classCallCheck(this, SPA);

        this.routeTable = opt.table;
        this.beforeRouter = opt.beforeRouter;
        this.router = null;
        this.init();
    }

    _createClass(SPA, [{
        key: 'init',
        value: function init() {
            this.router = new _hashRoute2.default(this.routeTable, this.beforeRouter);
            for (var key in this.routeTable) {
                this.register(key, this.routeTable[key]);
            }
            this.router.initEvent();
        }
    }, {
        key: 'register',
        value: function register(path, Comp) {
            var k = this;
            k.router.route(path, function (param) {
                // 异步组件
                if (typeof Comp === 'function') {
                    Comp().then(function (module) {
                        k.routeTable[path] = module;
                        module.mounted();
                    });
                } else {
                    Comp.mounted(param);
                }
            });
        }
        /**
         * 用户自定义的beforeRouter函数里使用，
         * 来确定导航的方向
         * this.next(): 进行管道中的下一个钩子。如果全部钩子执行完了，
         * 则导航的状态就是 confirmed （确认的）。
         *  this.next(false): 中断当前的导航。如果浏览器的 URL 改变了
         * （可能是用户手动或者浏览器后退按钮），
         *  那么 URL 地址会重置到 from 路由对应的地址。
         * this.next('/') 跳转到一个不同的地址。
         * */

    }, {
        key: 'next',
        value: function next(path) {
            this.router.next(path);
        }
    }]);

    return SPA;
}();

exports.default = SPA;

/***/ }),
/* 26 */,
/* 27 */,
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _setPrototypeOf = __webpack_require__(41);

var _setPrototypeOf2 = _interopRequireDefault(_setPrototypeOf);

var _create = __webpack_require__(38);

var _create2 = _interopRequireDefault(_create);

var _keys = __webpack_require__(40);

var _keys2 = _interopRequireDefault(_keys);

var _defineProperty = __webpack_require__(2);

var _defineProperty2 = _interopRequireDefault(_defineProperty);

var _getPrototypeOf = __webpack_require__(39);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; (0, _defineProperty2.default)(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _tplFunc = __webpack_require__(37);

var _tplFunc2 = _interopRequireDefault(_tplFunc);

var _log = __webpack_require__(34);

var _log2 = _interopRequireDefault(_log);

var _tool = __webpack_require__(36);

var _regex = __webpack_require__(35);

var _eventBase = __webpack_require__(30);

var _eventBase2 = _interopRequireDefault(_eventBase);

var _ieCheck = __webpack_require__(33);

var _ieCheck2 = _interopRequireDefault(_ieCheck);

var _extendClass = __webpack_require__(32);

var _extendClass2 = _interopRequireDefault(_extendClass);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = (0, _create2.default)(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) _setPrototypeOf2.default ? (0, _setPrototypeOf2.default)(subClass, superClass) : subClass.__proto__ = superClass; } //vm类, 


/**
 组件强依赖zepto.js 或 jquery.js

 opt说明：
	element: 容器Dom元素（jquery对象或zepto对象）
	selfParam:存放自定义属性的，对象实例自己的属性和自己的方法（钩子方法可以放在这里）
 	stateBus: 用于组件间通信的(StateBus对象)
    tpl: 视图模板
	data: 跟视图相关的数据
    store：数据流控制
    childComponents：子组件

 component 构建流程
1. 解析模板（可以用这个过程，也可以没有）
2. 定义行为（事件行为 或 定时器行为）
3. 解析事件
4. 将解析模板得到的内容插入到DOM容器中 （可以用这个过程，也可以没有）
5. 添加解析完事件到DOM上
6. 销毁组件 （销毁事件，销毁定时器，销毁dom）
<div>
    <p>$placeholder</p>
    <p>$placeholder</p>
</div>
可以添加子组件
*/

var isDev = false;

var BaseVM = function (_EventBase) {
    _inherits(BaseVM, _EventBase);

    function BaseVM(opt) {
        _classCallCheck(this, BaseVM);

        var _this = _possibleConstructorReturn(this, (BaseVM.__proto__ || (0, _getPrototypeOf2.default)(BaseVM)).call(this));

        _this.element = opt.element;
        _this.selfParam = opt.selfParam || {};
        /***
         * 可以在这里自定义行为方法，
         * 子类重写
         * */
        _this.methods = opt.methods || null;
        /**
         * 事件对应的回掉函数在methods
         * 子类重写，
         * {'click .tab': 'get'} 用来给element子元素注册事件(事件代理)
         * {'click': 'get'} 用来给element元素注册事件
         * */
        _this.events = opt.events || null;
        /**
         * 子组件
         * childComponents = {name1: CompObject1, name2: CompObject2}
         * */
        _this.childComponents = opt.childComponents || null;
        _this.store = opt.store || null; //数据流
        _this.stateBus = opt.stateBus || null;
        _this.tpl = opt.tpl || null; //视图模板
        _this.data = opt.data || null; //跟视图相关的数据
        _this.isMounted = false; // 是否添加到页面中。
        _this._parentComp = null; //父组件 （子组件可以通过属性_parentComp访问父组件的参数）
        _this._eventArr = []; //内部使用
        _this._cackeHtml = ""; // 缓存拼接的html字符串
        _this._cId = (0, _tool.getRandomStr)('comp'); //实例的唯一识别
        _this._hasChild = false; //是否有子组件
        _this._isRoot = true; //是否为根组件
        _this._id = null; //获得子组件容器id
        isDev = opt.isDev || false;
        _this._prepareFunc();
        return _this;
    }
    //初始操作


    _createClass(BaseVM, [{
        key: '_prepareFunc',
        value: function _prepareFunc() {
            var k = this;
            k._bindProxy();
            if (k.childComponents) {
                k._hasChild = true;
                k._setParentForChild();
            }
            if (!k.element) {
                k.element = $('<div></div>');
            }

            if (isDev) {
                _log2.default.log('init');
            }
            if (k.tpl) {
                k._initParse();
            } else {
                //初始化操作
                k.init();
                //解析事件
                k._parseEvent();
                //添加事件
                k._addEventToDom();
            }
        }
        /**
         * 代理 selfParam 和 methods
         * */

    }, {
        key: '_bindProxy',
        value: function _bindProxy() {
            var k = this;
            if (k.selfParam) {
                if (_defineProperty2.default && _keys2.default && !_ieCheck2.default.ie7() && !_ieCheck2.default.ie8()) {
                    k._bindData();
                } else {
                    for (var key in k.selfParam) {
                        k[key] = k.selfParam[key];
                    }
                }
            }
            if (k.methods) {
                for (var method in k.methods) {
                    k[method] = (0, _tool.bind)(k.methods[method], k);
                }
                k.methods = null;
            }
        }
    }, {
        key: '_bindData',
        value: function _bindData() {
            var k = this;
            (0, _keys2.default)(k.selfParam).forEach(function (key) {
                (0, _defineProperty2.default)(k, key, {
                    configurable: true,
                    enumerable: true,
                    get: function proxyFunc() {
                        return k.selfParam[key];
                    },
                    set: function proxyFunc(val) {
                        k.selfParam[key] = val;
                    }
                });
            });
        }
        /**
         * 给子组件设置父组件对象
         * */

    }, {
        key: '_setParentForChild',
        value: function _setParentForChild() {
            var k = this;
            for (var key in k.childComponents) {
                k.childComponents[key]._parentComp = k;
                k.childComponents[key]._isRoot = false;
            }
        }
        /**
         * 将组件添加到页面中
         * param：路由传来的参数 (如果有路由的)
         * */

    }, {
        key: 'mounted',
        value: function mounted(param) {
            var k = this;
            //如果是根组件
            if (k._isRoot) {
                k.element.append(k._cackeHtml);
                k.init && k.init(param);
                k._addEventToDom();
                if (isDev) {
                    _log2.default.log('--------add Dom to document-----------');
                }

                for (var key in k.childComponents) {
                    k.childComponents[key].element = k.element.find(k.childComponents[key]._id);
                    k.childComponents[key].store = k.store;
                    k.childComponents[key].mounted(param);
                }
            } else {
                //如果不是是根组件
                k.init && k.init();
                k._addEventToDom();

                for (var _key in k.childComponents) {
                    k.childComponents[_key].element = k.element.find(k.childComponents[_key]._id);
                    k.childComponents[_key].store = k.store;
                    k.childComponents[_key].mounted();
                }
            }
            k.isMounted = true;
        }
        /***
         * 组件的初始化操作
         * 子类重写
         * param：路由传来的参数
         * */

    }, {
        key: 'init',
        value: function init(param) {}

        /**
         * 最好通过setData来更新组件的data数据，从而更新组件dom
         * (适用于没有子组件的组件)
         * */

    }, {
        key: 'setData',
        value: function setData(data) {
            var k = this;
            k.data = data;
            k._generateHTML();
            if (k._isRoot) {
                k.element.html(k._cackeHtml);
            } else {
                var cacheDom = $(k._cackeHtml);
                k.element.html(cacheDom.html());
            }
        }
    }, {
        key: '_generateHTML',
        value: function _generateHTML() {
            var k = this;
            if (k.data) {
                k._cackeHtml = k.tpl(k.data);
            } else {
                k._cackeHtml = k.tpl({});
            }

            if (isDev) {
                _log2.default.log("genetate html");
            }
            if (k._hasChild) {
                k._joinChildHtml();
            }
        }
    }, {
        key: '_joinChildHtml',
        value: function _joinChildHtml() {
            var k = this;
            if (isDev) {
                _log2.default.log(_regex._childReg);
            }
            k._cackeHtml = k._cackeHtml.replace(_regex._childReg, function (reg, creg) {
                if (isDev) {
                    //  Log.log(creg);
                }
                var childComp = k.childComponents[creg];
                var chtml = childComp._cackeHtml;
                if (isDev) {
                    // Log.log(chtml)
                }
                var id = (0, _tool.getRandomStr)('child').replace('.', "");
                var startTagStr = chtml.match(_regex._childRootDomReg)[0];
                startTagStr = startTagStr.replace(_regex._idReg, '');
                startTagStr = startTagStr.replace(/>$/, ' id="' + id + '">');
                childComp._id = "#" + id;
                chtml = chtml.replace(_regex._childRootDomReg, startTagStr);
                return chtml;
            });
        }

        /**
         * 销毁组件 子组件重写
         * */

    }, {
        key: 'destroy',
        value: function destroy() {
            var k = this;
            k.removeEvents();
            k.isMounted = false;
            //k.element = null;
            for (var key in k.childComponents) {
                k.childComponents[key].removeEvents();
                k.childComponents[key].element = null;
                //k.childComponents[key] = null;
            }
            k.element.html('');
        }
    }, {
        key: 'removeEvents',
        value: function removeEvents() {
            var k = this,
                arr = void 0;
            var len = k._eventArr.length;
            if (len === 0) {
                return;
            }
            for (var i = 0; i < len; i++) {
                arr = k._eventArr[i];
                k.element.off(arr[0]);
            }
            // k._eventArr = []; 不要清空
            if (isDev) {
                _log2.default.log('remove Event');
            }
        }
    }, {
        key: '_initParse',
        value: function _initParse() {
            var k = this;
            k._parseTpl();
            if (!k._isEventParsed) {
                k._isEventParsed = true;
                k._parseEvent();
            }
            k._generateHTML();
        }
    }, {
        key: '_parseTpl',
        value: function _parseTpl() {
            var k = this;
            k.tpl = _tplFunc2.default.parse(k._filterSpecialLetter(k.tpl));
            if (isDev) {
                _log2.default.log('parse template');
            }
        }
    }, {
        key: '_filterSpecialLetter',
        value: function _filterSpecialLetter(tpl) {
            /*
             控制字符的使用
             字符编码值	名称	正式名称	用途
             \u200C	零宽非连接符	<ZWNJ>	IdentifierPart
             \u200D	零宽连接符	<ZWJ>	IdentifierPart
             \uFEFF	位序掩码	<BOM>	Whitespace
               空白字符
             \u0009	制表符	<TAB>
             \u000B	纵向制表符	<VT>
             \u000C	进纸符	<FF>
             \u0020	空格	<SP>
             \u00A0	非断空格	<NBSP>
             \uFEFF	位序掩码	<BOM>
               行终止字符
             字符编码值	名称	正式名称
             \u000A	进行符	<LF>
             \u000D	回车符	<CR>
             \u2028	行分隔符	<LS>
             \u2029	段分隔符	<PS>
             */
            tpl = tpl.replace(/(\n+)|(\r+)|(\n*\r*)|(\u000A|\u000D|\u2028|\u2029)*/g, "");
            return tpl;
        }
        //解析事件

    }, {
        key: '_parseEvent',
        value: function _parseEvent() {
            var k = this;
            var reg = /\s+/;
            var kongReg = /(^\s*)|(\s*$)/g;
            var eArr = [];
            var l = void 0;
            if (!k.events) {
                return;
            }
            for (var key in k.events) {
                key = key.replace(kongReg, '');
                eArr = key.split(reg);
                eArr.push(k.events[key]);
                k._eventArr.push(eArr);
            }
            if (isDev) {
                _log2.default.log('parse Event');
            }
        }
        //事件添加到dom

    }, {
        key: '_addEventToDom',
        value: function _addEventToDom() {
            var k = this;
            for (var i = 0, len = k._eventArr.length; i < len; i++) {
                var eArr = k._eventArr[i];
                var l = eArr.length;
                if (l === 2) {
                    (function (eArr) {
                        k.element.on(eArr[0], function (e) {
                            k.methods[eArr[1]].call(k, e);
                        });
                    })(eArr);
                } else {
                    (function (eArr) {
                        k.element.on(eArr[0], eArr[1], function (e) {
                            var $t = $(this);
                            k.methods[eArr[2]].call(k, e, $t);
                        });
                    })(eArr);
                }
            }
            if (isDev) {
                _log2.default.log('add Event');
            }
        }
    }], [{
        key: 'extend',
        value: function extend(protoObj, staticObj) {
            return _extendClass2.default.call(this, protoObj, staticObj);
        }
    }]);

    return BaseVM;
}(_eventBase2.default);

exports.default = BaseVM;
;

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _defineProperty = __webpack_require__(2);

var _defineProperty2 = _interopRequireDefault(_defineProperty);

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; (0, _defineProperty2.default)(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * 路由类
 * 如果路由中有参数，会解析#/path?a=b&c=d成为 {url: '/path?a=b&c=d', a: b, c: d}
 * */

var Router = function () {
    function Router(routeTable, beforeRouter) {
        _classCallCheck(this, Router);

        this.routeTable = routeTable; //用户的注册路由表
        this.beforeRouter = beforeRouter; //钩子函数
        this.routes = {}; // 内部用（存放路由和其执行函数的Map）
        this.currentUrl = '/'; // 当前路由
        this.beforeUrl = ''; // 前一个路由
    }
    // 初始化路由事件


    _createClass(Router, [{
        key: 'initEvent',
        value: function initEvent() {
            var k = this;
            window.addEventListener('load', function () {
                k.refresh.call(k);
            }, false);
            window.addEventListener('hashchange', function () {
                k.refresh.call(k);
            }, false);
        }
        // 注册路由

    }, {
        key: 'route',
        value: function route(path, callback) {
            this.routes[path] = callback;
        }
        // 切换路由

    }, {
        key: 'refresh',
        value: function refresh() {
            this.beforeUrl = this.currentUrl;
            this.currentUrl = location.hash.slice(1) || '/';
            if (this.beforeRouter) {
                this.beforeRouter.call(this, this.currentUrl);
            } else {
                this.goToPage();
            }
        }
        /**
         * 手动设置路由
         * path: 设置的路由
         * isNoUser 是否是用户调用， 默认不传
         * */

    }, {
        key: 'setRoute',
        value: function setRoute(path, isNoUser) {
            window.location.hash = '#' + path;
            if (isNoUser) {
                if (path === this.currentUrl) {
                    this.goToPage();
                } else {
                    this._destroyComp();
                }
            }
        }
        /**
         * 回退路由
         * */

    }, {
        key: 'goBack',
        value: function goBack(num) {
            window.history.go(num);
        }
        /**
         * 根据路由，渲染组件到页面
         * */

    }, {
        key: 'goToPage',
        value: function goToPage(path) {
            this._destroyComp();
            var url = path || this.currentUrl;
            var param = this.parseParam(url);
            this.routes[url](param);
        }
        /**
         * 解析路由中的参数
         * */

    }, {
        key: 'parseParam',
        value: function parseParam(url) {
            var arr = url.split('?');
            if (arr.length === 1) {
                return { url: url };
            } else {
                var obj = {};
                var arr2 = arr[1].split('&');
                for (var i = 0, len = arr2.length; i < len; i++) {
                    var arr3 = arr2[i].split('=');
                    obj[arr3[0]] = arr3[1];
                }
                obj['url'] = url;
                return obj;
            }
        }
        /**
         * 用户自定义的beforeRouter函数里使用，
         * 来确定导航的方向
         * this.next(): 进行管道中的下一个钩子。如果全部钩子执行完了，
         * 则导航的状态就是 confirmed （确认的）。
         *  this.next(false): 中断当前的导航。如果浏览器的 URL 改变了
         * （可能是用户手动或者浏览器后退按钮），
         *  那么 URL 地址会重置到 from 路由对应的地址。
         * this.next('/') 跳转到一个不同的地址。
         * */

    }, {
        key: 'next',
        value: function next(path) {
            if (path === false) {
                this.goBack(-1);
            } else if (path === undefined) {
                this.goToPage();
            } else if (typeof path === 'string') {
                this.setRoute(path, true);
            }
        }

        /**
         *注销前一个页面组件
         */

    }, {
        key: '_destroyComp',
        value: function _destroyComp() {
            if (this.beforeUrl) {
                var comp = this.routeTable[this.beforeUrl];
                if (comp && comp.isMounted) {
                    comp.destroy();
                }
            }
        }
    }]);

    return Router;
}();

exports.default = Router;

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _defineProperty = __webpack_require__(2);

var _defineProperty2 = _interopRequireDefault(_defineProperty);

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; (0, _defineProperty2.default)(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

//�Զ����¼�����
var EventBase = function () {
    function EventBase() {
        _classCallCheck(this, EventBase);

        this._events_ = {};
    }

    _createClass(EventBase, [{
        key: "on",
        value: function on(type, callback, thisArg) {
            thisArg = thisArg || this;
            if (this._events_[type]) {
                this._events_[type].push({ cb: callback, thisArg: thisArg });
            } else {
                this._events_[type] = [];
                this._events_[type].push({ cb: callback, thisArg: thisArg });
            }
        }
    }, {
        key: "off",
        value: function off(type, callback) {
            if (!this._events_[type]) {
                return;
            }
            this._events_[type] = [];
        }
    }, {
        key: "trigger",
        value: function trigger(type, opt) {
            var funcs = this._events_[type];
            if (!funcs) {
                return;
            }
            var len = funcs.length;
            for (var i = 0; i < len; i++) {
                var cb = funcs[i].cb;
                var thisArg = funcs[i].thisArg;
                cb.call(thisArg, opt);
            }
        }
    }]);

    return EventBase;
}();

exports.default = EventBase;

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

exports.default = function (obj) {
	var length = arguments.length;
	var that = this,
	    target = void 0;
	if (!obj) {
		return null;
	}
	if (length < 2) {
		return obj;
	}

	for (var i = 1; i < length; i++) {
		target = arguments[i];
		for (var key in target) {
			//if(obj[key] === void 0) 
			obj[key] = target[key];
		}
	}
	return obj;
};

;
/**
* 拷贝属性
*/

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

exports.default = function (protoProps, staticProps) {
	var parent = this;
	var child = void 0;
	if (protoProps && Object.prototype.hasOwnProperty.call(protoProps, 'constructor')) {
		child = protoProps.prototype.constructor;
	} else {
		child = function child() {
			return parent.apply(this, arguments);
		};
	}
	//拷贝静态属性
	(0, _extend2.default)(child, parent, staticProps);
	//子类与父类之间的代理，使子类不能修改父类方法
	var proxy = function proxy() {
		this.constructor = child;
	};
	proxy.prototype = parent.prototype;
	child.prototype = new proxy();

	//拷贝原型属性
	if (protoProps) (0, _extend2.default)(child.prototype, protoProps);

	return child;
};

var _extend = __webpack_require__(31);

var _extend2 = _interopRequireDefault(_extend);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
* 继承工具方法
*/
;

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
var ua = navigator.userAgent;
exports.default = {
    ie8: function ie8() {
        var res = ua.indexOf('MSIE 8.0') > -1 ? true : false;
        return res;
    },
    ie7: function ie7() {
        var res = ua.indexOf('MSIE 7.0') > -1 ? true : false;
        return res;
    }
};

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

/**
 *
* 日志类
*/
var noop = function noop() {};
var console = window.console ? window.console : { log: noop, error: noop };
var Log = {
	log: console.log,
	error: console.error
};
exports.default = Log;

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
// 正则
var _childReg = exports._childReg = /\{\{([^\{\}]*)\}\}/g; //匹配子组件在父组件模板的占位符。
var _childRootDomReg = exports._childRootDomReg = /^<([a-z/][-a-z0-9_:.]*)[^>/]*>/; //子组件模板字符串首个tag的开始标签
var _idReg = exports._idReg = /id=[^\s>]*/;

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getRandomStr = getRandomStr;
exports.bind = bind;
function getRandomStr(str) {
    return str + '_' + String(new Date().getTime() * Math.random()).substr(0, 13);
}
function bind(fn, ctx) {
    return function (a) {
        var len = arguments.length;
        return len ? len > 1 ? fn.apply(ctx, arguments) : fn.call(ctx, a) : fn.call(ctx);
    };
}

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

/**
* template
*/

exports.default = {
	startTag: "<%",
	endTag: "%>",
	parse: function parse(str) {
		var reg = /^=(.+)/; //来判断是变量还是语句
		var startArr = str.split(this.startTag); //开始标识符分割的数组
		var endArr = void 0; //结束标识符分割的数组
		var variable = void 0;
		var varArr = void 0; //
		var temp = void 0;
		var html = void 0;
		var l = startArr.length;
		if (startArr.length === 1) {
			html = 'var str= \'' + str + '\'; return str;';
			return new Function('data', html);
		}
		html = ' var str=""; with(data) {';
		for (var i = 0; i < l; i++) {
			temp = startArr[i];
			endArr = temp.split(this.endTag);
			if (endArr.length === 1) {
				//纯字符串
				html += 'str+=\'' + endArr[0] + '\';';
			} else {
				//有变量或语句
				variable = endArr[0];
				varArr = variable.match(reg);
				if (varArr && varArr.length === 2) {
					//是变量

					html += 'str+=' + varArr[1] + ';';
					html += 'str+=\'' + endArr[1] + '\';';
				} else {
					html += endArr[0]; //是语句
					html += 'str+=\'' + endArr[1] + '\';';
				}
			}
		}
		html += '} return str;';
		//console.log(html);
		return new Function('data', html);
	}
};

/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(42), __esModule: true };

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(44), __esModule: true };

/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(45), __esModule: true };

/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(46), __esModule: true };

/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(65);
var $Object = __webpack_require__(0).Object;
module.exports = function create(P, D) {
  return $Object.create(P, D);
};


/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(66);
var $Object = __webpack_require__(0).Object;
module.exports = function defineProperty(it, key, desc) {
  return $Object.defineProperty(it, key, desc);
};


/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(67);
module.exports = __webpack_require__(0).Object.getPrototypeOf;


/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(68);
module.exports = __webpack_require__(0).Object.keys;


/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(69);
module.exports = __webpack_require__(0).Object.setPrototypeOf;


/***/ }),
/* 47 */
/***/ (function(module, exports) {

module.exports = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};


/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

// false -> Array#indexOf
// true  -> Array#includes
var toIObject = __webpack_require__(11);
var toLength = __webpack_require__(63);
var toAbsoluteIndex = __webpack_require__(62);
module.exports = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIObject($this);
    var length = toLength(O.length);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) if (IS_INCLUDES || index in O) {
      if (O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};


/***/ }),
/* 49 */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};


/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(9);
var createDesc = __webpack_require__(21);
module.exports = __webpack_require__(1) ? function (object, key, value) {
  return dP.f(object, key, createDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};


/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

var document = __webpack_require__(5).document;
module.exports = document && document.documentElement;


/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = __webpack_require__(49);
// eslint-disable-next-line no-prototype-builtins
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
  return cof(it) == 'String' ? it.split('') : Object(it);
};


/***/ }),
/* 53 */
/***/ (function(module, exports) {

module.exports = true;


/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
var anObject = __webpack_require__(3);
var dPs = __webpack_require__(55);
var enumBugKeys = __webpack_require__(17);
var IE_PROTO = __webpack_require__(10)('IE_PROTO');
var Empty = function () { /* empty */ };
var PROTOTYPE = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = __webpack_require__(16)('iframe');
  var i = enumBugKeys.length;
  var lt = '<';
  var gt = '>';
  var iframeDocument;
  iframe.style.display = 'none';
  __webpack_require__(51).appendChild(iframe);
  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
  // createDict = iframe.contentWindow.Object;
  // html.removeChild(iframe);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;
  while (i--) delete createDict[PROTOTYPE][enumBugKeys[i]];
  return createDict();
};

module.exports = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    Empty[PROTOTYPE] = anObject(O);
    result = new Empty();
    Empty[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = createDict();
  return Properties === undefined ? result : dPs(result, Properties);
};


/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(9);
var anObject = __webpack_require__(3);
var getKeys = __webpack_require__(19);

module.exports = __webpack_require__(1) ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var keys = getKeys(Properties);
  var length = keys.length;
  var i = 0;
  var P;
  while (length > i) dP.f(O, P = keys[i++], Properties[P]);
  return O;
};


/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

var pIE = __webpack_require__(59);
var createDesc = __webpack_require__(21);
var toIObject = __webpack_require__(11);
var toPrimitive = __webpack_require__(23);
var has = __webpack_require__(6);
var IE8_DOM_DEFINE = __webpack_require__(18);
var gOPD = Object.getOwnPropertyDescriptor;

exports.f = __webpack_require__(1) ? gOPD : function getOwnPropertyDescriptor(O, P) {
  O = toIObject(O);
  P = toPrimitive(P, true);
  if (IE8_DOM_DEFINE) try {
    return gOPD(O, P);
  } catch (e) { /* empty */ }
  if (has(O, P)) return createDesc(!pIE.f.call(O, P), O[P]);
};


/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
var has = __webpack_require__(6);
var toObject = __webpack_require__(12);
var IE_PROTO = __webpack_require__(10)('IE_PROTO');
var ObjectProto = Object.prototype;

module.exports = Object.getPrototypeOf || function (O) {
  O = toObject(O);
  if (has(O, IE_PROTO)) return O[IE_PROTO];
  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectProto : null;
};


/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

var has = __webpack_require__(6);
var toIObject = __webpack_require__(11);
var arrayIndexOf = __webpack_require__(48)(false);
var IE_PROTO = __webpack_require__(10)('IE_PROTO');

module.exports = function (object, names) {
  var O = toIObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) if (key != IE_PROTO) has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (has(O, key = names[i++])) {
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};


/***/ }),
/* 59 */
/***/ (function(module, exports) {

exports.f = {}.propertyIsEnumerable;


/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

// Works with __proto__ only. Old v8 can't work with null proto objects.
/* eslint-disable no-proto */
var isObject = __webpack_require__(7);
var anObject = __webpack_require__(3);
var check = function (O, proto) {
  anObject(O);
  if (!isObject(proto) && proto !== null) throw TypeError(proto + ": can't set as prototype!");
};
module.exports = {
  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
    function (test, buggy, set) {
      try {
        set = __webpack_require__(14)(Function.call, __webpack_require__(56).f(Object.prototype, '__proto__').set, 2);
        set(test, []);
        buggy = !(test instanceof Array);
      } catch (e) { buggy = true; }
      return function setPrototypeOf(O, proto) {
        check(O, proto);
        if (buggy) O.__proto__ = proto;
        else set(O, proto);
        return O;
      };
    }({}, false) : undefined),
  check: check
};


/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

var core = __webpack_require__(0);
var global = __webpack_require__(5);
var SHARED = '__core-js_shared__';
var store = global[SHARED] || (global[SHARED] = {});

(module.exports = function (key, value) {
  return store[key] || (store[key] = value !== undefined ? value : {});
})('versions', []).push({
  version: core.version,
  mode: __webpack_require__(53) ? 'pure' : 'global',
  copyright: '© 2018 Denis Pushkarev (zloirock.ru)'
});


/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(22);
var max = Math.max;
var min = Math.min;
module.exports = function (index, length) {
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};


/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.15 ToLength
var toInteger = __webpack_require__(22);
var min = Math.min;
module.exports = function (it) {
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};


/***/ }),
/* 64 */
/***/ (function(module, exports) {

var id = 0;
var px = Math.random();
module.exports = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};


/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(4);
// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
$export($export.S, 'Object', { create: __webpack_require__(54) });


/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(4);
// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
$export($export.S + $export.F * !__webpack_require__(1), 'Object', { defineProperty: __webpack_require__(9).f });


/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 Object.getPrototypeOf(O)
var toObject = __webpack_require__(12);
var $getPrototypeOf = __webpack_require__(57);

__webpack_require__(20)('getPrototypeOf', function () {
  return function getPrototypeOf(it) {
    return $getPrototypeOf(toObject(it));
  };
});


/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 Object.keys(O)
var toObject = __webpack_require__(12);
var $keys = __webpack_require__(19);

__webpack_require__(20)('keys', function () {
  return function keys(it) {
    return $keys(toObject(it));
  };
});


/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.19 Object.setPrototypeOf(O, proto)
var $export = __webpack_require__(4);
$export($export.S, 'Object', { setPrototypeOf: __webpack_require__(60).set });


/***/ }),
/* 70 */
/***/ (function(module, exports) {

module.exports = "<div class=\"d\">\r\n    第一子组件\r\n    {{grandSon}}\r\n    <p>测试</p>\r\n</div>"

/***/ }),
/* 71 */
/***/ (function(module, exports) {

module.exports = "<div>\r\n    第一孙子组件\r\n</div>"

/***/ }),
/* 72 */,
/* 73 */,
/* 74 */,
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _SPA = __webpack_require__(25);

var _SPA2 = _interopRequireDefault(_SPA);

var _child = __webpack_require__(24);

var _child2 = _interopRequireDefault(_child);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
webpack 分割代码，懒加载 ， import()返回的是Promise对象
*/
var asyncTable = {
    '/': _child2.default,
    '/test': function test() {
        return __webpack_require__.e/* import() */(1).then(__webpack_require__.bind(null, 26));
    },
    '/login': function login() {
        return __webpack_require__.e/* import() */(0).then(__webpack_require__.bind(null, 27));
    }
};
var spa = new _SPA2.default({
    table: asyncTable
});

/***/ })
/******/ ]);