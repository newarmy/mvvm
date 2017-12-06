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
/******/ 	return __webpack_require__(__webpack_require__.s = 27);
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
/* 6 */
/***/ (function(module, exports) {

/**
 * Created by xinjundong on 2017/12/4.
 */
// 事件回调方法缓存到 __EventCallback__
window.__EventCallback__ = {}
// 事件类型管理对象
window.__EventTypeManager__ = {}


/**
 * 获取一个随机字符串
 * */
function getRandomStr (str) {
    return str + '_' + String((new Date()).getTime() * Math.random()).substr(0, 13).replace('.', 'a')
}

function getCurrentSelector(tar, type) {
    var currentClassName;
    switch(type) {
        case 1:
            currentClassName = tar.className;
            break;
        case 2:
            currentClassName = tar.id;
            break;
        case 3:
            currentClassName = tar.tagName.toLowerCase();

    }
    return currentClassName;
}
function getCurrentTarget(tar, className, classType){
    var currentClassName = getCurrentSelector(tar, classType);
    className = className.replace(/(^\s*)|(\s*$)/g, '');
    while(currentClassName.indexOf(className) === -1) {
        if(tar.flag) {
            return null;
        }
        tar = tar.parentNode;
        currentClassName = getCurrentSelector(tar, classType);
    }
    return tar;
}

module.exports = {
    addEvent: function (dom, type, func) {
       var callbackKey = getRandomStr(type);
       window.__EventCallback__[callbackKey] = func;
       if(!window.__EventTypeManager__[type]) {
           window.__EventTypeManager__[type] = []
       }
       window.__EventTypeManager__[type].push(window.__EventCallback__[callbackKey]);
       dom.addEventListener(type, window.__EventCallback__[callbackKey])
    },
    removeEvent: function (dom, type, func) {
        if(func) {
            dom.removeEventListener(type, func);
            return;
        }
        for (var eventType in window.__EventTypeManager__) {
            if(eventType === type) {
                var eventArr = window.__EventTypeManager__[eventType];
                for(var i = 0, len = eventArr.length; i < len; i++) {
                    var funci = eventArr[i];
                    dom.removeEventListener(eventType, funci);
                    funci = null;
                }
                window.__EventTypeManager__[eventType] = null;
                eventArr = null;
            }

        }
    },
    removeAllEvent: function(dom) {
        for (var type in window.__EventTypeManager__) {
            var eventArr = window.__EventTypeManager__[type];
            for(var i = 0, len = eventArr.length; i < len; i++) {
                var funci = eventArr[i];
                dom.removeEventListener(type, funci);
                funci = null;
            }
            window.__EventTypeManager__[type] = null;
            eventArr = null;
        }
    },
    addProxyEvent: function (dom, type, selector, func) {
        var k = this;
        dom.flag = "parent";
        var className;
        // 1: class, 2: id, 3: tag
        var selectorType = 3
        if (selector.indexOf('.') === 0) {
            selectorType = 1;
            className = selector.replace('.', '');
        } else if(selector.indexOf('#') === 0) {
            selectorType = 2;
            className = selector.replace('#', '');
        } else {
            className = selector;
        }
        var proxyFunc = function(e) {
            var t = e.target;
            var tar = getCurrentTarget(t, className, selectorType);
            var eventObj = {
                target: e.target,
                type: e.type,
                currentTarget: tar,
                preventDefault: function() {
                    e.preventDefault()
                },
                stopPropagation: function() {
                    e.stopPropagation()
                }
            };
            func(eventObj);
        }
        k.addEvent(dom, type, proxyFunc)
    }
};

/***/ }),
/* 7 */,
/* 8 */,
/* 9 */,
/* 10 */,
/* 11 */,
/* 12 */,
/* 13 */,
/* 14 */,
/* 15 */,
/* 16 */,
/* 17 */,
/* 18 */,
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

//vm类, 

