
/**
* 继承工具方法
*/
var extend = require('./extend');
module.exports = function (protoProps, staticProps) {
	var parent = this;
	var child;
	if(protoProps && Object.prototype.hasOwnProperty.call(protoProps, 'constructor')) {
		child = protoProps.prototype.constructor;
	} else {
		child = function () {
			return parent.apply(this, arguments);
		};
	}
	//拷贝静态属性
	extend(child, parent, staticProps);
	//子类与父类之间的代理，使子类不能修改父类方法
	var proxy = function() {
		this.constructor = child;
	};
	proxy.prototype = parent.prototype;
	child.prototype = new proxy();
	
	//拷贝原型属性
	if (protoProps) extend(child.prototype, protoProps);
	
	return child;
};