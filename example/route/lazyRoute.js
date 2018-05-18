/**
webpack 分割代码，懒加载 ， import()返回的是Promise对象
*/
import SPA from  '../../src/SPA';
import child1 from './child1';

/**
 * 注意：如果您使用的是 Babel，你将需要添加 syntax-dynamic-import 插件，
 * 才能使 Babel 可以正确地解析(import('./Foo.vue') // 返回 Promise)语法。
 * */


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
    table: asyncTable
});

