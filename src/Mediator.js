//中介者类，关联各个组件，组件之前通过中奖者对象传递数据 
//需要和组件配合来传递数据，
/*步骤是:   1. 组件通过事件广播数据，
			2. 中介者接收数据并传给另一个组件，
			3. 这个组件根据接收到的数据，触发相应的行为
*/
var extend = require('./util/extend');
var extendClass = require('./util/extendClass');
var eventBase = require('./eventBase');
/**
	opt:{'objectName': component}, 传递相关的组件对象到中介者对象
*/
function Mediator(opt) {
	this.opt = opt;
	this.init();
}
extend(Mediator.prototype, eventBase, {
	init: function () {
		for(var key in this.opt) {
			this.register(key, this.opt[key]);
		}
	},
	//注册组件到中介者
	register: function (name, component) {
		this[name] = component;
	}
});
Mediator.extend = extendClass;
module.exports = Mediator;