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
/******/ 	return __webpack_require__(__webpack_require__.s = 32);
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

/***/ 1:
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

/***/ 18:
/***/ (function(module, exports, __webpack_require__) {

//vm类, 

var extend = __webpack_require__(0);
var extendClass = __webpack_require__(2);
var eventBase = __webpack_require__(1);
var tplObj = __webpack_require__(4);
var Log = __webpack_require__(5);
var EVENT = __webpack_require__(6)
/**
 不依赖zepto.js 或 jquery.js时，使用此基类

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
function bind (fn, ctx) {
    return function (a) {
        var len = arguments.length
        return len
            ? len > 1
                ? fn.apply(ctx, arguments)
                : fn.call(ctx, a)
            : fn.call(ctx)
    }
}
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
        k._bindProxy();
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
     * 代理 selfParam 和 methods
     * */
    _bindProxy: function() {
        var k = this;
        if(k.selfParam) {
            if(Object.defineProperty && Object.keys) {
                k._bindData();
            } else {
                for (var key in k.selfParam) {
                    k[key] = k.selfParam[key];
                }
            }
        }
        if(k.methods) {
            for(var method in k.methods) {
                k[method] = bind(k.methods[method], k);
            }
        }
    },
    _bindData: function () {
        var k = this;
        Object.keys(k.selfParam).forEach(function (key) {
            Object.defineProperty(k, key, {
                configurable: true,
                enumerable: true,
                get: function proxyFunc () {
                    return k.selfParam[key]
                },
                set: function proxyFunc (val) {
                    k.selfParam[key] = val;
                }
            })
        })
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

/***/ 19:
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

/***/ 2:
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

/***/ 32:
/***/ (function(module, exports, __webpack_require__) {

/**
 * Created by xinjundong on 2017/12/4.
 */
var BaseComp = __webpack_require__(18)
var touchEvent = __webpack_require__(19)
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

        if(k.isNoFullScreen){
            k.resizeLayoutNoScreen();
        }else{
            k.resizeLayout();
        }
        if(k.auto) {
            k.automove()
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
            k._elParent = k.el.parentNode;
            k._chirdren = k.el.getElementsByTagName(k.tagName);
            k._chirdren = Array.prototype.slice.call(k._chirdren, 0);
            k._count = k._chirdren.length;
        },
        resizeLayout: function () {
            var k = this;
            k.initDom(k)
            if(k.swipe === 'X') {
                k._chirdW = getStyleValue(k._elParent, 'width');
                for (var i = 0; i < k._count; i++) {
                    k._chirdren[i].style.width = k._chirdW + "px";
                    k._elWidth += k._chirdW;
                }
                k.el.style.width = k._elWidth + "px";
            } else if(k.swipe === 'Y') {
                k.chirdH = getStyleValue(k._elParent, 'height');
                for (var i = 0; i < k._count; i++) {
                    k._chirdren[i].style.height = k._chirdH + "px";
                    k._elHeight += k._chirdH;
                }
                k.el.style.height = k._elHeight + "px";
            }
            if(k.nav) {
                if(k.navType === 'normal') {
                    k.createNav();
                } else if(k.navType === 'num') {
                    k.createNumNav();
                }
            }
        },
        resizeLayoutNoScreen: function () {
            var k = this;
            k.initDom()
            if(k.swipe === 'X') {
                k._elWidth = 0;
                k._chirdren.forEach(function(ele, idx) {
                    var extW = getStyleValue(ele, 'padding-left') + getStyleValue(ele, 'padding-right') + getStyleValue(ele, 'margin-left') +getStyleValue(ele, 'margin-right');
                    k._elWidth += (getStyleValue(ele, 'width') + extW);
                });
                k.el.style.width = k.elWidth + "px";
            } else if(k.swipe === 'Y') {
                k._elHeight= 0;
                k._chirdren.forEach(function(ele, idx) {
                    k._elHeight += getStyleValue(ele, 'height');
                });
                k.el.style.height = k._elHeight + "px";
            }
        },
        createNumNav: function () {
            var k = this;
            k.numNav = k.nav.querySelector('.cur');
            k.nav.querySelector('.total').innerHTML = k._count;
            k.numNav.innerHTML = 1;
        },
        createNav: function () {
            var k = this;
            var span = null;
            k.nav.innerHTML = '';
            for(var i = 0; i < k._count; i++) {
                span = document.createElement('span');
                if(i == 0) {
                    span.className = "box-size on";
                    k.nav.appendChild(span);
                } else {
                    span.className = "box-size";
                    k.nav.appendChild(span);
                }
            }
            k.navis = k.nav.getElementsByTagName('span');
            k.navis = Array.prototype.slice.call(k.navis, 0);
        },
        automove: function() {//自动滑动到下一个item
            var k = this;
            k._flag =  setInterval(function() {
                k.next();
            }, 4e3);
        },
        clear: function() {
            var k = this;
            clearInterval(k._flag);
            k._flag = null;
        },
        touchstart: function(e) {
            var k = this;
            var t = touchEvent.getPoint(e);
            k.clear();
            k.move = 0;
            k._pageX = t.x;
            k._pageY = t.y;
            k._fangxiang = '';
            k._pcMoveFlag = false;
            if (window.PointerEvent || window.MSPointerEvent) {
                var sleft = k.el.style.msTransform || k.el.style.transform;
                k._left = getInitPosition(sleft, "x");
                k._top = getInitPosition(sleft, "y");
            } else {
                k._left = getInitPosition(k.el.style.webkitTransform, "x");
                k._top = getInitPosition(k.el.style.webkitTransform, "y");
            }
        },
        touchmove: function(e) {
            var k = this;
            if(k._pcMoveFlag) {
                return;
            }
            var t = touchEvent.getPoint(e);
            var px = t.x;
            var py = t.y;
            var lenX = px - k._pageX;
            var lenY = py - k._pageY;
            if(k.swipe === 'X') {
                if(Math.abs(lenY) > Math.abs(lenX)) {
                    return;
                }
                e.preventDefault();
                k.move = lenX;
                //k._isInertia = false;
                //if(Math.abs(lenX) <= 80) {//小于80，就会有惯性滑动
                //k._isInertia = true;
                //}
                if(lenX > 5 ) {
                    k._fangxiang = "left";
                } else if (lenX < -5) {
                    k._fangxiang = 'right';
                }
               // console.log(k._left+lenX, k._left, lenX);
                setX(k.el, k._left+lenX, 0);
            } else if(k.swipe === 'Y') {
                if(Math.abs(lenY) < Math.abs(lenX)) {
                    return;
                }
                e.preventDefault();
                k.move = lenY;
                k._isInertia = false;
                // if(Math.abs(lenY) >= 30) {
                k._isInertia = true;
                //}
                if(lenY > 5 ) {//top
                    k._fangxiang = "top";
                } else if (lenY < -5) {//bottom
                    k._fangxiang = 'bottom';
                }
                setY(k.el, k._top+lenY, 0);
            }
        },
        touchend: function(e) {
            var k = this;
            k._pcMoveFlag = true;
            if(k.isNoFullScreen){
                k.setNewPositionNoScreen();
            }else{
                k.setNewPosition();
            }
        },
        touchcancel: function(e) {
            var k = this;
            k._pcMoveFlag = true;
            if(k.isNoFullScreen){
                k.setNewPositionNoScreen();
            }else{
                k.setNewPosition();
            }
        },
        setNewPosition: function () {
            var k = this;

            if(k.swipe === 'X') {
                //console.log(k._fangxiang, k._currentIndex);
                if(k._fangxiang === 'left') {
                    if(k._currentIndex === 0) {
                        setX(k.el, 0, k._interval);
                    } else {
                        k.prev();
                    }
                } else if(k._fangxiang === "right") {
                    if(k._currentIndex === k._count -1) {
                        setX(k.el, -(k._chirdW*(k._count-1)), k._interval);
                    } else {
                        k.next();
                    }
                } else {
                    setX(k.el, k._left, 0);
                }
            } else if(k.swipe === 'Y') {
                if(k._fangxiang === 'top') {
                    if(k._currentIndex === 0) {
                        setY(k.el, 0, k._interval);
                    } else {
                        k.prev();
                    }
                } else if(k._fangxiang === "bottom") {
                    if(k._currentIndex === k._count -1) {
                        setY(k.el, -(k._chirdH*(k._count-1)), k._interval);
                    } else {
                        k.next();
                    }
                } else {
                    setY(k.el, k._top, 0);
                }
            }
            k.automove();
        },
        setNewPositionNoScreen: function (e) { //isNoFullScreen

            var k = this, smallest;
            if (window.PointerEvent || window.MSPointerEvent) {
                var sleft = k.el.style.msTransform || k.el.style.transform;
                k.left = getInitPosition(sleft, "x");
                k.top = getInitPosition(sleft, "y");
            } else {
                k.left = getInitPosition(k.el.style.webkitTransform, "x");
                k.top = getInitPosition(k.el.style.webkitTransform, "y");
            }
            if(k.swipe === 'X') {
                if(k.fangxiang === 'left') {

                    if( k._left >=0) {
                        setX(k.el, 0, k._interval);
                    } else {
                        if(k._isInertia) {
                            k._left +=k._inertiaLength;
                            if(k._left >=0) {
                                setX(k.el, 0, k._interval);
                            } else {
                                setX(k.el, k._left, k._interval);
                            }
                        }

                    }
                } else if(k._fangxiang === "right") {
                    smallest   = -(k._elWidth - window.innerWidth);
                    if( k._left <= smallest) {
                        setX(k.el, smallest, k._interval);
                    } else {
                        if(k._isInertia) {
                            k._left -= k._inertiaLength;
                            if (k._left <= smallest) {
                                setX(k.el, smallest, k._interval);
                            } else {
                                setX(k.el, k._left, k._interval);
                            }
                        }
                    }
                } else {
                    setX(k.el, k._left, 0);
                }
            } else if(k.swipe === 'Y') {
                if(k._fangxiang === 'top') {

                    if( k._top >=0) {
                        setY(k.el, 0, k._interval);
                    }
                } else if(k._fangxiang === "bottom") {
                    if( k._left<= -(k._elHeight-window.innerHeight)) {
                        setY(k.el, -(k._elHeight-window.innerHeight), k._interval);
                    }

                } else {
                    setY(k.el, k._top, 0);
                }
            }
        },
        next: function() {
            this.go(this._currentIndex + 1);
        },
        prev: function() {
            this.go(this._currentIndex - 1);
        },
        go: function(idx) {
            var len = 0;//肯定是负值， 最大值为 0，最小值为 -((this.count - 1) * this.chirdW)
            if (idx === this._currentIndex) {
                return;
            }
            if (idx >= this._count) {
                idx = 0;
            }
            if (idx < 0) {
                idx = this._count - 1;
            }
            this._currentIndex = idx;
            if(this.swipe === 'X') {
                len = -(idx * this._chirdW);
                setX(this.el, len, this._interval);
            } else if(this.swipe === 'Y') {
                len = -(idx * this._chirdH);
                setY(this.el, len, this._interval);
            }
            if(this.nav) {
                if( this.navType === 'normal') {
                    this.changeNavi();  //2017.3.6 xly
                } else {
                    if(this.numNav) {
                        this.numNav.innerHTML = (this._currentIndex+1);
                    }
                }

            }
        },
        changeNavi: function () {
            var k = this;
            k.navis.forEach(function(e) {
                e.className = 'box-size';
            });
            k.navis[k._currentIndex].className = 'box-size on';
        },
    }
})

/***/ }),

