//vm类, 
/**

*/
var Vue = require('../../src/newBaseComp');
var t2 = require('./combinationTemplate/child3.html');

var c2obj = new Vue({
    element: $('.box1'),
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

module.exports = c2obj