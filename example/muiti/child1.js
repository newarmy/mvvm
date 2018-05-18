//vm类, 
/**

*/
import Vue from '../../src/componentFactory';
import t1 from './combinationTemplate/child1.html';
import tg from './combinationTemplate/gson.html';

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

export default c1obj;