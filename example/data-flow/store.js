//vm类, 

var Flow = require('../../src/FlowManager');
var ajax = require('./api');
//数据流控制类
var flow = Flow({
    state: {
        tab1: {},
        tab2: {}
    },
    actions: {
        changeTab1: function(data) {
            var k = this;
            // 请求数据
            ajax(data, function(res) {
                k.commit('tab1', res)
            })
        },
        changeTab2: function(data) {
            var k = this;
            // 请求数据
            ajax(data, function(res) {
                k.commit('tab2', res)
            })
        }
    }
});

module.exports = flow;

