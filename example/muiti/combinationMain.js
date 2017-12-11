//vm类, 
/**

*/
var Vue = require('../../src/newBaseComp');
var child1 = require('./child1');
var child2 = require('./child2');
var tp = require('./combinationTemplate/parent.html');

var pobj = new Vue({
	element: $('.box1'),
    template: tp,
    //子组件
    childComponents: {
    	'comp1': child1,
		'comp2': child2
	},
    isDev: true,
    init: function() {
        var k = this;
        k.tab = k.element.find('li');
        k.con = k.element.find('.c');
        k.list = k.con.find('.d');
        k.tab.removeClass('cur').eq(0).addClass('cur');
        k.list.removeClass('cur').eq(0).addClass('cur');
    },
    events: {
        'click li': 'show'
    },
    methods: {
        show: function(e, that){
            var k = this;
            var i = that.index();
            k.tab.removeClass('cur').eq(i).addClass('cur');
            k.list.removeClass('cur').eq(i).addClass('cur');
        }
    }
})

pobj.mounted();