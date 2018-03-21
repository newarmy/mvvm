/**
 * SPA 项目程序入口
 * 1. 注册路径
 * 2. 路径管理
 * 3. 显示首页
 * */
var Router = require('./route/hashRoute');
var extend = require('./util/extend');

/**
 * {{param}}
 *  table : 路由表
 *  beforeRouter: function () 所用导航前都要执行的函数
 * */
function SPA (opt) {
   this.routeTable = opt.table;
   this.beforeRouter = opt.beforeRouter;
}
extend(SPA.prototype, Router, {
    register: function (path, Comp) {
        var k = this;
        k.route(path, function (param) {
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
    },
    init: function () {
        for(var key in this.routeTable) {
            this.register(key, this.routeTable[key]);
        }
        this.initEvent();
    },
    /**
     * 监听hashchange事件，来导航页面。
     */
    refresh: function (path) {
        this.beforeUrl = this.currentUrl;
        this.currentUrl = location.hash.slice(1) || '/';
        if(this.beforeRouter){
            this.beforeRouter.call(this, this.currentUrl);
        } else {
            this.goToPage();
        }
    },
    /**
     * 用户自定义的beforeRouter函数里使用，
     * 来确定导航的方向
     * this.next(): 进行管道中的下一个钩子。如果全部钩子执行完了，则导航的状态就是 confirmed （确认的）。

     this.next(false): 中断当前的导航。如果浏览器的 URL 改变了（可能是用户手动或者浏览器后退按钮），
     那么 URL 地址会重置到 from 路由对应的地址。

     this.next('/') 跳转到一个不同的地址。
     * */
    next: function (path) {
        if(path === false) {
            this.goBack(-1);
        } else if(path === undefined) {
            this.goToPage();
        } else if(typeof path === 'string'){
            this.setRoute(path, true);
        }
    },
    /**
     * 回退路由
     * */
    goBack: function (num) {
        window.history.go(num);
    },
    /**
     * 根据路由，渲染组件到页面
     * */
    goToPage: function (path) {
        this._destroyComp();
        var url = path || this.currentUrl;
        var param = this.parseParam(url);
        this.routes[url](param);
    },
    /**
     * 解析路由中的参数
     * */
    parseParam: function (url) {
        var arr = url.split('?');
        if(arr.length === 1) {
            return {url: url};
        } else {
            var obj = {}
            var arr2 = arr[1].split('&');
            for(var i = 0, len = arr2.length; i < len; i++) {
                var arr3 = arr2[i].split('=');
                obj[arr3[0]] = arr3[1];
            }
            obj['url'] = url;
            return obj;
        }
    },
    /**
     * 手动设置路由
     * path: 设置的路由
     * isNoUser 是否是用户调用， 默认不传
     * */
    setRoute: function (path, isNoUser) {
      window.location.hash = '#'+path;
      if(isNoUser) {
          if(path === this.currentUrl){
              this.goToPage();
          } else {
              this._destroyComp();
          }
      }
    },
    /**
     *注销前一个页面组件
     */
    _destroyComp: function () {
        if(this.beforeUrl) {
            var comp = this.routeTable[this.beforeUrl];
            if(comp && comp.isMounted) {
                comp.destroy();
            }
        }
    },
    /**
     * 事件监听
     * */
    initEvent: function () {
        var k = this;
        // 显示首页
        window.addEventListener('load', function() {
            k.refresh.call(k)
        }, false);
        window.addEventListener('hashchange', function() {
            console.log('change = '+window.location.hash);
            k.refresh.call(k)
        }, false);
    }
});


module.exports = SPA;