
/**
 *
* 日志类
*/
let noop = function () {}
let console = window.console ? window.console : {log: noop, error: noop};
let Log = {
	log: console.log,
	error: console.error
};
export default Log;