//vm类, 
/**

*/
var ModelBase = require('./ModelBase');
var VM = require('./VM');



var cModel = ModelBase.extend({});
var cm = new cModel({});
var cVM = VM.extend({
	events: {'click li': 'show'},
	show: function(e) {
		var tar = e.target;
		alert(tar.innerHTML);
	}
});
var cv = new cVM({
	element: $('.box'),
	model: cm,
	tpl: '<li>{{name}}</li>'
});

cv.init({
	url: '/data/main.json',
	dataType: 'json'
});