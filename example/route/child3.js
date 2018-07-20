//vm类, 
/**

*/
import Vue from  '../../src/componentFactoryForRoute';
import t2 from './combinationTemplate/child3.html';

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

export default c2obj;