/**
 * SPA 项目程序入口
 * 1. 注册路径
 * 2. 路径管理
 * 3. 显示首页
 * */
var Router = require('./route/route');
var extend = require('./util/extend');

/**
 * {{param}}
 * table : 路由表
 * */
function SPA (table) {
   this.routeTable = table || {};
}
extend(SPA.prototype, Router, {
    register: function (path, Comp) {
        this.route(path, function () {
            Comp.mounted();
        });
    },
    init: function () {
        for(var key in this.routeTable) {
            this.register(key, this.routeTable[key]);
        }
        this.initEvent();
    },
    refresh: function () {
        this.beforeUrl = this.currentUrl;
        this.currentUrl = location.hash.slice(1) || '/';
        //注销前一个页面组件
        if(this.beforeUrl && this.routeTable[this.beforeUrl]) {
            this.routeTable[this.beforeUrl].destroy();
        }
        this.routes[this.currentUrl]();
    },
    initEvent: function () {
        var k = this;
        // 显示首页
        window.addEventListener('load', function() {
            k.refresh.call(k)
        }, false);
        window.addEventListener('hashchange', function() {
            k.refresh.call(k)
        }, false);
    }
});


module.exports = SPA;