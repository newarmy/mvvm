//vm类, 
/**

*/
var TabComp = require('./tabComp');
var tpl = require('./template/tab.html');

var dom = $('.box');
new TabComp({
	element: dom,
	tpl: tpl,
	isDev: true,
	data: {arr: [{head: 'test1', content: 'test content1'}, {head: 'test2',content: 'test content2'}]}
})