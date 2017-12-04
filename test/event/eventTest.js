/**
 * Created by xinjundong on 2017/12/4.
 */
var EVENT = require('../../src/event-system/event-system');

var g = function (selector) {
    return document.querySelector(selector)
}
var dom1 = g('.test1');
var dom2 = g('.test2');
var dom3 = g('.test3');
EVENT.addEvent(dom1, 'click', function(e) {
    alert('click');
    EVENT.removeEvent(dom1, 'click')
});

EVENT.addProxyEvent(dom2, 'click', '.tag', function (e) {
    console.log(e);
    alert(e.currentTarget.innerHTML);
})
EVENT.addProxyEvent(dom3, 'click', '.tag', function (e) {
    alert(e.currentTarget.innerHTML);
})