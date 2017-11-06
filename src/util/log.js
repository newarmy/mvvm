
/**
* 日志类
*/
console = window.console ? window.console : function(e){alert(e)};

module.exports = {
	log: console.log,
	error: console.error
};