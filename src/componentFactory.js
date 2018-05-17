
import BaseVM from './newBaseComp';
export default function VMFactory(opt) {
    var NewClass = BaseVM.extend({
        // 组件的初始函数
        init: opt.init,
    });
    console.dir(NewClass);
    return new NewClass({
        // 事件的回调函数 和 一些常规函数 （会代理到组件实例中）
        methods: opt.methods,
        // 事件列表， 事件都绑定到element中
        events: opt.events,
        // 组件容器dom
        element: opt.element,
        // 自定义的属性，（会代理到组件实例中）
        selfParam: opt.selfParam,
        // 子组件列表
        childComponents: opt.childComponents,
        // 组件间通信用的
        stateBus: opt.stateBus,
        // 组件模板
        tpl: opt.template,
        // 跟模板相关的数据
        data: opt.data,
        // 数据流
        store: opt.store,
        // 调试用的标志位
        isDev: opt.isDev
    });
}