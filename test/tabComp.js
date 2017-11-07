var baseComp = require('../src/baseComp');
var tabComp = baseComp.extend({
     init: function() {
         var k = this;
         k.heads = k.element.find('li');
         k.cons = k.element.find('#tabC').find('div');
         k.heads.removeClass('cur').eq(0).addClass('cur');
         k.cons.removeClass('cur').eq(0).addClass('cur');
     },
     events: {
         'click li': 'showCurrentDiv'
     },
    methods:{
        showCurrentDiv: function(e, it) {
            var k = this;
            e.preventDefault();
            var index = it.index();
            k.heads.removeClass('cur').eq(index).addClass('cur');
            k.cons.removeClass('cur').eq(index).addClass('cur');
        }
    }
});
module.exports = tabComp;