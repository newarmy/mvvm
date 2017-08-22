//数据加载处理模块
/**
	opt.url： 数据的地址 
*/
var extend = require('./util/extend');
var request = require('./util/request');
var extendClass = require('./util/extendClass');
var eventBase = require('./eventBase');
function ModelBase () {
	//接收数据的属性
	this.data = {};
	//ajax请求参数对象。可以是一个请求参数对象，也可以是多个请求参数对象（多个值时为数组）
	this.requestParam =  null;
	this.requestCount = 0;
	this.totalRequest = 0;
	this.mainName = null;//主要数据属性名称
}
extend(ModelBase.prototype, eventBase, {
	 _ajax: function (opt) {
		var k = this;
		var successFunc = opt.success;
		var errorFunc = opt.error;
		opt.timeout = 10000;
		opt.success = function(json, stateText, jqXHR, that) {
			json = k.parse(json, that.name);
			k.data[that.name] = json;
			k.requestCount++;
			if(k.requestCount == k.totalRequest) {
				k.trigger('getData', k.data);
				if(successFunc) {
					successFunc(k.data);
				}
			}
			
			
		};
		//函数说明：传入jqXHR对象、描述状态的字符串”error”、错误信息
		opt.error = function (jqXHR, textStatus, errorThrown, that) {
			k.data = {};
			if(errorFunc) {
				errorFunc(jqXHR, textStatus, errorThrown);
			}
			if(that.name == k.mainName) {
				k.trigger('error', textStatus);
			}
			
		};
		request(opt);
	},
	//设置请求参数，子类重写覆盖， VM对象中调用修改请求参数
	setRequestParam: function(requestParam) {
		var k = this;
		k.requestParam = requestParam;
	},
	//请求接口
	request: function (opt) {
		var k = this;
		if(!opt){
			opt = k.requestParam;
		}
		var isArray = $.isArray(opt);
		k.requestCount = 0;
		k.data ={};
		if(isArray) {
			k.totalRequest = opt.length;
			for(var i =0; i< k.totalRequest; i++) {
				(function(i) {
					if(i == 0) {
						k.mainName = opt[i].context.name;
					}
					k._ajax(opt[i]);
				}(i));
			}
		} else {
			k.totalRequest = 1;
			k._ajax(opt);
		}
		
	},
	//子类可重写，处理返回的数据并返回处理后的数据
	parse: function (json) {
		return json;
	}
});

ModelBase.extend = extendClass;

module.exports = ModelBase;