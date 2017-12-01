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
/******/ 	return __webpack_require__(__webpack_require__.s = 22);
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
/***/ (function(module, exports) {


/**
* template
*/

var template = {
	startTag: "<%",
	endTag: "%>",
	parse: function (str) {
		var reg = /^=(.+)/;//来判断是变量还是语句
		var startArr = str.split(this.startTag);//开始标识符分割的数组
		var endArr;//结束标识符分割的数组
		var variable;
		var varArr;//
		var html = 'var data = arguments[0];  var str=""; with(data){';
		var temp;
		for(var i = 0, l = startArr.length; i < l; i++) {
			temp = startArr[i];
			 endArr = temp.split(this.endTag);
			if(endArr.length == 1) {//纯字符串
				html+='str+=\''+endArr[0]+'\';';
			} else {//有变量或语句
				variable = endArr[0];
				varArr = variable.match(reg);
				if(varArr && varArr.length==2) {//是变量
					
					html +='str+='+ varArr[1]+';'; 
					html += 'str+=\''+endArr[1]+'\';';
				} else {
					html += endArr[0];//是语句
					html += 'str+=\''+endArr[1]+'\';';
				}
			}
		}
		html+='} return str;';
		//console.log(html);
		return new Function( html);
	}
};
module.exports = template;

/***/ }),
/* 4 */,
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */,
/* 9 */,
/* 10 */,
/* 11 */,
/* 12 */,
/* 13 */,
/* 14 */,
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

//数据加载处理模块
/**
	opt.url： 数据的地址 
*/
var extend = __webpack_require__(0);
var request = __webpack_require__(20);
var extendClass = __webpack_require__(2);
var eventBase = __webpack_require__(1);
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
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

//集中管理状态的基类
//需要和组件配合来传递数据，
/*步骤是:   1. 组件引入状态对象。
			2. 一个组件修改了一个状态值（通过事件修改），
			   就通知所有公用这个状态的组件（通过事件通知）。
			3. 公用这个状态的组件根据接收到的数据，触发相应的行为
*/
var extend = __webpack_require__(0);
var extendClass = __webpack_require__(2);
var eventBase = __webpack_require__(1);
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
			var targetClassId = opt.classId ? opt.classId : k.classId;
			var newOpt = {
				type: state,
				payload: opt.payload,
				classId: targetClassId//标示哪个state对象触发的事件
			};
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
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

//vm基类,

var extend = __webpack_require__(0);
var extendClass = __webpack_require__(2);
var eventBase = __webpack_require__(1);
var tplObj = __webpack_require__(3);
/**
	opt说明：
    element: 容器Dom元素（jquery对象或zepto对象）
	tpl: 模板
	model: 数据模型 (ModelBase 或其子类)
	selfParam:自定义属性，对象实例自己的属性
    stateBus: 用于组件间通信的(StateBus对象)
*/
function VM(opt) {
	this.element = opt.element;
	this.model = opt.model;
	this.tpl = opt.tpl;//string or object
	this.selfParam = opt.selfParam || {};
	this.stateBus = opt.stateBus || null;
	this._eventArr = [];//内部使用
	this._isEventParsed = false;//是否解析完dom事件
	this.prepareFunc();
}

extend(VM.prototype, eventBase, {
	prepareFunc: function() {
		var k = this;
		if(!k.element) {
			k.element =$('<div></div>');
		}
		if(k.tpl) {
			k.init();
		} else {
			k.noModelInit();
		}
	}, //初始操作，子类可以重写, 调用noModelInit方法或调用init方法
	events: null,//{'click .tab': 'get'} 用来给dom元素注册事件(事件代理)
    noModelInit: function() {//没有用到MODEL组件的时候，要需要调用noModelInit来解析自定义事件，
    	this.parseEvent();
    },
	init: function() {//用到MODEL组件的时候，要需要调用init来初始化数据事件和自定义dom事件，
		var k = this;
		k.handlerTemplate();
		k.model.on('getData', k.render, k);
		k.model.on('error', k.error, k);
		if(!k._isEventParsed) {
			k._isEventParsed = true;
			k.parseEvent();
		}
	},
	handlerTemplate: function() {
		var k = this;
		if(Object.prototype.toString.call(k.tpl) === '[object String]') {
			k.tpl = tplObj.parse(k.filterSpecialLetter(k.tpl));
		} else {
			for(var key in k.tpl) {
				k.tpl[key] = tplObj.parse(k.filterSpecialLetter(k.tpl[key]));
			}
		}
	},
	filterSpecialLetter: function(tpl) {
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
		 tpl = tpl.replace(/(\n+)|(\r+)|(\n*\r*)|(\u000A|\u000D|\u2028|\u2029)*/g,"");
		 return tpl;
	},
	//用到MODEL组件的时候，调用这个方法来获取数据，
	//opt的值跟$.ajax(opt)的参数一致
	toGetData: function(opt) {
		var k = this;
		k.model.request(opt);
	},
	//render方法可以重写， 需要更新dom的vm对象重写render方法
	render: function(data) {
		var k = this;
		var html = k.tpl(data);
		if(k.el) {
			k.el.html(html);
		} else {
			k.element.html(html);
		}
	},
	error: function() {
		
	},
	parseEvent: function() {
		var k = this;
		var reg = /\s+/;
		var kongReg = /(^\s*)|(\s*$)/g;
		var eArr = [];
		var l;
		if (!k.events) {
			return;
		}
		for(var key in k.events) {
			key = key.replace(kongReg, '');
			eArr = key.split(reg);
			eArr.push(k.events[key]);
			k._eventArr.push(eArr);
		}
		for(var i = 0, len = k._eventArr.length; i < len; i++) {
			eArr = k._eventArr[i];
			l = eArr.length;
			if(l == 2) {
				(function(eArr){
					k.element.on(eArr[0], function(e) {
						k[eArr[1]].call(k, e);
					});
				}(eArr));
				
			} else {
				(function(eArr){
					k.element.on(eArr[0], eArr[1], function(e) {
						var $t = $(this);
						k[eArr[2]].call(k, e, $t);
					});
				}(eArr));
				
			}
		}
	},
	removeEvents: function() {
		var k = this, arr;
		for(var i = 0, len = k._eventArr.length; i < len; i++) {
			arr = k._eventArr[i];
			k.element.off(arr[0]);
		}
        k._eventArr = [];
	}
});

VM.extend = extendClass;

module.exports = VM;

/***/ }),
/* 18 */,
/* 19 */,
/* 20 */
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
        headers: opt.headers,
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
/* 21 */,
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

//vm类, 
/**

*/
var ModelBase = __webpack_require__(15);
var VM = __webpack_require__(17);
var StateBus = __webpack_require__(16);

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
/******/ ]);