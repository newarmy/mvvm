// 数据加载及数据处理
/**
	opt.url： 数据的地址 
*/
import extend from'./util/extend';
import request from './util/request';
import extendClass from './util/extendClass';
import EventBase from './util/eventBase';


export default class ajaxTool extends EventBase {

	constructor () {
		super()
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

    _ajax (opt) {
        let k = this;
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
    }

    //请求接口
    request (opt) {
        let k = this;
        let isArray = $.isArray(opt);
        k._requestCount = 0;
        k.data ={};
        if(isArray) {
            k._totalRequest = opt.length;
            for(let i =0; i< k._totalRequest; i++) {
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
    parse (json) {
        return json;
    }
}
