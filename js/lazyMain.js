!function(t){function e(e){for(var n,o,i=e[0],u=e[1],a=0,s=[];a<i.length;a++)o=i[a],r[o]&&s.push(r[o][0]),r[o]=0;for(n in u)Object.prototype.hasOwnProperty.call(u,n)&&(t[n]=u[n]);for(c&&c(e);s.length;)s.shift()()}var n={},r={0:0};function o(e){if(n[e])return n[e].exports;var r=n[e]={i:e,l:!1,exports:{}};return t[e].call(r.exports,r,r.exports,o),r.l=!0,r.exports}o.e=function(t){var e=[],n=r[t];if(0!==n)if(n)e.push(n[2]);else{var i=new Promise(function(e,o){n=r[t]=[e,o]});e.push(n[2]=i);var u=document.getElementsByTagName("head")[0],a=document.createElement("script");a.charset="utf-8",a.timeout=120,o.nc&&a.setAttribute("nonce",o.nc),a.src=function(t){return o.p+""+t+".js"}(t);var c=setTimeout(function(){s({type:"timeout",target:a})},12e4);function s(e){a.onerror=a.onload=null,clearTimeout(c);var n=r[t];if(0!==n){if(n){var o=e&&("load"===e.type?"missing":e.type),i=e&&e.target&&e.target.src,u=new Error("Loading chunk "+t+" failed.\n("+o+": "+i+")");u.type=o,u.request=i,n[1](u)}r[t]=undefined}}a.onerror=a.onload=s,u.appendChild(a)}return Promise.all(e)},o.m=t,o.c=n,o.d=function(t,e,n){o.o(t,e)||Object.defineProperty(t,e,{configurable:!1,enumerable:!0,get:n})},o.r=function(t){Object.defineProperty(t,"__esModule",{value:!0})},o.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return o.d(e,"a",e),e},o.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},o.p="http://localhost:63343/mvvm/js/",o.oe=function(t){throw console.error(t),t};var i=window.webpackJsonp=window.webpackJsonp||[],u=i.push.bind(i);i.push=e,i=i.slice();for(var a=0;a<i.length;a++)e(i[a]);var c=u;o(o.s=0)}([function(t,e,n){"use strict";var r=o(n(1));function o(t){return t&&t.__esModule?t:{"default":t}}var i={"/":o(n(3))["default"],"/test":function(){return n.e(6).then(function(){var t=n(67);return"object"==typeof t&&t&&t.__esModule?t:Object.assign({},"object"==typeof t&&t,{"default":t})})},"/login":function(){return n.e(7).then(function(){var t=n(69);return"object"==typeof t&&t&&t.__esModule?t:Object.assign({},"object"==typeof t&&t,{"default":t})})}};new r["default"]({table:i})},function(t,e,n){"use strict";e.__esModule=!0;var r,o=n(2),i=(r=o)&&r.__esModule?r:{"default":r};var u=function(){function t(e){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.routeTable=e.table,this.beforeRouter=e.beforeRouter,this.router=null,this.init()}return t.prototype.init=function(){for(var t in this.router=new i["default"](this.routeTable,this.beforeRouter),this.routeTable)this.register(t,this.routeTable[t]);this.router.initEvent()},t.prototype.register=function(t,e){var n=this;n.router.route(t,function(r){"function"==typeof e?e().then(function(e){n.routeTable[t]=e,e.mounted()}):e.mounted(r)})},t.prototype.next=function(t){this.router.next(t)},t}();e["default"]=u},function(t,e,n){"use strict";e.__esModule=!0;var r=function(){function t(e,n){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.routeTable=e,this.beforeRouter=n,this.routes={},this.currentUrl="/",this.beforeUrl=""}return t.prototype.initEvent=function(){var t=this;window.addEventListener("load",function(){t.refresh.call(t)},!1),window.addEventListener("hashchange",function(){t.refresh.call(t)},!1)},t.prototype.route=function(t,e){this.routes[t]=e},t.prototype.refresh=function(){this.beforeUrl=this.currentUrl,this.currentUrl=location.hash.slice(1)||"/",this.beforeRouter?this.beforeRouter.call(this,this.currentUrl):this.goToPage()},t.prototype.setRoute=function(t,e){window.location.hash="#"+t,e&&(t===this.currentUrl?this.goToPage():this._destroyComp())},t.prototype.goBack=function(t){window.history.go(t)},t.prototype.goToPage=function(t){this._destroyComp();var e=t||this.currentUrl,n=this.parseParam(e);this.routes[e](n)},t.prototype.parseParam=function(t){var e=t.split("?");if(1===e.length)return{url:t};for(var n={},r=e[1].split("&"),o=0,i=r.length;o<i;o++){var u=r[o].split("=");n[u[0]]=u[1]}return n.url=t,n},t.prototype.next=function(t){!1===t?this.goBack(-1):t===undefined?this.goToPage():"string"==typeof t&&this.setRoute(t,!0)},t.prototype._destroyComp=function(){if(this.beforeUrl){var t=this.routeTable[this.beforeUrl];t&&t.isMounted&&t.destroy()}},t}();e["default"]=r},function(t,e,n){"use strict";e.__esModule=!0;var r=u(n(4)),o=u(n(65)),i=u(n(66));function u(t){return t&&t.__esModule?t:{"default":t}}var a=new r["default"]({template:i["default"],isDev:!0,events:{click:"show"},methods:{show:function(t){alert(t.target.innerHTML)}}}),c=new r["default"]({element:$(".box1"),childComponents:{grandSon:a},template:o["default"],isDev:!0,events:{"click p":"show"},methods:{show:function(t,e){alert(e.html())}}});e["default"]=c},function(t,e,n){"use strict";e.__esModule=!0,e["default"]=function(t){var e=i["default"].extend({init:t.init});return console.dir(e),new e({methods:t.methods,events:t.events,element:t.element,selfParam:t.selfParam,childComponents:t.childComponents,stateBus:t.stateBus,tpl:t.template,data:t.data,store:t.store,isDev:t.isDev})};var r,o=n(5),i=(r=o)&&r.__esModule?r:{"default":r}},function(t,e,n){"use strict";e.__esModule=!0;var r=h(n(6)),o=h(n(32)),i=h(n(49)),u=h(n(54)),a=h(n(57)),c=h(n(58)),s=n(59),f=n(60),l=h(n(61)),p=h(n(62)),d=h(n(63));function h(t){return t&&t.__esModule?t:{"default":t}}var v=!1,_=function(t){function e(n){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,e);var r=function(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}(this,t.call(this));return r.element=n.element,r.selfParam=n.selfParam||{},r.methods=n.methods||null,r.events=n.events||null,r.childComponents=n.childComponents||null,r.store=n.store||null,r.stateBus=n.stateBus||null,r.tpl=n.tpl||null,r.data=n.data||null,r.isMounted=!1,r._parentComp=null,r._eventArr=[],r._cackeHtml="",r._cId=(0,s.getRandomStr)("comp"),r._hasChild=!1,r._isRoot=!0,r._id=null,v=n.isDev||!1,r._prepareFunc(),r}return function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=(0,o["default"])(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(r["default"]?(0,r["default"])(t,e):t.__proto__=e)}(e,t),e.prototype._prepareFunc=function(){var t=this;t._bindProxy(),t.childComponents&&(t._hasChild=!0,t._setParentForChild()),t.element||(t.element=$("<div></div>")),v&&c["default"].log("init"),t.tpl?t._initParse():(t.init(),t._parseEvent(),t._addEventToDom())},e.prototype._bindProxy=function(){var t=this;if(t.selfParam)if(u["default"]&&i["default"]&&!p["default"].ie7()&&!p["default"].ie8())t._bindData();else for(var e in t.selfParam)t[e]=t.selfParam[e];if(t.methods)for(var n in t.methods)t[n]=(0,s.bind)(t.methods[n],t)},e.prototype._bindData=function(){var t=this;(0,i["default"])(t.selfParam).forEach(function(e){(0,u["default"])(t,e,{configurable:!0,enumerable:!0,get:function(){return t.selfParam[e]},set:function(n){t.selfParam[e]=n}})})},e.prototype._setParentForChild=function(){var t=this;for(var e in t.childComponents)t.childComponents[e]._parentComp=t,t.childComponents[e]._isRoot=!1},e.prototype.mounted=function(t){var e=this;if(e._isRoot)for(var n in e.element.append(e._cackeHtml),e.init&&e.init(t),e._addEventToDom(),v&&c["default"].log("--------add Dom to document-----------"),e.childComponents)e.childComponents[n].element=e.element.find(e.childComponents[n]._id),e.childComponents[n].store=e.store,e.childComponents[n].mounted(t);else for(var r in e.init&&e.init(),e._addEventToDom(),e.childComponents)e.childComponents[r].element=e.element.find(e.childComponents[r]._id),e.childComponents[r].store=e.store,e.childComponents[r].mounted();e.isMounted=!0},e.prototype.init=function(t){},e.prototype.setData=function(t){var e=this;if(e.data=t,e._generateHTML(),e._isRoot)e.element.html(e._cackeHtml);else{var n=$(e._cackeHtml);e.element.html(n.html())}},e.prototype._generateHTML=function(){var t=this;t.data?t._cackeHtml=t.tpl(t.data):t._cackeHtml=t.tpl({}),v&&c["default"].log("genetate html"),t._hasChild&&t._joinChildHtml()},e.prototype._joinChildHtml=function(){var t=this;v&&c["default"].log(f._childReg),t._cackeHtml=t._cackeHtml.replace(f._childReg,function(e,n){var r=t.childComponents[n],o=r._cackeHtml,i=(0,s.getRandomStr)("child").replace(".",""),u=o.match(f._childRootDomReg)[0];return u=(u=u.replace(f._idReg,"")).replace(/>$/,' id="'+i+'">'),r._id="#"+i,o=o.replace(f._childRootDomReg,u)})},e.prototype.destroy=function(){var t=this;for(var e in t.removeEvents(),t.isMounted=!1,t.childComponents)t.childComponents[e].removeEvents(),t.childComponents[e].element=null;t.element.html("")},e.prototype.removeEvents=function(){var t=this,e=void 0,n=t._eventArr.length;if(0!==n){for(var r=0;r<n;r++)e=t._eventArr[r],t.element.off(e[0]);v&&c["default"].log("remove Event")}},e.prototype._initParse=function(){var t=this;t._parseTpl(),t._isEventParsed||(t._isEventParsed=!0,t._parseEvent()),t._generateHTML()},e.prototype._parseTpl=function(){var t=this;t.tpl=a["default"].parse(t._filterSpecialLetter(t.tpl)),v&&c["default"].log("parse template")},e.prototype._filterSpecialLetter=function(t){return t=t.replace(/(\n+)|(\r+)|(\n*\r*)|(\u000A|\u000D|\u2028|\u2029)*/g,"")},e.prototype._parseEvent=function(){var t=this,e=/\s+/,n=/(^\s*)|(\s*$)/g,r=[];if(t.events){for(var o in t.events)(r=(o=o.replace(n,"")).split(e)).push(t.events[o]),t._eventArr.push(r);v&&c["default"].log("parse Event")}},e.prototype._addEventToDom=function(){for(var t=this,e=0,n=t._eventArr.length;e<n;e++){var r=t._eventArr[e];2===r.length?function(e){t.element.on(e[0],function(n){t.methods[e[1]].call(t,n)})}(r):function(e){t.element.on(e[0],e[1],function(n){var r=$(this);t.methods[e[2]].call(t,n,r)})}(r)}v&&c["default"].log("add Event")},e.extend=function(t,e){return d["default"].call(this,t,e)},e}(l["default"]);e["default"]=_},function(t,e,n){t.exports={"default":n(7),__esModule:!0}},function(t,e,n){n(8),t.exports=n(11).Object.setPrototypeOf},function(t,e,n){var r=n(9);r(r.S,"Object",{setPrototypeOf:n(25).set})},function(t,e,n){var r=n(10),o=n(11),i=n(12),u=n(14),a=n(24),c=function(t,e,n){var s,f,l,p=t&c.F,d=t&c.G,h=t&c.S,v=t&c.P,_=t&c.B,m=t&c.W,y=d?o:o[e]||(o[e]={}),g=y.prototype,b=d?r:h?r[e]:(r[e]||{}).prototype;for(s in d&&(n=e),n)(f=!p&&b&&b[s]!==undefined)&&a(y,s)||(l=f?b[s]:n[s],y[s]=d&&"function"!=typeof b[s]?n[s]:_&&f?i(l,r):m&&b[s]==l?function(t){var e=function(e,n,r){if(this instanceof t){switch(arguments.length){case 0:return new t;case 1:return new t(e);case 2:return new t(e,n)}return new t(e,n,r)}return t.apply(this,arguments)};return e.prototype=t.prototype,e}(l):v&&"function"==typeof l?i(Function.call,l):l,v&&((y.virtual||(y.virtual={}))[s]=l,t&c.R&&g&&!g[s]&&u(g,s,l)))};c.F=1,c.G=2,c.S=4,c.P=8,c.B=16,c.W=32,c.U=64,c.R=128,t.exports=c},function(t,e){var n=t.exports="undefined"!=typeof window&&window.Math==Math?window:"undefined"!=typeof self&&self.Math==Math?self:Function("return this")();"number"==typeof __g&&(__g=n)},function(t,e){var n=t.exports={version:"2.5.6"};"number"==typeof __e&&(__e=n)},function(t,e,n){var r=n(13);t.exports=function(t,e,n){if(r(t),e===undefined)return t;switch(n){case 1:return function(n){return t.call(e,n)};case 2:return function(n,r){return t.call(e,n,r)};case 3:return function(n,r,o){return t.call(e,n,r,o)}}return function(){return t.apply(e,arguments)}}},function(t,e){t.exports=function(t){if("function"!=typeof t)throw TypeError(t+" is not a function!");return t}},function(t,e,n){var r=n(15),o=n(23);t.exports=n(19)?function(t,e,n){return r.f(t,e,o(1,n))}:function(t,e,n){return t[e]=n,t}},function(t,e,n){var r=n(16),o=n(18),i=n(22),u=Object.defineProperty;e.f=n(19)?Object.defineProperty:function(t,e,n){if(r(t),e=i(e,!0),r(n),o)try{return u(t,e,n)}catch(a){}if("get"in n||"set"in n)throw TypeError("Accessors not supported!");return"value"in n&&(t[e]=n.value),t}},function(t,e,n){var r=n(17);t.exports=function(t){if(!r(t))throw TypeError(t+" is not an object!");return t}},function(t,e){t.exports=function(t){return"object"==typeof t?null!==t:"function"==typeof t}},function(t,e,n){t.exports=!n(19)&&!n(20)(function(){return 7!=Object.defineProperty(n(21)("div"),"a",{get:function(){return 7}}).a})},function(t,e,n){t.exports=!n(20)(function(){return 7!=Object.defineProperty({},"a",{get:function(){return 7}}).a})},function(t,e){t.exports=function(t){try{return!!t()}catch(e){return!0}}},function(t,e,n){var r=n(17),o=n(10).document,i=r(o)&&r(o.createElement);t.exports=function(t){return i?o.createElement(t):{}}},function(t,e,n){var r=n(17);t.exports=function(t,e){if(!r(t))return t;var n,o;if(e&&"function"==typeof(n=t.toString)&&!r(o=n.call(t)))return o;if("function"==typeof(n=t.valueOf)&&!r(o=n.call(t)))return o;if(!e&&"function"==typeof(n=t.toString)&&!r(o=n.call(t)))return o;throw TypeError("Can't convert object to primitive value")}},function(t,e){t.exports=function(t,e){return{enumerable:!(1&t),configurable:!(2&t),writable:!(4&t),value:e}}},function(t,e){var n={}.hasOwnProperty;t.exports=function(t,e){return n.call(t,e)}},function(t,e,n){var r=n(17),o=n(16),i=function(t,e){if(o(t),!r(e)&&null!==e)throw TypeError(e+": can't set as prototype!")};t.exports={set:Object.setPrototypeOf||("__proto__"in{}?function(t,e,r){try{(r=n(12)(Function.call,n(26).f(Object.prototype,"__proto__").set,2))(t,[]),e=!(t instanceof Array)}catch(o){e=!0}return function(t,n){return i(t,n),e?t.__proto__=n:r(t,n),t}}({},!1):undefined),check:i}},function(t,e,n){var r=n(27),o=n(23),i=n(28),u=n(22),a=n(24),c=n(18),s=Object.getOwnPropertyDescriptor;e.f=n(19)?s:function(t,e){if(t=i(t),e=u(e,!0),c)try{return s(t,e)}catch(n){}if(a(t,e))return o(!r.f.call(t,e),t[e])}},function(t,e){e.f={}.propertyIsEnumerable},function(t,e,n){var r=n(29),o=n(31);t.exports=function(t){return r(o(t))}},function(t,e,n){var r=n(30);t.exports=Object("z").propertyIsEnumerable(0)?Object:function(t){return"String"==r(t)?t.split(""):Object(t)}},function(t,e){var n={}.toString;t.exports=function(t){return n.call(t).slice(8,-1)}},function(t,e){t.exports=function(t){if(t==undefined)throw TypeError("Can't call method on  "+t);return t}},function(t,e,n){t.exports={"default":n(33),__esModule:!0}},function(t,e,n){n(34);var r=n(11).Object;t.exports=function(t,e){return r.create(t,e)}},function(t,e,n){var r=n(9);r(r.S,"Object",{create:n(35)})},function(t,e,n){var r=n(16),o=n(36),i=n(47),u=n(43)("IE_PROTO"),a=function(){},c=function(){var t,e=n(21)("iframe"),r=i.length;for(e.style.display="none",n(48).appendChild(e),e.src="javascript:",(t=e.contentWindow.document).open(),t.write("<script>document.F=Object<\/script>"),t.close(),c=t.F;r--;)delete c.prototype[i[r]];return c()};t.exports=Object.create||function(t,e){var n;return null!==t?(a.prototype=r(t),n=new a,a.prototype=null,n[u]=t):n=c(),e===undefined?n:o(n,e)}},function(t,e,n){var r=n(15),o=n(16),i=n(37);t.exports=n(19)?Object.defineProperties:function(t,e){o(t);for(var n,u=i(e),a=u.length,c=0;a>c;)r.f(t,n=u[c++],e[n]);return t}},function(t,e,n){var r=n(38),o=n(47);t.exports=Object.keys||function(t){return r(t,o)}},function(t,e,n){var r=n(24),o=n(28),i=n(39)(!1),u=n(43)("IE_PROTO");t.exports=function(t,e){var n,a=o(t),c=0,s=[];for(n in a)n!=u&&r(a,n)&&s.push(n);for(;e.length>c;)r(a,n=e[c++])&&(~i(s,n)||s.push(n));return s}},function(t,e,n){var r=n(28),o=n(40),i=n(42);t.exports=function(t){return function(e,n,u){var a,c=r(e),s=o(c.length),f=i(u,s);if(t&&n!=n){for(;s>f;)if((a=c[f++])!=a)return!0}else for(;s>f;f++)if((t||f in c)&&c[f]===n)return t||f||0;return!t&&-1}}},function(t,e,n){var r=n(41),o=Math.min;t.exports=function(t){return t>0?o(r(t),9007199254740991):0}},function(t,e){var n=Math.ceil,r=Math.floor;t.exports=function(t){return isNaN(t=+t)?0:(t>0?r:n)(t)}},function(t,e,n){var r=n(41),o=Math.max,i=Math.min;t.exports=function(t,e){return(t=r(t))<0?o(t+e,0):i(t,e)}},function(t,e,n){var r=n(44)("keys"),o=n(46);t.exports=function(t){return r[t]||(r[t]=o(t))}},function(t,e,n){var r=n(11),o=n(10),i=o["__core-js_shared__"]||(o["__core-js_shared__"]={});(t.exports=function(t,e){return i[t]||(i[t]=e!==undefined?e:{})})("versions",[]).push({version:r.version,mode:n(45)?"pure":"global",copyright:"© 2018 Denis Pushkarev (zloirock.ru)"})},function(t,e){t.exports=!0},function(t,e){var n=0,r=Math.random();t.exports=function(t){return"Symbol(".concat(t===undefined?"":t,")_",(++n+r).toString(36))}},function(t,e){t.exports="constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf".split(",")},function(t,e,n){var r=n(10).document;t.exports=r&&r.documentElement},function(t,e,n){t.exports={"default":n(50),__esModule:!0}},function(t,e,n){n(51),t.exports=n(11).Object.keys},function(t,e,n){var r=n(52),o=n(37);n(53)("keys",function(){return function(t){return o(r(t))}})},function(t,e,n){var r=n(31);t.exports=function(t){return Object(r(t))}},function(t,e,n){var r=n(9),o=n(11),i=n(20);t.exports=function(t,e){var n=(o.Object||{})[t]||Object[t],u={};u[t]=e(n),r(r.S+r.F*i(function(){n(1)}),"Object",u)}},function(t,e,n){t.exports={"default":n(55),__esModule:!0}},function(t,e,n){n(56);var r=n(11).Object;t.exports=function(t,e,n){return r.defineProperty(t,e,n)}},function(t,e,n){var r=n(9);r(r.S+r.F*!n(19),"Object",{defineProperty:n(15).f})},function(t,e,n){"use strict";e.__esModule=!0,e["default"]={startTag:"<%",endTag:"%>",parse:function(t){var e=/^=(.+)/,n=t.split(this.startTag),r=void 0,o=void 0,i=void 0,u=n.length;if(1===n.length)return i="var str= '"+t+"'; return str;",new Function("data",i);i=' var str = ""; var __count = 0; for(var key in data) {__count++;} if(__count === 0) {return str;} with(data) {';for(var a=0;a<u;a++)1===(r=n[a].split(this.endTag)).length?i+="str+='"+r[0]+"';":(o=r[0].match(e))&&2===o.length?(i+="str+="+o[1]+";",i+="str+='"+r[1]+"';"):(i+=r[0],i+="str+='"+r[1]+"';");return i+="} return str;",new Function("data",i)}}},function(t,e,n){"use strict";e.__esModule=!0;var r=function(){},o=window.console?window.console:{log:r,error:r},i={log:o.log,error:o.error};e["default"]=i},function(t,e,n){"use strict";e.__esModule=!0,e.getRandomStr=function(t){return t+"_"+String((new Date).getTime()*Math.random()).substr(0,13)},e.bind=function(t,e){return function(n){var r=arguments.length;return r?r>1?t.apply(e,arguments):t.call(e,n):t.call(e)}}},function(t,e,n){"use strict";e.__esModule=!0;e._childReg=/\{\{([^\{\}]*)\}\}/g,e._childRootDomReg=/^<([a-z/][-a-z0-9_:.]*)[^>/]*>/,e._idReg=/id=[^\s>]*/},function(t,e,n){"use strict";e.__esModule=!0;var r=function(){function t(){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this._events_={}}return t.prototype.on=function(t,e,n){n=n||this,this._events_[t]?this._events_[t].push({cb:e,thisArg:n}):(this._events_[t]=[],this._events_[t].push({cb:e,thisArg:n}))},t.prototype.off=function(t,e){this._events_[t]&&(this._events_[t]=[])},t.prototype.trigger=function(t,e){var n=this._events_[t];if(n)for(var r=n.length,o=0;o<r;o++){var i=n[o].cb,u=n[o].thisArg;i.call(u,e)}},t}();e["default"]=r},function(t,e,n){"use strict";e.__esModule=!0;var r=navigator.userAgent;e["default"]={ie8:function(){return r.indexOf("MSIE 8.0")>-1},ie7:function(){return r.indexOf("MSIE 7.0")>-1}}},function(t,e,n){"use strict";e.__esModule=!0,e["default"]=function(t,e){var n=this,r=void 0;r=t&&Object.prototype.hasOwnProperty.call(t,"constructor")?t.prototype.constructor:function(){return n.apply(this,arguments)},(0,i["default"])(r,n,e);var o=function(){this.constructor=r};return o.prototype=n.prototype,r.prototype=new o,t&&(0,i["default"])(r.prototype,t),r};var r,o=n(64),i=(r=o)&&r.__esModule?r:{"default":r}},function(t,e,n){"use strict";e.__esModule=!0,e["default"]=function(t){var e=arguments.length,n=void 0;if(!t)return null;if(e<2)return t;for(var r=1;r<e;r++)for(var o in n=arguments[r])t[o]=n[o];return t}},function(t,e){t.exports='<div class="d">\r\n    第一子组件\r\n    {{grandSon}}\r\n    <p>测试</p>\r\n</div>'},function(t,e){t.exports="<div>\r\n    第一孙子组件\r\n</div>"}]);