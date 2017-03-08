/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
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
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 7);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {


/**
* 拷贝属性
*/

module.exports = function (obj) {
	var length = arguments.length;
	var that = this, target;
	if(!obj) {
		return null;
	}
	if(length < 2 ) {
		return obj;
	}
	
	for(var i = 1; i < length; i++) {
		target = arguments[i];
		for(var key in target) {
			//if(obj[key] === void 0) 
			obj[key] = target[key];
		}
	}
	return obj;
	
};


/***/ }),
/* 1 */
/***/ (function(module, exports) {

//�Զ����¼�����
module.exports = {
	events: {},
	on: function(type, callback, thisArg) {
		thisArg = thisArg || this;
		if(this.events[type]) {
			this.events[type].push({cb: callback, thisArg: thisArg});
		} else {
			this.events[type] = [];
			this.events[type].push({cb: callback, thisArg: thisArg});
		}
	},
	off: function(type, callback) {
		if(!this.events[type]) {
			return;
		}
		this.events[type] = [];
	},
	trigger: function(type, opt) {
		var funcs = this.events[type];
		if(!funcs) {
			return;
		}
		var len = funcs.length;
		for(var i =0; i < len; i++) {
			var cb = funcs[i].cb;
			var thisArg = funcs[i].thisArg;
			cb.call(thisArg, opt);
		}
	}
};

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {


/**
* 继承工具方法
*/
var extend = __webpack_require__(0);
module.exports = function (protoProps, staticProps) {
	var parent = this;
	var child;
	if(protoProps && Object.prototype.hasOwnProperty.call(protoProps, 'constructor')) {
		child = protoProps.prototype.constructor;
	} else {
		child = function () {
			return parent.apply(this, arguments);
		};
	}
	//拷贝静态属性
	extend(child, parent, staticProps);
	//子类与父类之间的代理，使子类不能修改父类方法
	var proxy = function() {
		this.constructor = child;
	};
	proxy.prototype = parent.prototype;
	child.prototype = new proxy();
	
	//拷贝原型属性
	if (protoProps) extend(child.prototype, protoProps);
	
	return child;
};

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

//数据处理
/**
	opt.url, 
*/
var extend = __webpack_require__(0);
var request = __webpack_require__(5);
var extendClass = __webpack_require__(2);
var eventBase = __webpack_require__(1);
function ModelBase (opt) {
	//接收数据的属性
	this.data = null;
	this.url = opt.url || null;
}
extend(ModelBase.prototype, eventBase, {
	 _ajax: function (opt) {
		var k = this;
		k.on('getData', function (opt) {
			k.broadCast(opt);
		});
		opt.success = function(json) {
			json = k.parse(json);
			k.data = json;
			k.trigger('getData', k.data);
		};
		opt.error = function () {
			k.data = null;
		};
		request(opt);
	},
	//请求接口
	request: function (opt) {
		var k = this;
		opt.url = opt.url || k.url;
		k._ajax(opt);
	},
	//设置url
	url: function (url) {
		var k = this;
		k.url = url;
	},
	//子类可重写，处理返回的数据
	parse: function (json) {
		return json;
	},
	//广播数据
	broadCast: function(opt) {
		return opt;
	}
});
ModelBase.extend = extendClass;

module.exports = ModelBase;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

//vm类, 
/**

*/
var extend = __webpack_require__(0);
var extendClass = __webpack_require__(2);
var eventBase = __webpack_require__(1);
var templateFunc = __webpack_require__(6);
function VM(opt) {
	this.element = opt.element;
	this.model = opt.model;
	this.url = opt.url;
	this.tpl = opt.tpl;
	this.eventArr = [];//
	this.isEventParsed = false;
}

extend(VM.prototype, eventBase, {
	events: {'click .tab': 'get'},
	init: function(opt) {
		var k = this;
		k.model.on('getData', k.render, k);
		k.model.request(opt);
	},
	render: function(data) {
		var k = this;
		var html = templateFunc(k.tpl, data);
		k.element.html(html);
		if(!k.isEventParsed) {
			k.isEventParsed = true;
			k.parseEvent();
		}
	},
	parseEvent: function() {
		var k = this;
		var reg = /\s+/;
		var eArr = [];
		var l;
		for(var key in k.events) {
			eArr = key.split(reg);
			eArr.push(k.events[key]);
			k.eventArr.push(eArr);
		}
		for(var i = 0, len = k.eventArr.length; i < len; i++) {
			eArr = k.eventArr[i];
			l = eArr.length;
			if(l == 2) {
				k.element.on(eArr[0], function(e) {
					k[eArr[1]].call(k, e);
				});
			} else {
				k.element.on(eArr[0], eArr[1], function(e) {
					k[eArr[2]].call(k, e);
				});
			}
		}
	},
	removeEvents: function() {
		var k = this, arr;
		for(var i = 0, len = k.eventArr; i < len; i++) {
			arr = k.eventArr[i];
			k.element.off(arr[0]);
		}
	}
});

VM.extend = extendClass;

module.exports = VM;

/***/ }),
/* 5 */
/***/ (function(module, exports) {


/**
* 请求模块
*/

module.exports = function (opt) {
	var options = {
		url: opt.url,
		dataType : opt.dataType || 'json',
		data: opt.data || {},
		type: opt.method || "GET",
		success:function(data){
			opt.success(data);
		},
		error:function(){
			opt.error();
		}
	};
	if(opt.jsonp) {
		options.jsonp = opt.jsonp;
	}
	if(opt.jsonpCallback) {
		opt.jsonpCallback = opt.jsonpCallback;
	}
	$.ajax(options);	
};


/***/ }),
/* 6 */
/***/ (function(module, exports) {


/**
* cookie
*/

function template(str, obj) {
	return str.replace(/\{\{([^\{\}]+)\}\}/gi, function(regResult/*完全匹配的结果*/, childRegResult/*第一个子分组匹配的结果*/) {
		var key = childRegResult.replace(/\s/gi, "");
		var result;
		//console.log(key);
		if(obj[key] || obj[key] === 0) {
			result = obj[key];
		}
		return result;
	});
}
var isArray = Array.isArray || function(obj) {
    return Object.prototype.toString.call(obj) === '[object Array]';
};
module.exports = function (tpl, json) {
	var isArr = isArray(json);
	var resStr = '';
	if(isArr) {
		for(var i = 0, len = json.length; i < len; i++) {
			resStr += template(tpl, json[i]);
		}
	} else {
		resStr = template(tpl, json);
	}
	return resStr;
};

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

//vm类, 
/**

*/
var ModelBase = __webpack_require__(3);
var VM = __webpack_require__(4);



var cModel = ModelBase.extend({});
var cm = new cModel({});
var cVM = VM.extend({
	events: {'click li': 'show'},
	show: function(e) {
		var tar = e.target;
		alert(tar.innerHTML);
	}
});
var cv = new cVM({
	element: $('.box'),
	model: cm,
	tpl: '<li>{{name}}</li>'
});

cv.init({
	url: '/data/main.json',
	dataType: 'json'
});

/***/ })
/******/ ]);