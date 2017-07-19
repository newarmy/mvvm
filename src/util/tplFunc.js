
/**
* template
*/

var template = {
	startTag: "<%",
	endTag: "%>",
	parse: function (str) {
		var reg = /^=(.+)/;//来判断是变量还是语句
		var startArr = str.split(this.startTag);//开始标识符分割的数组
		var endArr;//结束标识符分割的数组
		var variable;
		var varArr;//
		var html = 'var data = arguments[0]; var str=""; with(data){';
		var temp;
		for(var i = 0, l = startArr.length; i < l; i++) {
			temp = startArr[i];
			var endArr = temp.split(this.endTag);
			if(endArr.length == 1) {//纯字符串
				html+='str+=\''+endArr[0]+'\';';
			} else {//有变量或语句
				var variable = endArr[0];
				var varArr = variable.match(reg);
				if(varArr && varArr.length==2) {//是变量
					
					html +='str+='+ varArr[1]+';'; 
					html += 'str+=\''+endArr[1]+'\';';
				} else {
					html += endArr[0];//是语句
					html += 'str+=\''+endArr[1]+'\';';
				}
			}
		}
		html+='} return str;';
		//console.log(html);
		return new Function( html);
	}
};
module.exports = template;