// 数据加载及数据处理
/**
	opt.url： 数据的地址 
*/
var extend = require('./util/extend');
var request = require('./util/request');
var extendClass = require('./util/extendClass');
var eventBase = require('./eventBase');
function ajax (opt) {
	this.opt = opt;
	this._successFunc = null;
	this._errorFunc = null;
    //接收数据的属性
    this.data = {};
    this._requestCount = 0;
    this._totalRequest = 0;
	this._mainName = null;//主要数据属性名称
	if(opt){
        this.request(this.opt);
	}
}
extend(ajax.prototype, eventBase, {
	 _ajax: function (opt) {
		var k = this;
		opt.timeout = 10000;
		k._successFunc = opt.success;
		k._errorFunc = opt.error;
		opt.success = function(json, stateText, jqXHR, that) {
			json = k.parse(json, that.name);
			k.data[that.name] = json;
			k._requestCount++;
			if(k._requestCount === k._totalRequest) {
				k._successFunc(k.data)
			}
		};
		//函数说明：传入jqXHR对象、描述状态的字符串”error”、错误信息
		opt.error = function (jqXHR, textStatus, errorThrown, that) {
			k.data = {};
			if(that.name === k._mainName) {
                k._errorFunc && k._errorFunc(textStatus);
			}
		};
		request(opt);
	},

	//请求接口
	request: function (opt) {
		var k = this;
		var isArray = $.isArray(opt);
		k._requestCount = 0;
		k.data ={};
		if(isArray) {
			k._totalRequest = opt.length;
			for(var i =0; i< k._totalRequest; i++) {
				(function(i) {
					if(i === 0) {
						k._mainName = opt[i].context.name;
					}
					k._ajax(opt[i]);
				}(i));
			}
		} else {
			k._totalRequest = 1;
			k._ajax(opt);
		}
		
	},
	//子类可重写，处理返回的数据并返回处理后的数据
	parse: function (json) {
		return json;
	}
});
ajax.extend = extendClass;
module.exports = ajax;