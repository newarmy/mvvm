//vm类, 



/**
 组件强依赖zepto.js 或 jquery.js

 opt说明：
	element: 容器Dom元素（jquery对象或zepto对象）
	selfParam:存放自定义属性的，对象实例自己的属性和自己的方法（钩子方法可以放在这里）
 	stateBus: 用于组件间通信的(StateBus对象)
    tpl: 视图模板
	data: 跟视图相关的数据
    store：数据流控制
    childComponents：子组件

 component 构建流程
1. 解析模板（可以用这个过程，也可以没有）
2. 定义行为（事件行为 或 定时器行为）
3. 解析事件
4. 将解析模板得到的内容插入到DOM容器中 （可以用这个过程，也可以没有）
5. 添加解析完事件到DOM上
6. 销毁组件 （销毁事件，销毁定时器，销毁dom）
<div>
    <p>$placeholder</p>
    <p>$placeholder</p>
</div>
可以添加子组件
*/

import tplObj from './util/tplFunc';
import Log from './util/log';
import {getRandomStr, bind} from './util/tool';
import {_childReg, _childRootDomReg, _idReg} from  './util/regex';
import EventBase from './util/eventBase';
import ieCheck from './util/ieCheck';
import extendClass from './util/extendClass';
let isDev = false;


export default class BaseVM extends EventBase {
    constructor (opt) {
        super();
        this.element = opt.element;
        this.selfParam = opt.selfParam || {};
        /***
         * 可以在这里自定义行为方法，
         * 子类重写
         * */
        this.methods = opt.methods || null;
        /**
         * 事件对应的回掉函数在methods
         * 子类重写，
         * {'click .tab': 'get'} 用来给element子元素注册事件(事件代理)
         * {'click': 'get'} 用来给element元素注册事件
         * */
        this.events = opt.events || null;
        /**
         * 子组件
         * childComponents = {name1: CompObject1, name2: CompObject2}
         * */
        this.childComponents = opt.childComponents || null;
        this.store = opt.store || null;//数据流
        this.stateBus = opt.stateBus || null;
        this.tpl = opt.tpl || null;//视图模板
        this.data = opt.data || null;//跟视图相关的数据
        this.isMounted = false; // 是否添加到页面中。
        this._parentComp = null;//父组件 （子组件可以通过属性_parentComp访问父组件的参数）
        this._eventArr = [];//内部使用
        this._cackeHtml = "";// 缓存拼接的html字符串
        this._cId = getRandomStr('comp');//实例的唯一识别
        this._hasChild = false;//是否有子组件
        this._isRoot = true;//是否为根组件
        this._id = null;//获得子组件容器id
        isDev = opt.isDev || false;
        this._prepareFunc();
    }
    //初始操作
    _prepareFunc () {
        let k = this;
        k._bindProxy();
        if(k.childComponents) {
            k._hasChild = true;
            k._setParentForChild();
        }
        if(!k.element) {
            k.element =$('<div></div>');
        }

        if(isDev){
            Log.log('init');
        }
        if(k.tpl) {
            k._initParse();
        } else {
            //初始化操作
            k.init();
            //解析事件
            k._parseEvent();
            //添加事件
            k._addEventToDom();
        }
    }
    /**
     * 代理 selfParam 和 methods
     * */
    _bindProxy () {
        let k = this;
        if(k.selfParam) {
            if(Object.defineProperty && Object.keys && !ieCheck.ie7() && !ieCheck.ie8() ) {
                k._bindData();
            } else {
                for (let key in k.selfParam) {
                    k[key] = k.selfParam[key];
                }
            }
        }
        if(k.methods) {
            for(let method in k.methods) {
                k[method] = bind(k.methods[method], k);
            }
           k.methods = null;
        }
    }
    _bindData () {
        let k = this;
        Object.keys(k.selfParam).forEach(function (key) {
            Object.defineProperty(k, key, {
                configurable: true,
                enumerable: true,
                get: function proxyFunc () {
                    return k.selfParam[key]
                },
                set: function proxyFunc (val) {
                    k.selfParam[key] = val;
                }
            })
        })
    }
    /**
     * 给子组件设置父组件对象
     * */
    _setParentForChild () {
        let k = this;
        for(let key in k.childComponents) {
            k.childComponents[key]._parentComp = k;
            k.childComponents[key]._isRoot = false;
        }
    }
    /**
     * 将组件添加到页面中
     * param：路由传来的参数 (如果有路由的)
     * */
    mounted (param) {
        let k = this;
        //如果是根组件
        if(k._isRoot) {
            k.element.append(k._cackeHtml);
            k.init && k.init(param);
            k._addEventToDom();
            if(isDev){
                Log.log('--------add Dom to document-----------');
            }

            for(let key in k.childComponents) {
                k.childComponents[key].element = k.element.find(k.childComponents[key]._id);
                k.childComponents[key].store = k.store;
                k.childComponents[key].mounted(param);
            }
        } else {//如果不是是根组件
            k.init && k.init();
            k._addEventToDom();

            for(let key in k.childComponents) {
                k.childComponents[key].element = k.element.find(k.childComponents[key]._id);
                k.childComponents[key].store = k.store;
                k.childComponents[key].mounted();
            }
        }
        k.isMounted = true;

    }
    /***
     * 组件的初始化操作
     * 子类重写
     * param：路由传来的参数
     * */
    init (param) {

    }

