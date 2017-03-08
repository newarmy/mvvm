//vm类, 
/**

*/
var extend = require('./util/extend');
var extendClass = require('./util/extendClass');
var eventBase = require('./eventBase');
var templateFunc = require('./util/templateFunc');
function VM(opt) {
	this.element = opt.element;
	this.model = opt.model;
	this.url = opt.url;
	this.tpl = opt.tpl;
	this.eventArr = [];//
	this.isEventParsed = false;
}

extend(VM.prototype, eventBase, {
	events: {'click .tab': 'get'},
	init: function(opt) {
		var k = this;
		k.model.on('getData', k.render, k);
		k.model.request(opt);
	},
	render: function(data) {
		var k = this;
		var html = templateFunc(k.tpl, data);
		k.element.html(html);
		if(!k.isEventParsed) {
			k.isEventParsed = true;
			k.parseEvent();
		}
	},
	parseEvent: function() {
		var k = this;
		var reg = /\s+/;
		var eArr = [];
		var l;
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
	}
});

VM.extend = extendClass;

module.exports = VM;