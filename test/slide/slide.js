/**
 * Created by xinjundong on 2017/12/4.
 */
var BaseComp = require('../../src/newBaseCompNoLib')
var touchEvent = require('../../src/util/touchEvent')
var start = touchEvent.touchStart;
var move = touchEvent.touchMove;
var cancel = touchEvent.touchCancel;
var end = touchEvent.touchEnd;
function get(selector) {
    return document.querySelector(selector)
}
function getInitPosition (c, f) {
    //console.log('--------------'+c+'---------------');
    var a = 0, d = /([0-9-\.]+)+(?![3d]\()/gi, e = c.toString().match(d);
    if (!e) {
        return a;
    }
    if (e.length) {
        var b = f == "x" ? 0 : f == "y" ? 1 : 2;
        a = parseFloat(e[b]);
    }
    return a;
}
function getStyleValue (e, name) {
    return Number(window.getComputedStyle(e, "")[name].replace("px", ""))
}

function setX (el, len, time) {
    el.style.webkitTransitionDuration = time + "ms";
    el.style.msTransitionDuration = time + "ms";
    el.style.transitionDuration = time + "ms";
    el.style.webkitTransform = "translate3d(" + len +"px,0,0)";
    el.style.msTransform = "translate3d(" + len +"px,0,0)";
    el.style.transform = "translate3d(" + len +"px,0,0)";
}
function setY (el, len, time) {
    el.style.webkitTransitionDuration = time + "ms";
    el.style.msTransitionDuration = time + "ms";
    el.style.transitionDuration = time + "ms";
    el.style.webkitTransform = "translate3d(0," + len +"px,0)";
    el.style.msTransform = "translate3d(0," + len +"px,0)";
    el.style.transform = "translate3d(0," + len +"px,0)";
}

var Slide = new BaseComp({
    element: get('#slide'),
    selfParam: {
        el: get('#slide'),
        _elParent: null,
        tagName: 'li',
        _chirdren: null,
        navis: null,
        swipe: 'X',
        nav: null,
        numNav: null,
        navType: 'normal',
        prevBtn : null,
        nextBtn: null,
        auto: true,
        isNoFullScreen: false,
        _flag: null,
        _currentIndex: 0,
        _chirdW: 0,
        _chirdH: 0,
        _elWidth: 0,
        _elHeight:0,
        _interval: 400,
        _pageX: 0,
        _pageY: 0,
        _fangxiang: '',
        _left: 0,
        _top: 0,
        _pcMoveFlag: true,
        _isInertia: false,
        _inertiaLength: 300,
        _count: 0
    },
    init: function () {
        var k = this;

        if(k.selfParam.isNoFullScreen){
            k.methods.resizeLayoutNoScreen.call(k);
        }else{
            k.methods.resizeLayout.call(k);
        }
        if(k.selfParam.auto) {
            k.methods.automove.call(k)
        }
    },
    events: {
        [start]: 'touchstart',
        [move]: 'touchmove',
        [end]: 'touchend',
        [cancel]: 'touchcancel'
    },
    methods: {
        initDom: function () {
            var k = this;
            k.selfParam._elParent = k.selfParam.el.parentNode;
            k.selfParam._chirdren = k.selfParam.el.getElementsByTagName(k.selfParam.tagName);
            k.selfParam._chirdren = Array.prototype.slice.call(k.selfParam._chirdren, 0);
            k.selfParam._count = k.selfParam._chirdren.length;
        },
        resizeLayout: function () {
            var k = this;
            k.methods.initDom.call(k)
            if(k.selfParam.swipe === 'X') {
                k.selfParam._chirdW = getStyleValue(k.selfParam._elParent, 'width');
                for (var i = 0; i < k.selfParam._count; i++) {
                    k.selfParam._chirdren[i].style.width = k.selfParam._chirdW + "px";
                    k.selfParam._elWidth += k.selfParam._chirdW;
                }
                k.selfParam.el.style.width = k.selfParam._elWidth + "px";
            } else if(k.swipe === 'Y') {
                k.chirdH = getStyleValue(k.selfParam._elParent, 'height');
                for (var i = 0; i < k.selfParam._count; i++) {
                    k.selfParam._chirdren[i].style.height = k.selfParam._chirdH + "px";
                    k.selfParam._elHeight += k.selfParam._chirdH;
                }
                k.selfParam.el.style.height = k.selfParam._elHeight + "px";
            }
            if(k.selfParam.nav) {
                if(k.navType === 'normal') {
                    k.createNav();
                } else if(k.navType === 'num') {
                    k.createNumNav();
                }
            }
        },
        resizeLayoutNoScreen: function () {
            var k = this;
            k.methods.initDom.call(k)
            if(k.selfParam.swipe === 'X') {
                k.selfParam._elWidth = 0;
                k.selfParam._chirdren.forEach(function(ele, idx) {
                    var extW = getStyleValue(ele, 'padding-left') + getStyleValue(ele, 'padding-right') + getStyleValue(ele, 'margin-left') +getStyleValue(ele, 'margin-right');
                    k.selfParam._elWidth += (getStyleValue(ele, 'width') + extW);
                });
                k.el.style.width = k.elWidth + "px";
            } else if(k.selfParam.swipe === 'Y') {
                k.selfParam._elHeight= 0;
                k.selfParam._chirdren.forEach(function(ele, idx) {
                    k.selfParam._elHeight += getStyleValue(ele, 'height');
                });
                k.selfParam.el.style.height = k.selfParam._elHeight + "px";
            }
        },
        createNumNav: function () {
            var k = this;
            k.selfParam.numNav = k.selfParam.nav.querySelector('.cur');
            k.selfParam.nav.querySelector('.total').innerHTML = k.selfParam._count;
            k.selfParam.numNav.innerHTML = 1;
        },
        createNav: function () {
            var k = this;
            var span = null;
            k.selfParam.nav.innerHTML = '';
            for(var i = 0; i < k.selfParam._count; i++) {
                span = document.createElement('span');
                if(i == 0) {
                    span.className = "box-size on";
                    k.selfParam.nav.appendChild(span);
                } else {
                    span.className = "box-size";
                    k.selfParam.nav.appendChild(span);
                }
            }
            k.selfParam.navis = k.selfParam.nav.getElementsByTagName('span');
            k.selfParam.navis = Array.prototype.slice.call(k.selfParam.navis, 0);
        },
        automove: function() {//自动滑动到下一个item
            var k = this;
            k.selfParam._flag =  setInterval(function() {
                k.methods.next.call(k);
            }, 4e3);
        },
        clear: function() {
            var k = this;
            clearInterval(k.selfParam._flag);
            k.selfParam._flag = null;
        },
        touchstart: function(e) {
            var k = this;
            var t = touchEvent.getPoint(e);
            k.methods.clear.call(k);
            k.selfParam.move = 0;
            k.selfParam._pageX = t.x;
            k.selfParam._pageY = t.y;
            k.selfParam._fangxiang = '';
            k.selfParam._pcMoveFlag = false;
            if (window.PointerEvent || window.MSPointerEvent) {
                var sleft = k.selfParam.el.style.msTransform || k.selfParam.el.style.transform;
                k.selfParam._left = getInitPosition(sleft, "x");
                k.selfParam._top = getInitPosition(sleft, "y");
            } else {
                k.selfParam._left = getInitPosition(k.selfParam.el.style.webkitTransform, "x");
                k.selfParam._top = getInitPosition(k.selfParam.el.style.webkitTransform, "y");
            }
        },
        touchmove: function(e) {
            var k = this;
            if(k.selfParam._pcMoveFlag) {
                return;
            }
            var t = touchEvent.getPoint(e);
            var px = t.x;
            var py = t.y;
            var lenX = px - k.selfParam._pageX;
            var lenY = py - k.selfParam._pageY;
            if(k.selfParam.swipe === 'X') {
                if(Math.abs(lenY) > Math.abs(lenX)) {
                    return;
                }
                e.preventDefault();
                k.selfParam.move = lenX;
                //k.selfParam._isInertia = false;
                //if(Math.abs(lenX) <= 80) {//小于80，就会有惯性滑动
                //k.selfParam._isInertia = true;
                //}
                if(lenX > 5 ) {
                    k.selfParam._fangxiang = "left";
                } else if (lenX < -5) {
                    k.selfParam._fangxiang = 'right';
                }
               // console.log(k.selfParam._left+lenX, k.selfParam._left, lenX);
                setX(k.selfParam.el, k.selfParam._left+lenX, 0);
            } else if(k.swipe === 'Y') {
                if(Math.abs(lenY) < Math.abs(lenX)) {
                    return;
                }
                e.preventDefault();
                k.selfParam.move = lenY;
                k.selfParam._isInertia = false;
                // if(Math.abs(lenY) >= 30) {
                k.selfParam._isInertia = true;
                //}
                if(lenY > 5 ) {//top
                    k.selfParam._fangxiang = "top";
                } else if (lenY < -5) {//bottom
                    k.selfParam._fangxiang = 'bottom';
                }
                setY(k.selfParam.el, k.selfParam._top+lenY, 0);
            }
        },
        touchend: function(e) {
            var k = this;
            k.selfParam._pcMoveFlag = true;
            if(k.selfParam.isNoFullScreen){
                k.methods.setNewPositionNoScreen.call(k);
            }else{
                k.methods.setNewPosition.call(k);
            }
        },
        touchcancel: function(e) {
            var k = this;
            k.selfParam._pcMoveFlag = true;
            if(k.selfParam.isNoFullScreen){
                k.methods.setNewPositionNoScreen.call(k);
            }else{
                k.methods.setNewPosition.call(k);
            }
        },
        setNewPosition: function () {
            var k = this;

            if(k.selfParam.swipe === 'X') {
                //console.log(k.selfParam._fangxiang, k.selfParam._currentIndex);
                if(k.selfParam._fangxiang === 'left') {
                    if(k.selfParam._currentIndex === 0) {
                        setX(k.selfParam.el, 0, k.selfParam._interval);
                    } else {
                        k.methods.prev.call(k);
                    }
                } else if(k.selfParam._fangxiang === "right") {
                    if(k.selfParam._currentIndex === k.selfParam._count -1) {
                        setX(k.selfParam.el, -(k.selfParam._chirdW*(k.selfParam._count-1)), k.selfParam._interval);
                    } else {
                        k.methods.next.call(k);
                    }
                } else {
                    setX(k.selfParam.el, k.selfParam._left, 0);
                }
            } else if(k.swipe === 'Y') {
                if(k.selfParam._fangxiang === 'top') {
                    if(k.selfParam._currentIndex === 0) {
                        setY(k.selfParam.el, 0, k.selfParam._interval);
                    } else {
                        k.methods.prev.call(k);
                    }
                } else if(k.selfParam._fangxiang === "bottom") {
                    if(k.selfParam._currentIndex === k.selfParam._count -1) {
                        setY(k.selfParam.el, -(k.selfParam._chirdH*(k.selfParam._count-1)), k.selfParam._interval);
                    } else {
                        k.methods.next.call(k);
                    }
                } else {
                    setY(k.selfParam.el, k.selfParam._top, 0);
                }
            }
            k.methods.automove.call(k);
        },
        setNewPositionNoScreen: function (e) { //isNoFullScreen

            var k = this, smallest;
            if (window.PointerEvent || window.MSPointerEvent) {
                var sleft = k.selfParam.el.style.msTransform || k.selfParam.el.style.transform;
                k.left = getInitPosition(sleft, "x");
                k.top = getInitPosition(sleft, "y");
            } else {
                k.left = getInitPosition(k.selfParam.el.style.webkitTransform, "x");
                k.top = getInitPosition(k.selfParam.el.style.webkitTransform, "y");
            }
            if(k.selfParam.swipe === 'X') {
                if(k.selfParam.fangxiang === 'left') {

                    if( k.selfParam._left >=0) {
                        setX(k.selfParam.el, 0, k.selfParam._interval);
                    } else {
                        if(k.selfParam._isInertia) {
                            k.selfParam._left +=k.selfParam._inertiaLength;
                            if(k.selfParam._left >=0) {
                                setX(k.selfParam.el, 0, k.selfParam._interval);
                            } else {
                                setX(k.selfParam.el, k.selfParam._left, k.selfParam._interval);
                            }
                        }

                    }
                } else if(k.selfParam._fangxiang === "right") {
                    smallest   = -(k.selfParam._elWidth - window.innerWidth);
                    if( k.selfParam._left <= smallest) {
                        setX(k.selfParam.el, smallest, k.selfParam._interval);
                    } else {
                        if(k.selfParam._isInertia) {
                            k.selfParam._left -= k.selfParam._inertiaLength;
                            if (k.selfParam._left <= smallest) {
                                setX(k.selfParam.el, smallest, k.selfParam._interval);
                            } else {
                                setX(k.selfParam.el, k.selfParam._left, k.selfParam._interval);
                            }
                        }
                    }
                } else {
                    setX(k.selfParam.el, k.selfParam._left, 0);
                }
            } else if(k.selfParam.swipe === 'Y') {
                if(k.selfParam._fangxiang === 'top') {

                    if( k.selfParam._top >=0) {
                        setY(k.selfParam.el, 0, k.selfParam._interval);
                    }
                } else if(k.selfParam._fangxiang === "bottom") {
                    if( k.selfParam._left<= -(k.selfParam._elHeight-window.innerHeight)) {
                        setY(k.selfParam.el, -(k.selfParam._elHeight-window.innerHeight), k.selfParam._interval);
                    }

                } else {
                    setY(k.selfParam.el, k.selfParam._top, 0);
                }
            }
        },
        next: function() {
            this.methods.go.call(this, this.selfParam._currentIndex + 1);
        },
        prev: function() {
            this.methods.go.call(this, this.selfParam._currentIndex - 1);
        },
        go: function(idx) {
            var len = 0;//肯定是负值， 最大值为 0，最小值为 -((this.count - 1) * this.chirdW)
            if (idx === this.selfParam._currentIndex) {
                return;
            }
            if (idx >= this.selfParam._count) {
                idx = 0;
            }
            if (idx < 0) {
                idx = this.selfParam._count - 1;
            }
            this.selfParam._currentIndex = idx;
            if(this.selfParam.swipe === 'X') {
                len = -(idx * this.selfParam._chirdW);
                setX(this.selfParam.el, len, this.selfParam._interval);
            } else if(this.selfParam.swipe === 'Y') {
                len = -(idx * this.selfParam._chirdH);
                setY(this.selfParam.el, len, this.selfParam._interval);
            }
            if(this.selfParam.nav) {
                if( this.selfParam.navType === 'normal') {
                    this.methods.changeNavi.call(k);  //2017.3.6 xly
                } else {
                    if(this.selfParam.numNav) {
                        this.selfParam.numNav.innerHTML = (this.selfParam._currentIndex+1);
                    }
                }

            }
        },
        changeNavi: function () {
            var k = this;
            k.selfParam.navis.forEach(function(e) {
                e.className = 'box-size';
            });
            k.selfParam.navis[k.selfParam._currentIndex].className = 'box-size on';
        },
    }
})