/***/ 4:
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
        var temp;
        var html;
        var l = startArr.length;
        if(startArr.length === 1) {
        	html = 'var str= \''+str+'\'; return str;';
        	return new Function('data', html);
		}
		html = ' var str=""; with(data) {';
		for(var i = 0 ; i < l; i++) {
			temp = startArr[i];
			endArr = temp.split(this.endTag);
			if(endArr.length === 1) {//纯字符串
				html+='str+=\''+endArr[0]+'\';';
			} else {//有变量或语句
				variable = endArr[0];
				varArr = variable.match(reg);
				if(varArr && varArr.length === 2) {//是变量
					
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
		return new Function('data', html);
	}
};
module.exports = template;

/***/ }),

/***/ 5:
/***/ (function(module, exports) {


/**
 *
* 日志类
*/
console = window.console ? window.console : function(e){alert(e)};

module.exports = {
	log: console.log,
	error: console.error
};

/***/ }),

/***/ 6:
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

function getCurrentSelector (tar, type) {
  var currentClassName
  switch (type) {
    case 1:
      currentClassName = tar.className
      break
    case 2:
      currentClassName = tar.id
      break
    case 3:
      currentClassName = tar.tagName.toLowerCase()
  }
  return currentClassName
}
function getCurrentTarget (tar, className, classType) {
  var currentClassName = getCurrentSelector(tar, classType)
  className = className.replace(/(^\s*)|(\s*$)/g, '')

  if (classType === 1) {
    if (currentClassName.indeOf(className) > -1) {
      return tar
    } else {
      tar = fromClassName(tar, currentClassName, className, classType)
    }
  } else {
    if (currentClassName === className) {
      return tar
    } else {
      tar = fromTagOrId(tar, currentClassName, className, classType)
    }
  }
  return tar
}
function fromTagOrId (tar, currentClassName, className, classType) {
  while (currentClassName !== className) {
    if (tar && tar.getAttribute('flag')) {
      return null
    }
    tar = tar.parentNode
    currentClassName = getCurrentSelector(tar, classType)
  }
  return tar
}
function fromClassName (tar, currentClassName, className, classType) {
  while (currentClassName.indexOf(className) === -1) {
    if (tar && tar.getAttribute('flag')) {
      return null
    }
    tar = tar.parentNode
    currentClassName = getCurrentSelector(tar, classType)
  }
  return tar
}
module.exports = {
  addEvent: function (dom, type, func) {
    var callbackKey = getRandomStr(type)
    window.__EventCallback__[callbackKey] = func
    if (!window.__EventTypeManager__[type]) {
      window.__EventTypeManager__[type] = []
    }
    window.__EventTypeManager__[type].push(window.__EventCallback__[callbackKey])
    dom.addEventListener(type, window.__EventCallback__[callbackKey])
  },
  removeEvent: function (dom, type, func) {
    if (func) {
      dom.removeEventListener(type, func)
      return
    }
    for (var eventType in window.__EventTypeManager__) {
      if (eventType === type) {
        var eventArr = window.__EventTypeManager__[eventType]
        for (var i = 0, len = eventArr.length; i < len; i++) {
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
      var eventArr = window.__EventTypeManager__[type]
      for (var i = 0, len = eventArr.length; i < len; i++) {
        var funci = eventArr[i]
        dom.removeEventListener(type, funci)
        funci = null
      }
      window.__EventTypeManager__[type] = null
      eventArr = null
    }
  },
  addProxyEvent: function (dom, type, selector, func) {
    var k = this
    var className
    dom.setAttribute('flag', 'parent')
    // 1: class, 2: id, 3: tag
    var selectorType = 3
    if (selector.indexOf('.') === 0) {
      selectorType = 1
      className = selector.replace('.', '')
    } else if (selector.indexOf('#') === 0) {
      selectorType = 2
      className = selector.replace('#', '')
    } else {
      className = selector
    }
    var proxyFunc = function (e) {
      var t = e.target
      var tar = getCurrentTarget(t, className, selectorType)
      if (!tar) {
        return
      }
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
      }
      func(eventObj)
    }
    k.addEvent(dom, type, proxyFunc)
  }
}


/***/ })

/******/ });