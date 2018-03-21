/**
webpack 分割代码，懒加载 ， import()返回的是Promise对象
*/
var SPA = require('../../src/SPA');
var child1 = require('./child1');

var asyncTable = {
    '/': child1,
    '/test': function () {
        return import(/* webpackChunkName: "group-foo" */ './child2')
    },
    '/login': function () {
        return import(/* webpackChunkName: "group-foo1" */ './child3')
    }
}
var spa = new SPA({
    table:asyncTable
});
spa.init();

