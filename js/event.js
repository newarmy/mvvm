/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 30);
/******/ })
/************************************************************************/
/******/ ({

/***/ 30:
/***/ (function(module, exports, __webpack_require__) {

/**
 * Created by xinjundong on 2017/12/4.
 */
var EVENT = __webpack_require__(6);

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

/***/ }),

/***/ 6:
/***/ (function(module, exports) {

/**
 * Created by xinjundong on 2017/12/4.
 */
// 事件回调方法缓存到 __EventCallback__
window.__EventCallback__ = {}
// 事件类型管理对象
window.__EventTypeManager__ = {}


/**
 * 获取一个随机字符串
 * */
function getRandomStr (str) {
    return str + '_' + String((new Date()).getTime() * Math.random()).substr(0, 13).replace('.', 'a')
}

function getCurrentSelector(tar, type) {
    var currentClassName;
    switch(type) {
        case 1:
            currentClassName = tar.className;
            break;
        case 2:
            currentClassName = tar.id;
            break;
        case 3:
            currentClassName = tar.tagName.toLowerCase();

    }
    return currentClassName;
}
function getCurrentTarget(tar, className, classType){
    var currentClassName = getCurrentSelector(tar, classType);
    className = className.replace(/(^\s*)|(\s*$)/g, '');
    while(currentClassName.indexOf(className) === -1) {
        if(tar.flag) {
            return null;
        }
        tar = tar.parentNode;
        currentClassName = getCurrentSelector(tar, classType);
    }
    return tar;
}

module.exports = {
    addEvent: function (dom, type, func) {
       var callbackKey = getRandomStr(type);
       window.__EventCallback__[callbackKey] = func;
       if(!window.__EventTypeManager__[type]) {
           window.__EventTypeManager__[type] = []
       }
       window.__EventTypeManager__[type].push(window.__EventCallback__[callbackKey]);
       dom.addEventListener(type, window.__EventCallback__[callbackKey])
    },
    removeEvent: function (dom, type, func) {
        if(func) {
            dom.removeEventListener(type, func);
            return;
        }
        for (var eventType in window.__EventTypeManager__) {
            if(eventType === type) {
                var eventArr = window.__EventTypeManager__[eventType];
                for(var i = 0, len = eventArr.length; i < len; i++) {
                    var funci = eventArr[i];
                    dom.removeEventListener(eventType, funci);
                    funci = null;
                }
                window.__EventTypeManager__[eventType] = null;
                eventArr = null;
            }

        }
    },
    removeAllEvent: function(dom) {
        for (var type in window.__EventTypeManager__) {
            var eventArr = window.__EventTypeManager__[type];
            for(var i = 0, len = eventArr.length; i < len; i++) {
                var funci = eventArr[i];
                dom.removeEventListener(type, funci);
                funci = null;
            }
            window.__EventTypeManager__[type] = null;
            eventArr = null;
        }
    },
    addProxyEvent: function (dom, type, selector, func) {
        var k = this;
        dom.flag = "parent";
        var className;
        // 1: class, 2: id, 3: tag
        var selectorType = 3
        if (selector.indexOf('.') === 0) {
            selectorType = 1;
            className = selector.replace('.', '');
        } else if(selector.indexOf('#') === 0) {
            selectorType = 2;
            className = selector.replace('#', '');
        } else {
            className = selector;
        }
        var proxyFunc = function(e) {
            var t = e.target;
            var tar = getCurrentTarget(t, className, selectorType);
            var eventObj = {
                target: e.target,
                type: e.type,
                currentTarget: tar,
                preventDefault: function() {
                    e.preventDefault()
                },
                stopPropagation: function() {
                    e.stopPropagation()
                }
            };
            func(eventObj);
        }
        k.addEvent(dom, type, proxyFunc)
    }
};

/***/ })

/******/ });