/**
 * Created by xinjundong on 2017/11/16.
 */
var baseComp = require('../../src/newBaseComp');

var childC = baseComp.extend({
    events: {
        'click': 'show'
    },
    methods: {
        show: function(e, that){
            alert(that.html());
        }
    }
});
module.exports = childC