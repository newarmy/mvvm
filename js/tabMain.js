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
/******/ 	return __webpack_require__(__webpack_require__.s = 28);
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
/* 4 */
/***/ (function(module, exports) {


/**
* 日志类
*/
console = window.console ? window.console : function(e){alert(e)};

module.exports = {
	log: console.log,
	error: console.error
};

/***/ }),
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */,
/* 9 */,
/* 10 */,
/* 11 */
/***/ (function(module, exports) {

module.exports = "<ul id=\"tabH\" style=\"overflow: hidden\">\r\n    <%for(var i = 0, len = arr.length; i < len; i++) {%>\r\n    <li style=\"width: 100px; text-align:center; line-height:40px;float:left;\"><%=arr[i].head%></li>\r\n    <%}%>\r\n</ul>\r\n<div id=\"tabC\">\r\n    <%for(var i = 0, len = arr.length; i < len; i++) {%>\r\n    <div style=\"width:100%;height:200px;background:#ff0;color:#000;\"><%=arr[i].content%></div>\r\n    <%}%>\r\n</div>"

/***/ }),
/* 12 */,
/* 13 */,
/* 14 */,
/* 15 */,
/* 16 */,
/* 17 */,
/* 18 */,
/* 19 */,
/* 20 */,
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

var baseComp = __webpack_require__(22);
var tabComp = baseComp.extend({
    //做一些组件初始化操作
    init: function () {
        var k = this;
        k.heads = k.element.find('li');
        k.cons = k.element.find('#tabC').find('div');
        k.heads.removeClass('cur').eq(0).addClass('cur');
        k.cons.removeClass('cur').eq(0).addClass('cur');
    },
    // 注册事件
    events: {
        'click li': 'showCurrentDiv'
    },
    // 事件对应的行为函数
    methods: {
        // 事件对应的行为函数
        showCurrentDiv: function (e, it) {
            var k = this;
            e.preventDefault();
            var index = it.index();
            k.heads.removeClass('cur').eq(index).addClass('cur');
            k.cons.removeClass('cur').eq(index).addClass('cur');
        }
    },
    // 销毁
    destroy: function () {
        var k = this;
        k.removeEvents();
        k.heads = null;
        k.cons = null;
        k.element = null;
    }
});
module.exports = tabComp;

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

//vm类, 

