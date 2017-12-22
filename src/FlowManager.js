/**
 * 数据流管理类
 *
 * dispatch 激发action执行
 * commit 修改数据
 *
 **/
var extend = require('./util/extend');
var eventBase = require('./util/eventBase');
function FlowManager (opt) {
	this.state = opt.state;
	this.actions = opt.actions;
	this._selfEvent = {};
	this._init();
}
extend(FlowManager.prototype, eventBase, {
    _init: function () {
    	var k = this;
    	for(var key in k.state) {
    		k._selfEvent[key] = key+'_event';
			(function(k, key){
                k.on(k._selfEvent[key], function(data) {
                	if(k.state[key] === data) {
                		return;
					}
                    k.state[key] = data;
                    k.trigger(key, k.state[key])
                })
			}(k, key))
		}
	},
	// 提交数据
	commit: function(key, payload) {
    	var k = this;
    	k.trigger(k._selfEvent[key], payload);
	},
	// 触发行为
	dispatch: function (action, payload) {
    	var k = this;
    	k.actions[action].call(k, payload)
	}
});

module.exports = function (opt) {
	return new FlowManager(opt)
};