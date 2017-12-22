//vm类, 

var extend = require('./util/extend');
var extendClass = require('./util/extendClass');
var eventBase = require('./util/eventBase');
var tplObj = require('./util/tplFunc');
var Log = require('./util/log');
var EVENT = require('./event-system/event-system')
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