var extend = __webpack_require__(0);
var extendClass = __webpack_require__(2);
var eventBase = __webpack_require__(1);
var tplObj = __webpack_require__(3);
var Log = __webpack_require__(4);
var EVENT = __webpack_require__(6)
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
function getRandomStr(str) {
    return str+'_'+String((new Date()).getTime()*Math.random()).substr(0,13);
}
function get (dom, selector) {
    return dom.querySelector(selector);
}
var _childReg = /\{\{([^\{\}]*)\}\}/g; //匹配子组件在父组件模板的占位符。
var _childRootDomReg =/^<([a-z/][-a-z0-9_:.]*)[^>/]*>/; //子组件模板字符串首个tag的开始标签
var _idReg = /id=[^\s>]*/;
function baseVM(opt) {
	this.element = opt.element;
	this.selfParam = opt.selfParam || {};
	/**
     * 子组件
     * childComponents = {name1: CompObject1, name2: CompObject2}
     * */
	this.childComponents = opt.childComponents || null;
	this.store = opt.store || null;//数据流
	this.stateBus = opt.stateBus || null;
	this.tpl = opt.tpl || null;//视图模板
	this.data = opt.data || null;//跟视图相关的数据
    this._parentComp = null;//父组件
	this._eventArr = [];//内部使用
    this._cackeHtml = "";// 缓存拼接的html字符串
    this._cId = getRandomStr('comp');//实例的唯一识别
    this._hasChild = false;//是否有子组件
    this._isRoot = true;//是否为根组件
    this._id = null;//获得子组件容器id
	isDev = opt.isDev || false;
	this._prepareFunc();
}
extend(baseVM.prototype, eventBase, {
    //初始操作
	_prepareFunc: function() {
        var k = this;
        if(k.childComponents) {
            k._hasChild = true;
            k._setParentForChild();
        }
        if(!k.element) {
            k.element =document.createElement('div');
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
    /**
     * 给子组件设置父组件对象
     * */
    _setParentForChild: function () {
        var k = this;
        for(var key in k.childComponents) {
           k.childComponents[key]._parentComp = k;
           k.childComponents[key]._isRoot = false;
        }
    },
    /**
     * 将组件添加到页面中
     * */
    mounted: function() {
	    var k = this;
        //如果是根组件
        if(k._isRoot) {
            k.element.append(k._cackeHtml);
            k.init && k.init();
            k._addEventToDom();
            if(isDev){
                Log.log('--------add Dom to document-----------');
            }

            for(var key in k.childComponents) {
                k.childComponents[key].element = get(k.element, k.childComponents[key]._id);
                k.childComponents[key].store = k.store;
                k.childComponents[key].mounted();
            }
        } else {//如果不是是根组件
            k.init && k.init();
            k._addEventToDom();

            for(var key in k.childComponents) {
                k.childComponents[key].element =  get(k.element, k.childComponents[key]._id);
                k.childComponents[key].store = k.store;
                k.childComponents[key].mounted();
            }
        }

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
    _generateHTML: function() {
        var k = this;
        if(k.data){
            k._cackeHtml = k.tpl(k.data);
        }else {
            k._cackeHtml = k.tpl({});
        }

        if(isDev) {
            Log.log("genetate html");
           // Log.log("k._hasChild =" + k._hasChild )
           // Log.log('------------------------------------------');
        }
       if( k._hasChild ){
           k._joinChildHtml();
       }
    },
    _joinChildHtml: function() {
        var k = this;
        if(isDev){
            Log.log(_childReg);
        }
        k._cackeHtml = k._cackeHtml.replace(_childReg, function(reg, creg) {
            if(isDev){
              //  Log.log(creg);
            }
            var childComp = k.childComponents[creg];
            var chtml = childComp._cackeHtml;
            if(isDev){
               // Log.log(chtml)
            }
            var id = getRandomStr('child').replace('.',"");
            var startTagStr = chtml.match(_childRootDomReg)[0];
            startTagStr = startTagStr.replace(_idReg, '');
            startTagStr = startTagStr.replace(/>$/, ' id="'+id+'">');
            childComp._id="#"+id;
            chtml = chtml.replace(_childRootDomReg, startTagStr)
           return chtml;
        });
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
        for(var key in k.childComponents) {
            k.childComponents[key].removeEvents();
            k.childComponents[key].element = null;
            k.childComponents[key] = null;
        }
    },
	removeEvents: function() {
		var k = this;
        EVENT.removeAllEvent(k.element)
        k.eventArr = [];
        if(isDev){
            Log.log('remove Event');
        }
	},
    _initParse: function() {
        var k = this;
        k._parseTpl();
        if(!k._isEventParsed) {
            k._isEventParsed = true;
            k._parseEvent();
        }
        k._generateHTML();
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
                    console.log(k.element)
                    EVENT.addEvent(k.element, eArr[0], function(e) {
                        k.methods[eArr[1]].call(k, e);
                    })
                }(eArr));
            } else {
                (function(eArr){
                    EVENT.addProxyEvent(k.element, eArr[0], eArr[1], function(e) {
                        k.methods[eArr[2]].call(k, e);
                    })
                }(eArr));
            }
        }
        if(isDev){
            Log.log('add Event');
        }
    }
});

