/**
 * Created by xinjundong on 2017/11/16.
 */
/**
 * Created by xinjundong on 2017/11/16.
 */
var baseComp = require('../../src/newBaseComp');

var childC = baseComp.extend({
    init: function() {
        var k = this;
        k.con = k.element.find('.c');
        k.list = k.con.find('.d');
    },
    events: {
        'click li': 'show'
    },
    methods: {
        show: function(e, that){
            var k = this;
           var i = that.index();
           k.list.hide().eq(i).show();
        }
    }
});
module.exports = childC