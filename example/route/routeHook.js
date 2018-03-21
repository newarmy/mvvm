/**
单页面应用， 路由钩子
*/
var SPA = require('../../src/SPA');
var child1 = require('./child1');
var child2 = require('./child2');
var child3 = require('./child3');
var table = {
    '/': child1,
    '/test': child2,
    '/login': child3
};

var spa = new SPA({
    table:table,
    // 所用导航前都要执行的函数
    beforeRouter: function (curUrl) {
        console.log('hook = '+curUrl);
        if(curUrl === '/') {
            this.next();
        } else {
            this.next('/login');
        }
    }
});
spa.init();

