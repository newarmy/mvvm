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

        if(k.isNoFullScreen){
            k.resizeLayoutNoScreen();
        }else{
            k.resizeLayout();
        }
        if(k.auto) {
            k.automove()
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
            k._elParent = k.el.parentNode;
            k._chirdren = k.el.getElementsByTagName(k.tagName);
            k._chirdren = Array.prototype.slice.call(k._chirdren, 0);
            k._count = k._chirdren.length;
        },
        resizeLayout: function () {
            var k = this;
            k.initDom(k)
            if(k.swipe === 'X') {
                k._chirdW = getStyleValue(k._elParent, 'width');
                for (var i = 0; i < k._count; i++) {
                    k._chirdren[i].style.width = k._chirdW + "px";
                    k._elWidth += k._chirdW;
                }
                k.el.style.width = k._elWidth + "px";
            } else if(k.swipe === 'Y') {
                k.chirdH = getStyleValue(k._elParent, 'height');
                for (var i = 0; i < k._count; i++) {
                    k._chirdren[i].style.height = k._chirdH + "px";
                    k._elHeight += k._chirdH;
                }
                k.el.style.height = k._elHeight + "px";
            }
            if(k.nav) {
                if(k.navType === 'normal') {
                    k.createNav();
                } else if(k.navType === 'num') {
                    k.createNumNav();
                }
            }
        },
        resizeLayoutNoScreen: function () {
            var k = this;
            k.initDom()
            if(k.swipe === 'X') {
                k._elWidth = 0;
                k._chirdren.forEach(function(ele, idx) {
                    var extW = getStyleValue(ele, 'padding-left') + getStyleValue(ele, 'padding-right') + getStyleValue(ele, 'margin-left') +getStyleValue(ele, 'margin-right');
                    k._elWidth += (getStyleValue(ele, 'width') + extW);
                });
                k.el.style.width = k.elWidth + "px";
            } else if(k.swipe === 'Y') {
                k._elHeight= 0;
                k._chirdren.forEach(function(ele, idx) {
                    k._elHeight += getStyleValue(ele, 'height');
                });
                k.el.style.height = k._elHeight + "px";
            }
        },
        createNumNav: function () {
            var k = this;
            k.numNav = k.nav.querySelector('.cur');
            k.nav.querySelector('.total').innerHTML = k._count;
            k.numNav.innerHTML = 1;
        },
        createNav: function () {
            var k = this;
            var span = null;
            k.nav.innerHTML = '';
            for(var i = 0; i < k._count; i++) {
                span = document.createElement('span');
                if(i == 0) {
                    span.className = "box-size on";
                    k.nav.appendChild(span);
                } else {
                    span.className = "box-size";
                    k.nav.appendChild(span);
                }
            }
            k.navis = k.nav.getElementsByTagName('span');
            k.navis = Array.prototype.slice.call(k.navis, 0);
        },
        automove: function() {//自动滑动到下一个item
            var k = this;
            k._flag =  setInterval(function() {
                k.next();
            }, 4e3);
        },
        clear: function() {
            var k = this;
            clearInterval(k._flag);
            k._flag = null;
        },
        touchstart: function(e) {
            var k = this;
            var t = touchEvent.getPoint(e);
            k.clear();
            k.move = 0;
            k._pageX = t.x;
            k._pageY = t.y;
            k._fangxiang = '';
            k._pcMoveFlag = false;
            if (window.PointerEvent || window.MSPointerEvent) {
                var sleft = k.el.style.msTransform || k.el.style.transform;
                k._left = getInitPosition(sleft, "x");
                k._top = getInitPosition(sleft, "y");
            } else {
                k._left = getInitPosition(k.el.style.webkitTransform, "x");
                k._top = getInitPosition(k.el.style.webkitTransform, "y");
            }
        },
        touchmove: function(e) {
            var k = this;
            if(k._pcMoveFlag) {
                return;
            }
            var t = touchEvent.getPoint(e);
            var px = t.x;
            var py = t.y;
            var lenX = px - k._pageX;
            var lenY = py - k._pageY;
            if(k.swipe === 'X') {
                if(Math.abs(lenY) > Math.abs(lenX)) {
                    return;
                }
                e.preventDefault();
                k.move = lenX;
                //k._isInertia = false;
                //if(Math.abs(lenX) <= 80) {//小于80，就会有惯性滑动
                //k._isInertia = true;
                //}
                if(lenX > 5 ) {
                    k._fangxiang = "left";
                } else if (lenX < -5) {
                    k._fangxiang = 'right';
                }
               // console.log(k._left+lenX, k._left, lenX);
                setX(k.el, k._left+lenX, 0);
            } else if(k.swipe === 'Y') {
                if(Math.abs(lenY) < Math.abs(lenX)) {
                    return;
                }
                e.preventDefault();
                k.move = lenY;
                k._isInertia = false;
                // if(Math.abs(lenY) >= 30) {
                k._isInertia = true;
                //}
                if(lenY > 5 ) {//top
                    k._fangxiang = "top";
                } else if (lenY < -5) {//bottom
                    k._fangxiang = 'bottom';
                }
                setY(k.el, k._top+lenY, 0);
            }
        },
        touchend: function(e) {
            var k = this;
            k._pcMoveFlag = true;
            if(k.isNoFullScreen){
                k.setNewPositionNoScreen();
            }else{
                k.setNewPosition();
            }
        },
        touchcancel: function(e) {
            var k = this;
            k._pcMoveFlag = true;
            if(k.isNoFullScreen){
                k.setNewPositionNoScreen();
            }else{
                k.setNewPosition();
            }
        },
        setNewPosition: function () {
            var k = this;

            if(k.swipe === 'X') {
                //console.log(k._fangxiang, k._currentIndex);
                if(k._fangxiang === 'left') {
                    if(k._currentIndex === 0) {
                        setX(k.el, 0, k._interval);
                    } else {
                        k.prev();
                    }
                } else if(k._fangxiang === "right") {
                    if(k._currentIndex === k._count -1) {
                        setX(k.el, -(k._chirdW*(k._count-1)), k._interval);
                    } else {
                        k.next();
                    }
                } else {
                    setX(k.el, k._left, 0);
                }
            } else if(k.swipe === 'Y') {
                if(k._fangxiang === 'top') {
                    if(k._currentIndex === 0) {
                        setY(k.el, 0, k._interval);
                    } else {
                        k.prev();
                    }
                } else if(k._fangxiang === "bottom") {
                    if(k._currentIndex === k._count -1) {
                        setY(k.el, -(k._chirdH*(k._count-1)), k._interval);
                    } else {
                        k.next();
                    }
                } else {
                    setY(k.el, k._top, 0);
                }
            }
            k.automove();
        },
        setNewPositionNoScreen: function (e) { //isNoFullScreen

            var k = this, smallest;
            if (window.PointerEvent || window.MSPointerEvent) {
                var sleft = k.el.style.msTransform || k.el.style.transform;
                k.left = getInitPosition(sleft, "x");
                k.top = getInitPosition(sleft, "y");
            } else {
                k.left = getInitPosition(k.el.style.webkitTransform, "x");
                k.top = getInitPosition(k.el.style.webkitTransform, "y");
            }
            if(k.swipe === 'X') {
                if(k.fangxiang === 'left') {

                    if( k._left >=0) {
                        setX(k.el, 0, k._interval);
                    } else {
                        if(k._isInertia) {
                            k._left +=k._inertiaLength;
                            if(k._left >=0) {
                                setX(k.el, 0, k._interval);
                            } else {
                                setX(k.el, k._left, k._interval);
                            }
                        }

                    }
                } else if(k._fangxiang === "right") {
                    smallest   = -(k._elWidth - window.innerWidth);
                    if( k._left <= smallest) {
                        setX(k.el, smallest, k._interval);
                    } else {
                        if(k._isInertia) {
                            k._left -= k._inertiaLength;
                            if (k._left <= smallest) {
                                setX(k.el, smallest, k._interval);
                            } else {
                                setX(k.el, k._left, k._interval);
                            }
                        }
                    }
                } else {
                    setX(k.el, k._left, 0);
                }
            } else if(k.swipe === 'Y') {
                if(k._fangxiang === 'top') {

                    if( k._top >=0) {
                        setY(k.el, 0, k._interval);
                    }
                } else if(k._fangxiang === "bottom") {
                    if( k._left<= -(k._elHeight-window.innerHeight)) {
                        setY(k.el, -(k._elHeight-window.innerHeight), k._interval);
                    }

                } else {
                    setY(k.el, k._top, 0);
                }
            }
        },
        next: function() {
            this.go(this._currentIndex + 1);
        },
        prev: function() {
            this.go(this._currentIndex - 1);
        },
        go: function(idx) {
            var len = 0;//肯定是负值， 最大值为 0，最小值为 -((this.count - 1) * this.chirdW)
            if (idx === this._currentIndex) {
                return;
            }
            if (idx >= this._count) {
                idx = 0;
            }
            if (idx < 0) {
                idx = this._count - 1;
            }
            this._currentIndex = idx;
            if(this.swipe === 'X') {
                len = -(idx * this._chirdW);
                setX(this.el, len, this._interval);
            } else if(this.swipe === 'Y') {
                len = -(idx * this._chirdH);
                setY(this.el, len, this._interval);
            }
            if(this.nav) {
                if( this.navType === 'normal') {
                    this.changeNavi();  //2017.3.6 xly
                } else {
                    if(this.numNav) {
                        this.numNav.innerHTML = (this._currentIndex+1);
                    }
                }

            }
        },
        changeNavi: function () {
            var k = this;
            k.navis.forEach(function(e) {
                e.className = 'box-size';
            });
            k.navis[k._currentIndex].className = 'box-size on';
        },
    }
})