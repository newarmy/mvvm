webpackJsonp([1],{

/***/ 14:
/***/ (function(module, exports) {

module.exports = "<div class=\"d\">\r\n    第二子组件\r\n</div>"

/***/ }),

/***/ 8:
/***/ (function(module, exports, __webpack_require__) {

//vm类, 
/**

*/
var Vue = __webpack_require__(1);
var t2 = __webpack_require__(14);

var c2obj = new Vue({
    element: $('.box1'),
    template: t2,
    isDev: true,
    events: {
        'click': 'show'
    },
    methods: {
        show: function(e){
            alert(e.target.innerHTML);
        }
    }
})

module.exports = c2obj

/***/ })

});