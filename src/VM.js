//vm基类,

var extend = require('./util/extend');
var extendClass = require('./util/extendClass');
var eventBase = require('./util/eventBase');
var tplObj = require('./util/tplFunc');
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