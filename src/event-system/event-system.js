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
                currentTarget: tar
            };
            func(eventObj);
        }
        k.addEvent(dom, type, proxyFunc)
    }
};