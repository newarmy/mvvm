
/**
* template
*/

function template(str, obj) {
	return str.replace(/\{\{([^\{\}]+)\}\}/gi, function(regResult/*完全匹配的结果*/, childRegResult/*第一个子分组匹配的结果*/) {
		var key = childRegResult.replace(/\s/gi, "");
		var result;
		//console.log(key);
		if(obj[key] || obj[key] === 0) {
			result = obj[key];
		}
		return result;
	});
}
var isArray = Array.isArray || function(obj) {
    return Object.prototype.toString.call(obj) === '[object Array]';
};
module.exports = function (tpl, json) {
	var isArr = isArray(json);
	var resStr = '';
	if(isArr) {
		for(var i = 0, len = json.length; i < len; i++) {
			resStr += template(tpl, json[i]);
		}
	} else {
		resStr = template(tpl, json);
	}
	return resStr;
};