var extend = __webpack_require__(0);
var extendClass = __webpack_require__(2);
var eventBase = __webpack_require__(1);
var tplObj = __webpack_require__(3);
var Log = __webpack_require__(4);
/**
	opt说明：
	element: 容器Dom元素（jquery对象或zepto对象）
	selfParam:存放自定义属性的，对象实例自己的属性和自己的方法（钩子方法可以放在这里）
 	stateBus: 用于组件间通信的(StateBus对象)
    tpl: 视图模板
	data: 跟视图相关的数据

    通过baseVM.extend({})来扩展创建自己的component，这里说的component是
    指一个独立的交互效果
    如：

 tabComp = baseComp.extend({
     //做一些组件初始化操作
     init: function() {
         var k = this;
         k.heads = k.element.find('li');
         k.cons = k.element.find('#tabC').find('div');
         k.heads.removeClass('cur').eq(0).addClass('cur');
         k.cons.removeClass('cur').eq(0).addClass('cur');
     },
     // 注册事件
     events: {
         'click li': 'showCurrentDiv'
     },
    methods:{
        // 事件对应的行为函数
        showCurrentDiv: function(e, it) {
            var k = this;
            e.preventDefault();
            var index = it.index();
            k.heads.removeClass('cur').eq(index).addClass('cur');
            k.cons.removeClass('cur').eq(index).addClass('cur');
        }
    }，
    // 销毁
    destroy: function() {
        var k = this;
        k.removeEvents();
        k.heads = null;
        k.cons = null;
        k.element = null;
    }

   component 构建流程
1. 解析模板（可以用这个过程，也可以没有）
2. 定义行为（事件行为 或 定时器行为）
3. 解析事件
4. 将解析模板得到的内容插入到DOM容器中 （可以用这个过程，也可以没有）
5. 添加解析完事件到DOM上
6. 销毁组件 （销毁事件，销毁定时器，销毁dom）

*/
var isDev = false;
function baseVM(opt) {
	this.element = opt.element;
	this.selfParam = opt.selfParam || {};
	this.stateBus = opt.stateBus || null;
	this.tpl = opt.tpl || null;//视图模板
	this.data = opt.data || null;//跟视图相关的数据
	this._eventArr = [];//内部使用
    this._cId = 'comp'+(String((new Date()).getTime()*Math.random()).substr(0,13));//实例的唯一识别
	isDev = opt.isDev || false;
	this._prepareFunc();
}
extend(baseVM.prototype, eventBase, {
    //初始操作
	_prepareFunc: function() {
        var k = this;

        if(!k.element) {
            k.element =$('<div></div>');
        }
        if(isDev){
            Log.log('init');
		}
        if(k.tpl) {
            k._initParse();
        } else {
           //初始化操作
			k.init();
            //解析事件
            k._parseEvent();
            //添加事件
			k._addEventToDom();
        }
	},
    append: function() {

    },
    /***
	 * 组件的初始化操作
	 * 子类重写
	 * */
    init: function() {

	},
    /***
	 * 可以在这里自定义行为方法，
	 * 子类重写
	 * */
    methods: {

	},
    /**
    * 事件对应的回掉函数在methods
	 * 子类重写，
    * {'click .tab': 'get'} 用来给element子元素注册事件(事件代理)
    * {'click': 'get'} 用来给element元素注册事件
    * */
	events: null,
    /**
     * 销毁组件 子组件重写
     * */
    destroy: function() {
        var k = this;
        k.removeEvents();
        k.element = null;
    },
	removeEvents: function() {
		var k = this, arr;
		for(var i = 0, len = k.eventArr.length; i < len; i++) {
			arr = k.eventArr[i];
			k.element.off(arr[0]);
		}
        k.eventArr = [];
        if(isDev){
            Log.log('remove Event');
        }
	},
	render: function() {
		var k = this;
        var html = k.tpl(k.data);
        if(isDev) {
            Log.log("html === "+html);
            Log.log( k.element);
        }
        k.element.html(html);
        setTimeout(function(){
            k.init();
            if(isDev){
                Log.log('init Dom');
            }
        	k._addEventToDom();
		});
	},
    _initParse: function() {
        var k = this;
        k._parseTpl();
        if(!k._isEventParsed) {
            k._isEventParsed = true;
            k._parseEvent();
        }
        k.render();
    },
    _parseTpl: function() {
        var k = this;
        k.tpl = tplObj.parse(k._filterSpecialLetter(k.tpl));
        if(isDev){
            Log.log('parse template');
        }
    },
    _filterSpecialLetter: function(tpl) {
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
    //解析事件
    _parseEvent: function() {
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
        if(isDev){
            Log.log('parse Event');
        }
    },
    //事件添加到dom
    _addEventToDom: function() {
        var k = this;
        for(var i = 0, len = k._eventArr.length; i < len; i++) {
            eArr = k._eventArr[i];
            l = eArr.length;
            if(l === 2) {
                (function(eArr){
                    k.element.on(eArr[0], function(e) {
                        k.methods[eArr[1]].call(k, e);
                    });
                }(eArr));
            } else {
                (function(eArr){
                    k.element.on(eArr[0], eArr[1], function(e) {
                        var $t = $(this);
                        k.methods[eArr[2]].call(k, e, $t);
                    });
                }(eArr));
            }
        }
        if(isDev){
            Log.log('add Event');
        }
    }
});

baseVM.extend = extendClass;

module.exports = baseVM;

/***/ }),
/* 23 */,
/* 24 */,
/* 25 */,
/* 26 */,
/* 27 */,
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

//vm类, 
/**

*/
var TabComp = __webpack_require__(21);
var tpl = __webpack_require__(11);

var dom = $('.box');

new TabComp({
	element: dom,
	tpl: tpl,
	isDev: true,
	data: {arr: [{head: 'test1',content: 'test content1'}, {head: 'test2',content: 'test content2'}]}
})

/***/ })
/******/ ]);