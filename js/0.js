webpackJsonp([0],{

/***/ 27:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _componentFactory = __webpack_require__(13);

var _componentFactory2 = _interopRequireDefault(_componentFactory);

var _child = __webpack_require__(73);

var _child2 = _interopRequireDefault(_child);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//vm类, 
/**

*/
var c2obj = new _componentFactory2.default({
    element: $('.box1'),
    template: _child2.default,
    isDev: true,
    events: {
        'click': 'show'
    },
    methods: {
        show: function show(e) {
            alert(e.target.innerHTML);
        }
    }
});

exports.default = c2obj;

/***/ }),

/***/ 73:
/***/ (function(module, exports) {

module.exports = "<div class=\"d\">\r\n    登录\r\n</div>"

/***/ })

});