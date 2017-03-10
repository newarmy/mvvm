//数据加载处理模块
/**
	opt.url： 数据的地址 
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
		k.on('getData', function (data) {
			k.broadCast(data);
		});
		var successFunc = opt.success;
		var errorFunc = opt.error;
		opt.success = function(json) {
			json = k.parse(json);
			k.data = json;
			k.trigger('getData', k.data);
			if(successFunc) {
				successFunc(json);
			}
		};
		//函数说明：传入jqXHR对象、描述状态的字符串”error”、错误信息
		opt.error = function (jqXHR, textStatus, errorThrown) {
			k.data = null;
			if(errorFunc) {
				errorFunc(jqXHR, textStatus, errorThrown);
			}
			k.trigger('error', null);
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
	//子类可重写，处理返回的数据并返回处理后的数据
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