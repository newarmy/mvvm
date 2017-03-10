//vm类, 

var extend = require('./util/extend');
var extendClass = require('./util/extendClass');
var eventBase = require('./eventBase');
var templateFunc = require('./util/templateFunc');
/**
	opt说明：
*/
function VM(opt) {
	this.element = opt.element;
	this.model = opt.model;
	this.tpl = opt.tpl;
	this.eventArr = [];//
	this.isEventParsed = false;//是否解析完dom事件
}

extend(VM.prototype, eventBase, {
	events: null,//{'click .tab': 'get'} 用来给dom元素注册事件(事件代理)
	el: '',//更新数据的dom容器， 如果el没有设置，element就是更新数据的容器， el 为 element的子元素
    noModelInit: function() {//没有用到MODEL组件的时候，要需要调用noModelInit来解析自定义事件，
    	this.parseEvent();
    },
	init: function() {//用到MODEL组件的时候，要需要调用init来初始化数据事件和自定义dom事件，
		var k = this;
		k.model.on('getData', k.render, k);
		k.model.on('error', k.error, k);
		if(!k.isEventParsed) {
			k.isEventParsed = true;
			k.parseEvent();
		}
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
		var html = templateFunc(k.tpl, data);
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
		var eArr = [];
		var l;
		if (!k.events) {
			return;
		}
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
	},
	//组件用来广播数据，子类重写
	broadCast: function() {
	},
	//组件用来接收数据，子类重写
	receive: function(args) {

	}
});

VM.extend = extendClass;

module.exports = VM;