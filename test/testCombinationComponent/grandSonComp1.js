/**
 * Created by xinjundong on 2017/11/16.
 */
/**
 * Created by xinjundong on 2017/11/16.
 */
var baseComp = require('../../src/newBaseComp');

var grandSon = baseComp.extend({
    events: {
        'click': 'show'
    },
    methods: {
        show: function(e){
            alert(e.target.innerHTML);
        }
    }
})

module.exports = grandSon