    /**
     * 最好通过setData来更新组件的data数据，从而更新组件dom
     * (适用于没有子组件的组件)
     * */
    setData (data) {
        let k = this;
        k.data = data;
        k._generateHTML();
        if(k._isRoot) {
            k.element.html(k._cackeHtml);
        } else {
            let cacheDom = $(k._cackeHtml);
            k.element.html(cacheDom.html());
        }

    }
    _generateHTML () {
        let k = this;
        if(k.data){
            k._cackeHtml = k.tpl(k.data);
        } else {
            k._cackeHtml = k.tpl({});
        }

        if(isDev) {
            Log.log("genetate html");
        }
        if( k._hasChild ){
            k._joinChildHtml();
        }
    }
    _joinChildHtml () {
        let k = this;
        if(isDev){
            Log.log(_childReg);
        }
        k._cackeHtml = k._cackeHtml.replace(_childReg, function(reg, creg) {
            if(isDev){
                //  Log.log(creg);
            }
            let childComp = k.childComponents[creg];
            let chtml = childComp._cackeHtml;
            if(isDev){
                // Log.log(chtml)
            }
            let id = getRandomStr('child').replace('.',"");
            let startTagStr = chtml.match(_childRootDomReg)[0];
            startTagStr = startTagStr.replace(_idReg, '');
            startTagStr = startTagStr.replace(/>$/, ' id="'+id+'">');
            childComp._id="#"+id;
            chtml = chtml.replace(_childRootDomReg, startTagStr)
            return chtml;
        });
    }

    /**
     * 销毁组件 子组件重写
     * */
    destroy () {
        var k = this;
        k.removeEvents();
        k.isMounted = false;
        //k.element = null;
        for(let key in k.childComponents) {
            k.childComponents[key].removeEvents();
            k.childComponents[key].element = null;
            //k.childComponents[key] = null;
        }
        k.element.html('');
    }
    removeEvents () {
        let k = this, arr;
        let len = k._eventArr.length;
        if(len === 0) {
            return;
        }
        for(let i = 0; i < len; i++) {
            arr = k._eventArr[i];
            k.element.off(arr[0]);
        }
        // k._eventArr = []; 不要清空
        if(isDev){
            Log.log('remove Event');
        }
    }
    _initParse () {
        let k = this;
        k._parseTpl();
        if(!k._isEventParsed) {
            k._isEventParsed = true;
            k._parseEvent();
        }
        k._generateHTML();
    }
    _parseTpl () {
        let k = this;
        k.tpl = tplObj.parse(k._filterSpecialLetter(k.tpl));
        if(isDev){
            Log.log('parse template');
        }
    }
    _filterSpecialLetter (tpl) {
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
    }
    //解析事件
    _parseEvent () {
        let k = this;
        let reg = /\s+/;
        let kongReg = /(^\s*)|(\s*$)/g;
        let eArr = [];
        let l;
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
    }
    //事件添加到dom
    _addEventToDom () {
        let k = this;
        for(let i = 0, len = k._eventArr.length; i < len; i++) {
            let eArr = k._eventArr[i];
            let l = eArr.length;
            if(l === 2) {
                (function(eArr){
                    k.element.on(eArr[0], function(e) {
                        k.methods[eArr[1]].call(k, e);
                    });
                }(eArr));
            } else {
                (function(eArr){
                    k.element.on(eArr[0], eArr[1], function(e) {
                        let $t = $(this);
                        k.methods[eArr[2]].call(k, e, $t);
                    });
                }(eArr));
            }
        }
        if(isDev){
            Log.log('add Event');
        }
    }
    static extend (protoObj, staticObj) {
       return extendClass.call(this, protoObj, staticObj);
    }
};
