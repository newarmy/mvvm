/**
 * Created by xinjundong on 2017/12/4.
 */
var baseComp = require('../../src/newBaseComp')

var dom1 = $('.test1');

var comp = new baseComp({
    element: dom1,
    init: function () {
      this.test()
    },
    events: {
      'click': 'clickFunc'
    },
    methods: {
        test: function() {
            alert(this.testdata);
        },
        clickFunc: function () {
            this.selfParam.testdata = "click";
            this.test();
        }
    },
    selfParam: {
        testdata: 'dkdkdk'
    }
});