//vm类, 

import Flow from '../../src/FlowManager';
import ajax from './api';
//数据流控制类
var flow = new Flow({
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

export default flow;

