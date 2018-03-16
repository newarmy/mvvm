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
/******/ 	return __webpack_require__(__webpack_require__.s = 38);
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
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

/***/ 17:
/***/ (function(module, exports, __webpack_require__) {

//数据加载处理模块
/**
	opt.url： 数据的地址 
*/
var extend = __webpack_require__(0);
var request = __webpack_require__(31);
var extendClass = __webpack_require__(3);
var eventBase = __webpack_require__(2);
function ModelBase () {
	//接收数据的属性
	this.data = {};
	//ajax请求参数对象。可以是一个请求参数对象，也可以是多个请求参数对象（多个值时为数组）
	this.requestParam =  null;
	this.requestCount = 0;
	this.totalRequest = 0;
	this.mainName = null;//主要数据属性名称
}
extend(ModelBase.prototype, eventBase, {
	 _ajax: function (opt) {
		var k = this;
		//var successFunc = opt.success;
		//var errorFunc = opt.error;
		opt.timeout = 10000;
		opt.success = function(json, stateText, jqXHR, that) {
			json = k.parse(json, that.name);
			k.data[that.name] = json;
			k.requestCount++;
			if(k.requestCount === k.totalRequest) {
				k.trigger('getData', k.data);
				/*if(successFunc) {
					successFunc(k.data);
				}*/
			}
			
			
		};
		//函数说明：传入jqXHR对象、描述状态的字符串”error”、错误信息
		opt.error = function (jqXHR, textStatus, errorThrown, that) {
			k.data = {};
			/*if(errorFunc) {
				errorFunc(jqXHR, textStatus, errorThrown);
			}*/
			if(that.name === k.mainName) {
				k.trigger('error', textStatus);
			}
			
		};
		request(opt);
	},
	//设置请求参数，子类重写覆盖， VM对象中可以修改请求参数 k.model.requestParam
	/**
	*  参数示例1:
	*  {
	*     url: '',
	*     data: {
	*     	id: 1
	*     },
	*     context: {name: 'type-1'}
	*  }
	* 参数示例2:
	*   [
	*   	{
	*     		url:'',
	*     		data: {id:1},
	 *    		context: {name:'type-1'}
	 *    	},
	 *     {
	 *     		url:'',
	 *     		data: {id:2},
	 *    		context: {name:'type-2'}
	 *    	},
	 *  ]
	*   参数示例3: {
	*   	request-1: {
	*   		url: '',
	*   		context: {name: 'type-1'}
    *       },
	*	    request-2: {
	*	    	url: '',
	*	       context: {name: 'type-2'}
	*	    }
	*   }
	*    参数示例4: {
	*    	request-1: [{}, {}],
	*       request-2: [{}, {}]
	*    }
	* */
	setRequestParam: function(requestParam) {
		var k = this;
		k.requestParam = requestParam;
	},
	//请求接口
	request: function (opt) {
		var k = this;
		if(!opt){
			opt = k.requestParam;
		}
		var isArray = $.isArray(opt);
		k.requestCount = 0;
		k.data ={};
		if(isArray) {
			k.totalRequest = opt.length;
			for(var i =0; i< k.totalRequest; i++) {
				(function(i) {
					if(i === 0) {
						k.mainName = opt[i].context.name;
					}
					k._ajax(opt[i]);
				}(i));
			}
		} else {
			k.totalRequest = 1;
			k._ajax(opt);
		}
		
	},
	//子类可重写，处理返回的数据并返回处理后的数据
	parse: function (json) {
		return json;
	}
});

ModelBase.extend = extendClass;

module.exports = ModelBase;

/***/ }),

