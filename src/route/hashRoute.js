/**
 * 路由类
 * 如果路由中有参数，会解析#/path?a=b&c=d成为 {url: '/path?a=b&c=d', a: b, c: d}
 * */

function Router(routes) {
    this.routes = routes || {};
    this.currentUrl = '/';
    this.beforeUrl = '';
}
//初始化路由事件
Router.prototype.initEvent = function () {
    var k = this;
    window.addEventListener('load', function() {
        k.refresh.call(k)
    }, false);
    window.addEventListener('hashchange', function() {
        k.refresh.call(k)
    }, false);
};
//注册路由
Router.prototype.route = function (path, callback) {
    this.routes[path] = callback;
};
//切换路由
Router.prototype.refresh = function () {
    this.beforeUrl = this.currentUrl;
    this.currentUrl = location.hash.slice(1) || '/';
    this.routes[this.currentUrl]();
};

module.exports = new Router();



