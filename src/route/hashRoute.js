/**
 * 路由类
 * 如果路由中有参数，会解析#/path?a=b&c=d成为 {url: '/path?a=b&c=d', a: b, c: d}
 * */

export default class Router {
    constructor (routeTable, beforeRouter) {
        this.routeTable = routeTable;//用户的注册路由表
        this.beforeRouter = beforeRouter; //钩子函数
        this.routes = {}; // 内部用（存放路由和其执行函数的Map）
        this.currentUrl = '/'; // 当前路由
        this.beforeUrl = ''; // 前一个路由

    }
    // 初始化路由事件
    initEvent () {
        let k = this;
        window.addEventListener('load', function () {
            k.refresh.call(k)
        }, false);
        window.addEventListener('hashchange', function () {
            k.refresh.call(k)
        }, false);
    }
    // 注册路由
    route (path, callback) {
        this.routes[path] = callback;
    }
    // 切换路由
    refresh () {
        this.beforeUrl = this.currentUrl;
        this.currentUrl = location.hash.slice(1) || '/';
        if(this.beforeRouter){
            this.beforeRouter.call(this, this.currentUrl);
        } else {
            this.goToPage();
        }
    }
    /**
     * 手动设置路由
     * path: 设置的路由
     * isNoUser 是否是用户调用， 默认不传
     * */
    setRoute (path, isNoUser) {
        window.location.hash = '#'+path;
        if(isNoUser) {
            if(path === this.currentUrl){
                this.goToPage();
            } else {
                this._destroyComp();
            }
        }
    }
    /**
     * 回退路由
     * */
    goBack (num) {
        window.history.go(num);
    }
    /**
     * 根据路由，渲染组件到页面
     * */
    goToPage (path) {
        this._destroyComp();
        let url = path || this.currentUrl;
        let param = this.parseParam(url);
        this.routes[url](param);
    }
    /**
     * 解析路由中的参数
     * */
    parseParam (url) {
        let arr = url.split('?');
        if(arr.length === 1) {
            return {url: url};
        } else {
            let obj = {}
            let arr2 = arr[1].split('&');
            for(let i = 0, len = arr2.length; i < len; i++) {
                let arr3 = arr2[i].split('=');
                obj[arr3[0]] = arr3[1];
            }
            obj['url'] = url;
            return obj;
        }
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
        if(path === false) {
            this.goBack(-1);
        } else if(path === undefined) {
            this.goToPage();
        } else if(typeof path === 'string'){
            this.setRoute(path, true);
        }
    }

    /**
     *注销前一个页面组件
     */
    _destroyComp () {
        if(this.beforeUrl) {
            let comp = this.routeTable[this.beforeUrl];
            if(comp && comp.isMounted) {
                comp.destroy();
            }
        }
    }
}




