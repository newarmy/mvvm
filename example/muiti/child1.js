//vm类, 
/**

*/
var Vue = require('../../src/newBaseComp');
var t1 = require('./combinationTemplate/child1.html');
var tg = require('./combinationTemplate/gson.html');

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

module.exports = c1obj