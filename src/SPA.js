/**
 * SPA 项目程序入口
 * 1. 注册路径
 * 2. 路径管理
 * 3. 显示首页
 * */
import Router from './route/hashRoute';

/**
 * {{param}}
 *  table : 路由表
 *  beforeRouter: function () 所用导航前都要执行的函数
 * */
export default  class SPA {
    constructor (opt) {
        this.routeTable = opt.table;
        this.beforeRouter = opt.beforeRouter;
        this.router = null;
        this.init();
    }
    init () {
        this.router = new Router(this.routeTable, this.beforeRouter);
        for(let key in this.routeTable) {
            this.register(key, this.routeTable[key]);
        }
        this.router.initEvent();
    }
    register (path, Comp) {
        let k = this;
        k.router.route(path, function (param) {
            // 异步组件
            if(typeof Comp === 'function') {
                Comp().then(function(module) {
                    k.routeTable[path]= module;
                    module.mounted();
                });
            } else {
                Comp.mounted(param);
            }

        });
    }
    /**
     * 用户自定义的beforeRouter函数里使用，
     * 来确定导航的方向
     * this.next(): 进行管道中的下一个钩子。如果全部钩子执行完了，
     * 则导航的状态就是 confirmed （确认的）。
     *  this.next(false): 中断当前的导航。如果浏览器的 URL 改变了
     * （可能是用户手动或者浏览器后退按钮），
     *  那么 URL 地址会重置到 from 路由对应的地址。
     * this.next('/') 跳转到一个不同的地址。
     * */
    next (path) {
        this.router.next(path);
    }
}