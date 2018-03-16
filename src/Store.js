//集中管理状态的基类
//需要和组件配合来传递数据，
/*步骤是:   1. 组件引入状态对象。
			2. 一个组件修改了一个状态值（通过事件修改），
			   就通知所有公用这个状态的组件（通过事件通知）。
			3. 公用这个状态的组件根据接收到的数据，触发相应的行为
*/
var extend = require('./util/extend');
var extendClass = require('./util/extendClass');
var eventBase = require('./util/eventBase');
/**
* 
*/
var DataStore = {};
function Store(opt) {
	this.dataStore = opt.dataStore;
	//对象的唯一标示
	this.classId = (new Date()).getTime()+"_class_"+Math.random();
	this.init();
}
extend(stateBus.prototype, eventBase, {
	init: function () {
		var k = this;
        DataStore = k.dataStore;
	},

	//注册状态
	register: function (state) {
		var k = this;
		k._addListener(state);
	},

	//触发事件,
	dispatch: function(state, opt) {
		var k = this;
		k.trigger(state+'_change', opt);
	}
});
Store.extend = extendClass;
module.exports = Store;