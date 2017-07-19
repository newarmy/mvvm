//集中管理状态的基类
//需要和组件配合来传递数据，
/*步骤是:   1. 组件引入状态对象。
			2. 一个组件修改了一个状态值（通过事件修改），
			   就通知所有公用这个状态的组件（通过事件通知）。
			3. 公用这个状态的组件根据接收到的数据，触发相应的行为
*/
var extend = require('./util/extend');
var extendClass = require('./util/extendClass');
var eventBase = require('./eventBase');
/**
* 
*/
function stateBus(opt) {
	this.states = opt.states;// {'state': 'statename'}, 状态名
	this.parentBus = opt.parentBus || null;
	//对象的唯一标示
	this.classId = (new Date()).getTime()+"_class_"+Math.random();
	this.init();
}
extend(stateBus.prototype, eventBase, {
	init: function () {
		var k = this;
		for(var key in k.states) {
			this.register(k.states[key]);
		}
		if(k.parentBus) {
			k.handlerParentBus();
		}
	},
	setParentBus: function(pbus) {
		var k =this;
		k.parentBus = pbus;
		k.handlerParentBus();
	},
	//注册状态
	register: function (state) {
		var k = this;
		k._addListener(state);
	},
	//内部使用，中转事件
	_addListener: function(state) {
		var k = this;
		k.on(state+"_change", function(opt) {
			var targetClassId = opt.classId ? opt.classId : k.classId;
			var newOpt = {
				type: state,
				value: opt.payload,
				classId: targetClassId//标示哪个state对象触发的事件
			};
			k.trigger(newOpt.type, newOpt);

			if(k.parentBus && k.parentBus.states[newOpt.type]) {
				k.parentBus.dispatch(newOpt.type,  newOpt);
			}
		}, k);
	},
	//触发事件,
	dispatch: function(state, opt) {
		var k = this;
		k.trigger(state+'_change', opt);
	},
	//处理全局公共state（state中父状态对象传回到子状态对象的处理）
	handlerParentBus: function() {
		var k = this;
		for(var key in k.parentBus.states) {
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
module.exports = stateBus;