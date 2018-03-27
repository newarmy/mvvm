

一个简单MVVM框架。

1. 怎么使用框架来创建组件?
1.1  引入 var BaseComp = require('../../src/newBaseComp.js');
1.2  创建组件
   var selfComp = new BaseComp(opt);
   opt参数说明
          {
             /**
             *组件的初始函数
             */
             init: opt.init,
             /**
              事件的回调函数 和 一些自定义函数 （会代理到组件实例中）
              如
                 {
                    clickhandler： function (e) {}
                 }

              */
             methods: opt.methods,
             /**
              事件列表， 事件都绑定到element中, clickhandler定义在methods中
               如{
                 'click li', 'clickhandler'
               }
             */
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
          }
     说明：
        如果opt中有template参数，组件要调用mounted方法来把组件加到dom中。
