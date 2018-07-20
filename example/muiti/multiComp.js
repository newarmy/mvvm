//vm类, 
/**

*/
import Vue from '../../src/componentFactory';
import child1 from './child1';
import child2 from './child2';
import tp from './combinationTemplate/parent.html';

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
