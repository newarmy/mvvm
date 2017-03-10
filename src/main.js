//vm类, 
/**

*/
var ModelBase = require('./ModelBase');
var VM = require('./VM');


//创建自己的model类，主要就是重新parse方法，
//不需要重写parse方法时，可以直接用
//ModelBase创建对象
var cModel = ModelBase.extend({});
//生成model对象，以供VM用。
var cm = new cModel();

//创建自己的component类,继承在VM
var cVM = VM.extend({
	events: {'click li': 'show'},
	show: function(e) {
		var tar = e.target;
		alert(tar.innerHTML);
	}
});
//创建组件对象
var cv = new cVM({
	element: $('.box'),
	model: cm,
	tpl: '<li>{{name}}</li>'
});

cv.init();
cv.toGetData({
	url: '/data/main.json',
	dataType: 'json'
});