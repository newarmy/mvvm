/**
单页面应用
*/
var SPA = require('../../src/SPA');
var child1 = require('./child1');
var child2 = require('./child2');

var table = {
    '/': child1,
    '/test': child2
};

var spa = new SPA(table);
spa.init();
