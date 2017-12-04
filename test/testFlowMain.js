//vm类, 
/**

*/
var Vue = require('../src/newBaseComp');
var Flow = require('../src/FlowManager');
var t1 = require('./template/testFlow/child1.html');
var t2 = require('./template/testFlow/child2.html');
var tp = require('./template/testFlow/parent.html');

// 子组件1
var c1obj = new Vue({
    template: t1, //模板文件
    isDev: true, //输出流程标识
    // 事件
    events: {
        'click p': 'show'
    },
    // 初始操作
    init: function () {
        var k = this;
        k.store.on('tab1', function(data) {
            k.element.html(data);
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
      k.store.on('tab2', function(data) {
          k.element.html(data);
      })
    },
    methods: {
        show: function(e){
            alert(e.target.innerHTML);
        }
    }
})

//数据流控制类
var flow = Flow({
    state: {
        tab1: '',
        tab2: ''
    },
    actions: {
        changeTab1: function(data) {
            var k = this;
           setTimeout(function() {
               k.commit('tab1', data)
           }, 1000)
        },
        changeTab2: function(data) {
            var k = this;
            setTimeout(function() {
                k.commit('tab2', data)
            }, 1000)
        }
    }
})


//父组件
var pobj = new Vue({
    //组件容器dom
	element: $('.box1'),
    template: tp,
    //数据流控制
    store: flow,
    //注册子组件
    childComponents: {
    	'comp1':c1obj,
		'comp2':c2obj
	},
    isDev: true,
    init: function() {
        var k = this;
        k.con = k.element.find('.c');
        k.list = k.con.find('.d');
    },
    events: {
        'click li': 'show'
    },
    methods: {
        show: function(e, that){
            var k = this;
            var i = that.index();
            if(i === 0) {
                k.store.dispatch('changeTab1', 'test tab11111111111111111 data')
            } else {
                k.store.dispatch('changeTab2', 'test tab2 data')
            }
            k.list.hide().eq(i).show();
        }
    }
})

//添加到页面中
pobj.mounted();