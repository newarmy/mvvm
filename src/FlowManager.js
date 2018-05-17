/**
 * 数据流管理类
 *
 * dispatch 激发action执行
 * commit 修改数据
 *
 **/
import extend from './util/extend';
import EventBase  from './util/eventBase';
let eventBase = new EventBase();

function FlowManager (opt) {
	this.state = opt.state;
	this.actions = opt.actions;
	this._selfEvent = {};
	this._init();
}
extend(FlowManager.prototype, eventBase, {
    _init: function () {
    	let k = this;
    	for(let key in k.state) {
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
    	let k = this;
    	k.trigger(k._selfEvent[key], payload);
	},
	// 触发行为
	dispatch: function (action, payload) {
    	let k = this;
    	k.actions[action].call(k, payload)
	}
});

export default function (opt) {
	return new FlowManager(opt)
};