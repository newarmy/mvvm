//数据处理
/**
	opt.url, 
*/
var extend = require('./util/extend');
var request = require('./util/request');
var extendClass = require('./util/extendClass');
var eventBase = require('./eventBase');
function ModelBase (opt) {
	//接收数据的属性
	this.data = null;
	this.url = opt.url || null;
}
extend(ModelBase.prototype, eventBase, {
	 _ajax: function (opt) {
		var k = this;
		k.on('getData', function (opt) {
			k.broadCast(opt);
		});
		opt.success = function(json) {
			json = k.parse(json);
			k.data = json;
			k.trigger('getData', k.data);
		};
		opt.error = function () {
			k.data = null;
		};
		request(opt);
	},
	//请求接口
	request: function (opt) {
		var k = this;
		opt.url = opt.url || k.url;
		k._ajax(opt);
	},
	//设置url
	url: function (url) {
		var k = this;
		k.url = url;
	},
	//子类可重写，处理返回的数据
	parse: function (json) {
		return json;
	},
	//广播数据
	broadCast: function(opt) {
		return opt;
	}
});
ModelBase.extend = extendClass;

module.exports = ModelBase;