baseVM.extend = extendClass;

module.exports =  function(opt){
    var NewClass = baseVM.extend({
        init: opt.init,
        methods: opt.methods,
        events: opt.events
    });
    return new NewClass({
        element: opt.element,
        selfParam: opt.selfParam,
        childComponents: opt.childComponents,
        stateBus: opt.stateBus,
        tpl: opt.template,
        data: opt.data,
        store: opt.store,
        isDev: opt.isDev
    });
}

/***/ }),
/* 20 */
/***/ (function(module, exports) {

  //touch事件相关
	var isPointer = navigator.msPointerEnabled;
	var start = "ontouchstart" in window ? "touchstart" : (isPointer ? "MSPointerDown" : "mousedown");
	var move = "ontouchmove" in window ? "touchmove" : (isPointer ? "MSPointerMove" : "mousemove");
	var end = "ontouchend" in window ? "touchend" : (isPointer ? "MSPointerUp" : "mouseup");
	var cancel = "ontouchcancel" in window ? "touchcancel" : "MSPointerCancel";
	if(window.PointerEvent) {
		start = "pointerdown";
		move = "pointermove";
		end = "pointerup";
		cancel = "pointercancel";
	} else if (window.MSPointerEvent) {
		start = "MSPointerDown";
		move = "MSPointerMove";
		end = "MSPointerUp";
	} 
	function getPoint (e) {
		if(e.originalEvent || e, "touchstart" == start) {
			if(!e.touches[0]) {
				return ;
			}
			e.x = e.touches[0].clientX;
			e.y = e.touches[0].clientY;
		} else {
			e.x = e.clientX;
			e.y = e.clientY;
		}
		return e;
	}
	module.exports =  {
		touchStart: start,
		touchMove : move,
		touchEnd : end,
		touchCancel : cancel,
		getPoint : getPoint
	};


/***/ }),
/* 21 */,
/* 22 */,
/* 23 */,
/* 24 */,
/* 25 */,
/* 26 */,
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Created by xinjundong on 2017/12/4.
 */
