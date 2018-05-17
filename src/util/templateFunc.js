
/**
* template
*/

function template(str, obj) {
	return str.replace(/\{\{([^\{\}]+)\}\}/gi, function(regResult/*完全匹配的结果*/, childRegResult/*第一个子分组匹配的结果*/) {
		let key = childRegResult.replace(/\s/gi, "");
		let result;
		//console.log(key);
		if(obj[key] || obj[key] === 0) {
			result = obj[key];
		}
		return result;
	});
}
let isArray = Array.isArray || function(obj) {
    return Object.prototype.toString.call(obj) === '[object Array]';
};
export default function (tpl, json) {
	let isArr = isArray(json);
	let resStr = '';
	if(isArr) {
		for(let i = 0, len = json.length; i < len; i++) {
			resStr += template(tpl, json[i]);
		}
	} else {
		resStr = template(tpl, json);
	}
	return resStr;
};