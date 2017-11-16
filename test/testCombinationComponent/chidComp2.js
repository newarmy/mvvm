/**
 * Created by xinjundong on 2017/11/16.
 */
var baseComp = require('../../src/newBaseComp');

var childC = baseComp.extend({
    events: {
        'click': 'show'
    },
    methods: {
        show: function(e){
            alert(e.target.innerHTML);
        }
    }
});
module.exports = childC