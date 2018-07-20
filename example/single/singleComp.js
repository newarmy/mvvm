import BaseComp  from '../../src/componentFactory.js';
import tpl  from './tpl.html';
var dom = $('.box');
var tabComp = new BaseComp({
    element: dom,
    isDev: true,
    //做一些组件初始化操作
    init: function () {
        var k = this;
        k.heads = k.element.find('li');
        k.cons = k.element.find('#tabC').find('div');
        k.heads.removeClass('cur').eq(0).addClass('cur');
        k.cons.removeClass('cur').eq(0).addClass('cur');
    },
    // 注册事件
    events: {
        'click li': 'showCurrentDiv'
    },
    // 事件对应的行为函数
    methods: {
        // 事件对应的行为函数
        showCurrentDiv: function (e, it) {
            var k = this;
            e.preventDefault();
            var index = it.index();
            k.heads.removeClass('cur').eq(index).addClass('cur');
            k.cons.removeClass('cur').eq(index).addClass('cur');
        }
    },
    template: tpl,
    //data: {arr: [{head: 'test1',content: 'test content1'}, {head: 'test2',content: 'test content2'}]}
})

