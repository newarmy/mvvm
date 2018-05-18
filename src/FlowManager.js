/**
 * 数据流管理类
 *
 * dispatch 激发action执行
 * commit 修改数据
 *
 **/
import EventBase  from './util/eventBase';
// // 类的所有方法都是不可枚举的
export default class FlowManager extends EventBase {
	constructor (opt) {
		super();
        this.state = opt.state;
        this.actions = opt.actions;
        this._selfEvent = {};
        this._init();
	}

    _init () {
        let k = this;
        console.log(k);
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
    }

    // 提交数据
    commit (key, payload) {
        let k = this;
        k.trigger(k._selfEvent[key], payload);
    }

    // 触发行为
    dispatch (action, payload) {
        let k = this;
        k.actions[action].call(k, payload)
    }
}