var BaseComp = __webpack_require__(19)
var touchEvent = __webpack_require__(20)
var start = touchEvent.touchStart;
var move = touchEvent.touchMove;
var cancel = touchEvent.touchCancel;
var end = touchEvent.touchEnd;
function get(selector) {
    return document.querySelector(selector)
}
function getInitPosition (c, f) {
    //console.log('--------------'+c+'---------------');
    var a = 0, d = /([0-9-\.]+)+(?![3d]\()/gi, e = c.toString().match(d);
    if (!e) {
        return a;
    }
    if (e.length) {
        var b = f == "x" ? 0 : f == "y" ? 1 : 2;
        a = parseFloat(e[b]);
    }
    return a;
}
function getStyleValue (e, name) {
    return Number(window.getComputedStyle(e, "")[name].replace("px", ""))
}

function setX (el, len, time) {
    el.style.webkitTransitionDuration = time + "ms";
    el.style.msTransitionDuration = time + "ms";
    el.style.transitionDuration = time + "ms";
    el.style.webkitTransform = "translate3d(" + len +"px,0,0)";
    el.style.msTransform = "translate3d(" + len +"px,0,0)";
    el.style.transform = "translate3d(" + len +"px,0,0)";
}
function setY (el, len, time) {
    el.style.webkitTransitionDuration = time + "ms";
    el.style.msTransitionDuration = time + "ms";
    el.style.transitionDuration = time + "ms";
    el.style.webkitTransform = "translate3d(0," + len +"px,0)";
    el.style.msTransform = "translate3d(0," + len +"px,0)";
    el.style.transform = "translate3d(0," + len +"px,0)";
}

var Slide = new BaseComp({
    element: get('#slide'),
    selfParam: {
        el: get('#slide'),
        _elParent: null,
        tagName: 'li',
        _chirdren: null,
        navis: null,
        swipe: 'X',
        nav: null,
        numNav: null,
        navType: 'normal',
        prevBtn : null,
        nextBtn: null,
        auto: true,
        isNoFullScreen: false,
        _flag: null,
        _currentIndex: 0,
        _chirdW: 0,
        _chirdH: 0,
        _elWidth: 0,
        _elHeight:0,
        _interval: 400,
        _pageX: 0,
        _pageY: 0,
        _fangxiang: '',
        _left: 0,
        _top: 0,
        _pcMoveFlag: true,
        _isInertia: false,
        _inertiaLength: 300,
        _count: 0
    },
    init: function () {
        var k = this;

        if(k.selfParam.isNoFullScreen){
            k.methods.resizeLayoutNoScreen.call(k);
        }else{
            k.methods.resizeLayout.call(k);
        }
        if(k.selfParam.auto) {
            k.methods.automove.call(k)
        }
    },
    events: {
        [start]: 'touchstart',
        [move]: 'touchmove',
        [end]: 'touchend',
        [cancel]: 'touchcancel'
    },
    methods: {
        initDom: function () {
            var k = this;
            k.selfParam._elParent = k.selfParam.el.parentNode;
            k.selfParam._chirdren = k.selfParam.el.getElementsByTagName(k.selfParam.tagName);
            k.selfParam._chirdren = Array.prototype.slice.call(k.selfParam._chirdren, 0);
            k.selfParam._count = k.selfParam._chirdren.length;
        },
        resizeLayout: function () {
            var k = this;
            k.methods.initDom.call(k)
            if(k.selfParam.swipe === 'X') {
                k.selfParam._chirdW = getStyleValue(k.selfParam._elParent, 'width');
                for (var i = 0; i < k.selfParam._count; i++) {
                    k.selfParam._chirdren[i].style.width = k.selfParam._chirdW + "px";
                    k.selfParam._elWidth += k.selfParam._chirdW;
                }
                k.selfParam.el.style.width = k.selfParam._elWidth + "px";
            } else if(k.swipe === 'Y') {
                k.chirdH = getStyleValue(k.selfParam._elParent, 'height');
                for (var i = 0; i < k.selfParam._count; i++) {
                    k.selfParam._chirdren[i].style.height = k.selfParam._chirdH + "px";
                    k.selfParam._elHeight += k.selfParam._chirdH;
                }
                k.selfParam.el.style.height = k.selfParam._elHeight + "px";
            }
            if(k.selfParam.nav) {
                if(k.navType === 'normal') {
                    k.createNav();
                } else if(k.navType === 'num') {
                    k.createNumNav();
                }
            }
        },
        resizeLayoutNoScreen: function () {
            var k = this;
            k.methods.initDom.call(k)
            if(k.selfParam.swipe === 'X') {
                k.selfParam._elWidth = 0;
                k.selfParam._chirdren.forEach(function(ele, idx) {
                    var extW = getStyleValue(ele, 'padding-left') + getStyleValue(ele, 'padding-right') + getStyleValue(ele, 'margin-left') +getStyleValue(ele, 'margin-right');
                    k.selfParam._elWidth += (getStyleValue(ele, 'width') + extW);
                });
                k.el.style.width = k.elWidth + "px";
            } else if(k.selfParam.swipe === 'Y') {
                k.selfParam._elHeight= 0;
                k.selfParam._chirdren.forEach(function(ele, idx) {
                    k.selfParam._elHeight += getStyleValue(ele, 'height');
                });
                k.selfParam.el.style.height = k.selfParam._elHeight + "px";
            }
        },
        createNumNav: function () {
            var k = this;
            k.selfParam.numNav = k.selfParam.nav.querySelector('.cur');
            k.selfParam.nav.querySelector('.total').innerHTML = k.selfParam._count;
            k.selfParam.numNav.innerHTML = 1;
        },
        createNav: function () {
            var k = this;
            var span = null;
            k.selfParam.nav.innerHTML = '';
            for(var i = 0; i < k.selfParam._count; i++) {
                span = document.createElement('span');
                if(i == 0) {
                    span.className = "box-size on";
                    k.selfParam.nav.appendChild(span);
                } else {
                    span.className = "box-size";
                    k.selfParam.nav.appendChild(span);
                }
            }
            k.selfParam.navis = k.selfParam.nav.getElementsByTagName('span');
            k.selfParam.navis = Array.prototype.slice.call(k.selfParam.navis, 0);
        },
        automove: function() {//自动滑动到下一个item
            var k = this;
            k.selfParam._flag =  setInterval(function() {
                k.methods.next.call(k);
            }, 4e3);
        },
        clear: function() {
            var k = this;
            clearInterval(k.selfParam._flag);
            k.selfParam._flag = null;
        },
        touchstart: function(e) {
            var k = this;
            var t = touchEvent.getPoint(e);
            k.methods.clear.call(k);
            k.selfParam.move = 0;
            k.selfParam._pageX = t.x;
            k.selfParam._pageY = t.y;
            k.selfParam._fangxiang = '';
            k.selfParam._pcMoveFlag = false;
            if (window.PointerEvent || window.MSPointerEvent) {
                var sleft = k.selfParam.el.style.msTransform || k.selfParam.el.style.transform;
                k.selfParam._left = getInitPosition(sleft, "x");
                k.selfParam._top = getInitPosition(sleft, "y");
            } else {
                k.selfParam._left = getInitPosition(k.selfParam.el.style.webkitTransform, "x");
                k.selfParam._top = getInitPosition(k.selfParam.el.style.webkitTransform, "y");
            }
        },
        touchmove: function(e) {
            var k = this;
            if(k.selfParam._pcMoveFlag) {
                return;
            }
            var t = touchEvent.getPoint(e);
            var px = t.x;
            var py = t.y;
            var lenX = px - k.selfParam._pageX;
            var lenY = py - k.selfParam._pageY;
            if(k.selfParam.swipe === 'X') {
                if(Math.abs(lenY) > Math.abs(lenX)) {
                    return;
                }
                e.preventDefault();
                k.selfParam.move = lenX;
                //k.selfParam._isInertia = false;
                //if(Math.abs(lenX) <= 80) {//小于80，就会有惯性滑动
                //k.selfParam._isInertia = true;
                //}
                if(lenX > 5 ) {
                    k.selfParam._fangxiang = "left";
                } else if (lenX < -5) {
                    k.selfParam._fangxiang = 'right';
                }
               // console.log(k.selfParam._left+lenX, k.selfParam._left, lenX);
                setX(k.selfParam.el, k.selfParam._left+lenX, 0);
            } else if(k.swipe === 'Y') {
                if(Math.abs(lenY) < Math.abs(lenX)) {
                    return;
                }
                e.preventDefault();
                k.selfParam.move = lenY;
                k.selfParam._isInertia = false;
                // if(Math.abs(lenY) >= 30) {
                k.selfParam._isInertia = true;
                //}
                if(lenY > 5 ) {//top
                    k.selfParam._fangxiang = "top";
                } else if (lenY < -5) {//bottom
                    k.selfParam._fangxiang = 'bottom';
                }
                setY(k.selfParam.el, k.selfParam._top+lenY, 0);
            }
        },
        touchend: function(e) {
            var k = this;
            k.selfParam._pcMoveFlag = true;
            if(k.selfParam.isNoFullScreen){
                k.methods.setNewPositionNoScreen.call(k);
            }else{
                k.methods.setNewPosition.call(k);
            }
        },
        touchcancel: function(e) {
            var k = this;
            k.selfParam._pcMoveFlag = true;
            if(k.selfParam.isNoFullScreen){
                k.methods.setNewPositionNoScreen.call(k);
            }else{
                k.methods.setNewPosition.call(k);
            }
        },
        setNewPosition: function () {
            var k = this;

            if(k.selfParam.swipe === 'X') {
                //console.log(k.selfParam._fangxiang, k.selfParam._currentIndex);
                if(k.selfParam._fangxiang === 'left') {
                    if(k.selfParam._currentIndex === 0) {
                        setX(k.selfParam.el, 0, k.selfParam._interval);
                    } else {
                        k.methods.prev.call(k);
                    }
                } else if(k.selfParam._fangxiang === "right") {
                    if(k.selfParam._currentIndex === k.selfParam._count -1) {
                        setX(k.selfParam.el, -(k.selfParam._chirdW*(k.selfParam._count-1)), k.selfParam._interval);
                    } else {
                        k.methods.next.call(k);
                    }
                } else {
                    setX(k.selfParam.el, k.selfParam._left, 0);
                }
            } else if(k.swipe === 'Y') {
                if(k.selfParam._fangxiang === 'top') {
                    if(k.selfParam._currentIndex === 0) {
                        setY(k.selfParam.el, 0, k.selfParam._interval);
                    } else {
                        k.methods.prev.call(k);
                    }
                } else if(k.selfParam._fangxiang === "bottom") {
                    if(k.selfParam._currentIndex === k.selfParam._count -1) {
                        setY(k.selfParam.el, -(k.selfParam._chirdH*(k.selfParam._count-1)), k.selfParam._interval);
                    } else {
                        k.methods.next.call(k);
                    }
                } else {
                    setY(k.selfParam.el, k.selfParam._top, 0);
                }
            }
            k.methods.automove.call(k);
        },
        setNewPositionNoScreen: function (e) { //isNoFullScreen

            var k = this, smallest;
            if (window.PointerEvent || window.MSPointerEvent) {
                var sleft = k.selfParam.el.style.msTransform || k.selfParam.el.style.transform;
                k.left = getInitPosition(sleft, "x");
                k.top = getInitPosition(sleft, "y");
            } else {
                k.left = getInitPosition(k.selfParam.el.style.webkitTransform, "x");
                k.top = getInitPosition(k.selfParam.el.style.webkitTransform, "y");
            }
            if(k.selfParam.swipe === 'X') {
                if(k.selfParam.fangxiang === 'left') {

                    if( k.selfParam._left >=0) {
                        setX(k.selfParam.el, 0, k.selfParam._interval);
                    } else {
                        if(k.selfParam._isInertia) {
                            k.selfParam._left +=k.selfParam._inertiaLength;
                            if(k.selfParam._left >=0) {
                                setX(k.selfParam.el, 0, k.selfParam._interval);
                            } else {
                                setX(k.selfParam.el, k.selfParam._left, k.selfParam._interval);
                            }
                        }

                    }
                } else if(k.selfParam._fangxiang === "right") {
                    smallest   = -(k.selfParam._elWidth - window.innerWidth);
                    if( k.selfParam._left <= smallest) {
                        setX(k.selfParam.el, smallest, k.selfParam._interval);
                    } else {
                        if(k.selfParam._isInertia) {
                            k.selfParam._left -= k.selfParam._inertiaLength;
                            if (k.selfParam._left <= smallest) {
                                setX(k.selfParam.el, smallest, k.selfParam._interval);
                            } else {
                                setX(k.selfParam.el, k.selfParam._left, k.selfParam._interval);
                            }
                        }
                    }
                } else {
                    setX(k.selfParam.el, k.selfParam._left, 0);
                }
            } else if(k.selfParam.swipe === 'Y') {
                if(k.selfParam._fangxiang === 'top') {

                    if( k.selfParam._top >=0) {
                        setY(k.selfParam.el, 0, k.selfParam._interval);
                    }
                } else if(k.selfParam._fangxiang === "bottom") {
                    if( k.selfParam._left<= -(k.selfParam._elHeight-window.innerHeight)) {
                        setY(k.selfParam.el, -(k.selfParam._elHeight-window.innerHeight), k.selfParam._interval);
                    }

                } else {
                    setY(k.selfParam.el, k.selfParam._top, 0);
                }
            }
        },
        next: function() {
            this.methods.go.call(this, this.selfParam._currentIndex + 1);
        },
        prev: function() {
            this.methods.go.call(this, this.selfParam._currentIndex - 1);
        },
        go: function(idx) {
            var len = 0;//肯定是负值， 最大值为 0，最小值为 -((this.count - 1) * this.chirdW)
            if (idx === this.selfParam._currentIndex) {
                return;
            }
            if (idx >= this.selfParam._count) {
                idx = 0;
            }
            if (idx < 0) {
                idx = this.selfParam._count - 1;
            }
            this.selfParam._currentIndex = idx;
            if(this.selfParam.swipe === 'X') {
                len = -(idx * this.selfParam._chirdW);
                setX(this.selfParam.el, len, this.selfParam._interval);
            } else if(this.selfParam.swipe === 'Y') {
                len = -(idx * this.selfParam._chirdH);
                setY(this.selfParam.el, len, this.selfParam._interval);
            }
            if(this.selfParam.nav) {
                if( this.selfParam.navType === 'normal') {
                    this.methods.changeNavi.call(k);  //2017.3.6 xly
                } else {
                    if(this.selfParam.numNav) {
                        this.selfParam.numNav.innerHTML = (this.selfParam._currentIndex+1);
                    }
                }

            }
        },
        changeNavi: function () {
            var k = this;
            k.selfParam.navis.forEach(function(e) {
                e.className = 'box-size';
            });
            k.selfParam.navis[k.selfParam._currentIndex].className = 'box-size on';
        },
    }
})

/***/ })
/******/ ]);