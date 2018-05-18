// 自定义事件机制
// 类的所有方法都是不可枚举的
export default class EventBase {
	constructor () {
		this._events_ = {}
	}
	on (type, callback, thisArg) {
	    thisArg = thisArg || this;
        if(this._events_[type]) {
            this._events_[type].push({cb: callback, thisArg: thisArg});
        } else {
            this._events_[type] = [];
            this._events_[type].push({cb: callback, thisArg: thisArg});
        }
	}
    off (type, callback) {
        if(!this._events_[type]) {
            return;
        }
        this._events_[type] = [];
    }

    trigger (type, opt) {
        let funcs = this._events_[type];
        if(!funcs) {
            return;
        }
        let len = funcs.length;
        for(let i =0; i < len; i++) {
            let cb = funcs[i].cb;
            let thisArg = funcs[i].thisArg;
            cb.call(thisArg, opt);
        }
    }
}

