//vm类, 

var extend = require('./util/extend');
var extendClass = require('./util/extendClass');
var eventBase = require('./eventBase');
var tplObj = require('./util/tplFunc');
var Log = require('./util/log');
/**
	opt说明：
	element: 容器Dom元素（jquery对象或zepto对象）
	selfParam:自定义属性，对象实例自己的属性
 	stateBus: 用于组件间通信的(StateBus对象)
    tpl: 模板
	data: 跟视图相关的数据
*/
var isDev = false;
function baseVM(opt) {
	this.element = opt.element;
	this.selfParam = opt.selfParam || {};
	this.hook = opt.hook || {};//钩子函数
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
        k.init();
        if(k.tpl) {
            k._initParse();
        } else {
            //解析事件
            k._parseEvent();
			k._addEventToDom();
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
    /**
    * 事件对应的回掉函数在methods
	 * 子类重写，
    * {'click .tab': 'get'} 用来给element子元素注册事件(事件代理)
    * {'click': 'get'} 用来给element元素注册事件
    * */
	events: null,

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
        k.element.html(html);
        setTimeout(function(){
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
    },
    _parseTpl: function() {
        var k = this;
        k.tpl = tplObj.parse(k._filterSpecialLetter(k.tpl));
        if(isDev){
            Log.log('parseTpl');
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