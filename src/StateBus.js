//集中管理状态的基类
//需要和组件配合来传递数据，
/*步骤是:   1. 组件引入状态对象。
			2. 一个组件修改了一个状态值（通过事件修改），
			   就通知所有公用这个状态的组件（通过事件通知）。
			3. 公用这个状态的组件根据接收到的数据，触发相应的行为
*/
import extend from './util/extend';
import extendClass from './util/extendClass';
import EventBase  from './util/eventBase';


let eventBase = new EventBase();

function stateBus(opt) {
	this.states = opt.states;// {'state': 'statename'}, 状态名
	this.parentBus = opt.parentBus || null;
	//对象的唯一标示
	this.classId = (new Date()).getTime()+"_class_"+Math.random();
	this.init();
}
extend(stateBus.prototype, eventBase, {
	init: function () {
		let k = this;
		for(let key in k.states) {
			this.register(k.states[key]);
		}
		if(k.parentBus) {
			k.handlerParentBus();
		}
	},
	setParentBus: function(pbus) {
		let k =this;
		k.parentBus = pbus;
		k.handlerParentBus();
	},
	//注册状态
	register: function (state) {
		let k = this;
		k._addListener(state);
	},
	//内部使用，中转事件
	_addListener: function(state) {
		let k = this;
		k.on(state+"_change", function(opt) {
			let targetClassId = (opt && opt.classId) ? opt.classId : k.classId;
			let newOpt = {
				type: state,
				classId: targetClassId//标示哪个state对象触发的事件
			};
			if(opt && opt.payload) {
                newOpt.payload = opt.payload;
			}
			k.trigger(newOpt.type, newOpt);

			if(k.parentBus && k.parentBus.states[newOpt.type]) {
				k.parentBus.dispatch(newOpt.type,  newOpt);
			}
		}, k);
	},
	//触发事件,
	dispatch: function(state, opt) {
		let k = this;
		k.trigger(state+'_change', opt);
	},
	//处理全局公共state（state中父状态对象传回到子状态对象的处理）
	handlerParentBus: function() {
		let k = this;
		for(let key in k.parentBus.states) {
			if(k.states[key]) {
				(function(k, key) {
					k.parentBus.on(key, function(opt) {
						if(opt.classId === k.classId) {
							return;
						}
						k.trigger(key, opt);
					}); 
				})(k, key);
			}
		}
	}
});
stateBus.extend = extendClass;
export default stateBus;