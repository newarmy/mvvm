//vm类, 

var extend = require('./util/extend');
var extendClass = require('./util/extendClass');
var eventBase = require('./eventBase');
var tplObj = require('./util/tplFunc');
/**
	opt说明：
	element: 容器Dom元素（jquery对象或zepto对象）
	selfParam:自定义属性，对象实例自己的属性
 	stateBus: 用于组件间通信的(StateBus对象)
*/
function baseVM(opt) {
	this.element = opt.element;
	this.selfParam = opt.selfParam || {};
	this.stateBus = opt.stateBus || null;
	this._eventArr = [];//内部使用
	this.cId = 'comp'+(String((new Date()).getTime()*Math.random()).substr(0,13));
	this.prepareFunc();
}

extend(baseVM.prototype, eventBase, {
	prepareFunc: function() {
		var k = this;
		k.noModelInit();
	}, //初始操作，子类可以重写, 调用noModelInit方法
	events: null,//{'click .tab': 'get'} 用来给dom元素注册事件(事件代理)
    noModelInit: function() {//没有用到MODEL组件的时候，要需要调用noModelInit来解析自定义事件，
    	this.parseEvent();
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
		for(var i = 0, len = k.eventArr.length; i < len; i++) {
			arr = k.eventArr[i];
			k.element.off(arr[0]);
		}
        k.eventArr = [];
	}
});

baseVM.extend = extendClass;

module.exports = baseVM;