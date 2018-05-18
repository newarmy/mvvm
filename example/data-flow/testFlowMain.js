
import Vue from '../../src/componentFactory';
import t1 from './flowTemplate/child1.html';
import t2 from './flowTemplate/child2.html';
import tp from './flowTemplate/parent.html';
import store from './store';

// 子组件1
var c1obj = new Vue({
    template: t1, //模板文件
    isDev: true, //输出流程标识
    data: {
        dd: 'test tpl',
        cc: 'this is a test'
    },
    // 事件
    events: {
        'click p': 'show'
    },
    // 初始操作
    init: function () {
        var k = this;
        // 监听store里的tab1的变化
        k.store.on('tab1', function(data) {
            //alert(data);
            k.setData(data);
        })
    },
    //事件中的回调方法
    methods: {
        show: function(e, that){
            alert(that.html());
        }
    }

})
// 子组件2
var c2obj = new Vue({
    template: t2,
    isDev: true,
    events: {
        'click': 'show'
    },
    init: function () {
      var k = this;
        // 监听store里的tab2的变化
      k.store.on('tab2', function(data) {
          k.element.html(data.content);
      })
    },
    methods: {
        show: function(e){
            alert(e.target.innerHTML);
        }
    }
});



//父组件
var pobj = new Vue({
    //组件容器dom
	element: $('.box1'),
    template: tp,
    //数据流控制
    store: store,
    //注册子组件
    childComponents: {
    	'comp1':c1obj,
		'comp2':c2obj
	},
    isDev: true,
    init: function() {
        var k = this;
        k.tab = k.element.find('li');
        k.con = k.element.find('.c');
        k.list = k.con.find('.d');
        k.tab.removeClass('cur').eq(0).addClass('cur');
        k.list.removeClass('cur').eq(0).addClass('cur');
        k.store.dispatch('changeTab1', {id: 'request 0'})
    },
    events: {
        'click li': 'show'
    },
    methods: {
        show: function(e, that){
            var k = this;
            var i = that.index();
            if(i === 0) {
                k.store.dispatch('changeTab1', {id: 'request 1'})
            } else {
                k.store.dispatch('changeTab2',{id: 'request 2'})
            }
            k.tab.removeClass('cur').eq(i).addClass('cur');
            k.list.removeClass('cur').eq(i).addClass('cur');
        }
    }
})

//添加到页面中
pobj.mounted();