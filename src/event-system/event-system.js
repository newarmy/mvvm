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

function getCurrentSelector (tar, type) {
  var currentClassName
  switch (type) {
    case 1:
      currentClassName = tar.className
      break
    case 2:
      currentClassName = tar.id
      break
    case 3:
      currentClassName = tar.tagName.toLowerCase()
  }
  return currentClassName
}
function getCurrentTarget (tar, className, classType) {
  var currentClassName = getCurrentSelector(tar, classType)
  className = className.replace(/(^\s*)|(\s*$)/g, '')

  if (classType === 1) {
    if (currentClassName.indeOf(className) > -1) {
      return tar
    } else {
      tar = fromClassName(tar, currentClassName, className, classType)
    }
  } else {
    if (currentClassName === className) {
      return tar
    } else {
      tar = fromTagOrId(tar, currentClassName, className, classType)
    }
  }
  return tar
}
function fromTagOrId (tar, currentClassName, className, classType) {
  while (currentClassName !== className) {
    if (tar && tar.getAttribute('flag')) {
      return null
    }
    tar = tar.parentNode
    currentClassName = getCurrentSelector(tar, classType)
  }
  return tar
}
function fromClassName (tar, currentClassName, className, classType) {
  while (currentClassName.indexOf(className) === -1) {
    if (tar && tar.getAttribute('flag')) {
      return null
    }
    tar = tar.parentNode
    currentClassName = getCurrentSelector(tar, classType)
  }
  return tar
}
module.exports = {
  addEvent: function (dom, type, func) {
    var callbackKey = getRandomStr(type)
    window.__EventCallback__[callbackKey] = func
    if (!window.__EventTypeManager__[type]) {
      window.__EventTypeManager__[type] = []
    }
    window.__EventTypeManager__[type].push(window.__EventCallback__[callbackKey])
    dom.addEventListener(type, window.__EventCallback__[callbackKey])
  },
  removeEvent: function (dom, type, func) {
    if (func) {
      dom.removeEventListener(type, func)
      return
    }
    for (var eventType in window.__EventTypeManager__) {
      if (eventType === type) {
        var eventArr = window.__EventTypeManager__[eventType]
        for (var i = 0, len = eventArr.length; i < len; i++) {
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
      var eventArr = window.__EventTypeManager__[type]
      for (var i = 0, len = eventArr.length; i < len; i++) {
        var funci = eventArr[i]
        dom.removeEventListener(type, funci)
        funci = null
      }
      window.__EventTypeManager__[type] = null
      eventArr = null
    }
  },
  addProxyEvent: function (dom, type, selector, func) {
    var k = this
    var className
    dom.setAttribute('flag', 'parent')
    // 1: class, 2: id, 3: tag
    var selectorType = 3
    if (selector.indexOf('.') === 0) {
      selectorType = 1
      className = selector.replace('.', '')
    } else if (selector.indexOf('#') === 0) {
      selectorType = 2
      className = selector.replace('#', '')
    } else {
      className = selector
    }
    var proxyFunc = function (e) {
      var t = e.target
      var tar = getCurrentTarget(t, className, selectorType)
      if (!tar) {
        return
      }
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
      }
      func(eventObj)
    }
    k.addEvent(dom, type, proxyFunc)
  }
}
