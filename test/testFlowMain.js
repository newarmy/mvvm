//vm类, 
/**

*/
var Vue = require('../src/newBaseComp');
var Flow = require('../src/FlowManager');
var t1 = require('./template/testFlow/child1.html');
var t2 = require('./template/testFlow/child2.html');
var tp = require('./template/testFlow/parent.html');


var c1obj = new Vue({
    template: t1,
    isDev: true,
    events: {
        'click p': 'show'
    },
    init: function () {
        var k = this;
        k.store.on('tab1', function(data) {
            k.element.html(data);
        })
    },
    methods: {
        show: function(e, that){
            alert(that.html());
        }
    }

})
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

var pobj = new Vue({
	element: $('.box1'),
    template: tp,
    store: flow,
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

pobj.mounted();