//vm类, 
/**

*/
import Vue from '../../src/componentFactory';
import t2  from './combinationTemplate/child2.html';

let c2obj = new Vue({
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