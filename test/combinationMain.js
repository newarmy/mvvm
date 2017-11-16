//vm类, 
/**

*/
var Vue = require('../src/newBaseComp');
var t1 = require('./template/combinationTemplate/child1.html');
var t2 = require('./template/combinationTemplate/child2.html');
var tp = require('./template/combinationTemplate/parent.html');
var tg = require('./template/combinationTemplate/gson.html');

var gobj = new Vue({
    template: tg,
    isDev: true,
    events: {
        'click': 'show'
    },
    methods: {
        show: function(e){
            alert(e.target.innerHTML);
        }
    }
})
var c1obj = new Vue({
    childComponents: {
		'grandSon': gobj
	},
    template: t1,
    isDev: true,
    events: {
        'click p': 'show'
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
    methods: {
        show: function(e){
            alert(e.target.innerHTML);
        }
    }
})




var pobj = new Vue({
	element: $('.box1'),
    template: tp,
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
            k.list.hide().eq(i).show();
        }
    }
})

pobj.mounted();