
/**
* template
*/

export default {
	startTag: "<%",
	endTag: "%>",
	parse: function (str) {
		let reg = /^=(.+)/;//来判断是变量还是语句
        let startArr = str.split(this.startTag);//开始标识符分割的数组
        let endArr;//结束标识符分割的数组
        let variable;
        let varArr;//
        let temp;
        let html;
        let l = startArr.length;
        if(startArr.length === 1) {
        	html = 'var str= \''+str+'\'; return str;';
        	return new Function('data', html);
		}
		html = ' var str = ""; var __count = 0; for(var key in data) {__count++;} if(__count === 0) {return str;} with(data) {';
		for(let i = 0 ; i < l; i++) {
			temp = startArr[i];
			endArr = temp.split(this.endTag);
			if(endArr.length === 1) {//纯字符串
				html+='str+=\''+endArr[0]+'\';';
			} else {//有变量或语句
				variable = endArr[0];
				varArr = variable.match(reg);
				if(varArr && varArr.length === 2) {//是变量
					
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
		return new Function('data', html);
	}
};