/***/ 19:
/***/ (function(module, exports, __webpack_require__) {

//集中管理状态的基类
//需要和组件配合来传递数据，
/*步骤是:   1. 组件引入状态对象。
			2. 一个组件修改了一个状态值（通过事件修改），
			   就通知所有公用这个状态的组件（通过事件通知）。
			3. 公用这个状态的组件根据接收到的数据，触发相应的行为
*/
var extend = __webpack_require__(0);
var extendClass = __webpack_require__(3);
var eventBase = __webpack_require__(2);
/**
* 
*/
function stateBus(opt) {
	this.states = opt.states;// {'state': 'statename'}, 状态名
	this.parentBus = opt.parentBus || null;
	//对象的唯一标示
	this.classId = (new Date()).getTime()+"_class_"+Math.random();
	this.init();
}
extend(stateBus.prototype, eventBase, {
	init: function () {
		var k = this;
		for(var key in k.states) {
			this.register(k.states[key]);
		}
		if(k.parentBus) {
			k.handlerParentBus();
		}
	},
	setParentBus: function(pbus) {
		var k =this;
		k.parentBus = pbus;
		k.handlerParentBus();
	},
	//注册状态
	register: function (state) {
		var k = this;
		k._addListener(state);
	},
	//内部使用，中转事件
	_addListener: function(state) {
		var k = this;
		k.on(state+"_change", function(opt) {
			var targetClassId = (opt && opt.classId) ? opt.classId : k.classId;
			var newOpt = {
				type: state,
				classId: targetClassId//标示哪个state对象触发的事件
			};
			if(opt && opt.payload) {
                newOpt.payload = opt.payload;
			}
			k.trigger(newOpt.type, newOpt);

			if(k.parentBus && k.parentBus.states[newOpt.type]) {
				k.parentBus.dispatch(newOpt.type,  newOpt);
			}
		}, k);
	},
	//触发事件,
	dispatch: function(state, opt) {
		var k = this;
		k.trigger(state+'_change', opt);
	},
	//处理全局公共state（state中父状态对象传回到子状态对象的处理）
	handlerParentBus: function() {
		var k = this;
		for(var key in k.parentBus.states) {
			if(k.states[key]) {
				(function(k, key) {
					k.parentBus.on(key, function(opt) {
						if(opt.classId === k.classId) {
							return;
						}
						k.trigger(key, opt);
					}); 
				})(k, key);
			}
		}
	}
});
stateBus.extend = extendClass;
module.exports = stateBus;

/***/ }),

/***/ 2:
/***/ (function(module, exports) {

//�Զ����¼�����
module.exports = {
	on: function(type, callback, thisArg) {
		this.events || (this.events = {});
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

/***/ 3:
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

/***/ 31:
/***/ (function(module, exports) {


/**
* 请求模块
*/

module.exports = function (opt) {
	var options = {
		url: opt.url,
		dataType : opt.dataType || 'json',
		data: opt.data || {},
		context: opt.context || true,
        headers: opt.headers || {'X-Requested-With': 'XMLHttpRequest'},
        contentType: opt.contentType,
        mimeType: opt.mimeType,
        type: opt.method || "GET",
		success:function(data, stateText, jqXHR){
			opt.success(data, stateText, jqXHR, this);
		},
		error:function(jqXHR, textStatus, errorThrow){
			opt.error && opt.error(jqXHR, textStatus, errorThrow, this);
		}
	};
	if(opt.jsonp) {
		options.jsonp = opt.jsonp;
	}
	if(opt.jsonpCallback) {
		options.jsonpCallback = opt.jsonpCallback;
	}

	$.ajax(options);	
};


/***/ }),

/***/ 38:
/***/ (function(module, exports, __webpack_require__) {

//vm类, 
/**

*/
var ModelBase = __webpack_require__(17);
var VM = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"../src/VM\""); e.code = 'MODULE_NOT_FOUND';; throw e; }()));
var StateBus = __webpack_require__(19);

var stateObj = {
	subId: 'subId'
}

var globalStateBus =  new StateBus({states: stateObj});
globalStateBus.on(stateObj.subId, function(data) {
    alert(data.payload);
});

globalStateBus.dispatch(stateObj.subId, {payload: 22});




//创建自己的model类，主要就是重新parse方法，
//不需要重写parse方法时，可以直接用
//ModelBase创建对象
var cModel = ModelBase.extend({});
//生成model对象，以供VM用。
var cm = new cModel();

//创建自己的component类,继承在VM
var cVM = VM.extend({
	events: {'click li': 'show'},
	show: function(e) {
		var tar = e.target;
		alert(tar.innerHTML);
	}
});
//创建组件对象
var cv = new cVM({
	element: $('.box'),
	model: cm,
	tpl: '<li><%=name%></li>'
});

cv.init();
cv.toGetData({
	url: '/data/main.json',
	dataType: 'json'
});

/***/ })

/******/ });