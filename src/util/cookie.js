
/**
 * cookie
 */
let curDomain = '.sohu.com';
let Cookie = {
    set: function (n, v, e, p, d, s) {
        var t = new Date();
        e = e || 30;
        t.setTime(t.getTime()+(1000*60*e));
        document.cookie = n + "=" + escape(v) + "; expires=" + t.toGMTString() +
            ((p) ? "; path=" + p : "; path=/") +
            ((d) ? "; domain=" + d : "; domain="+curDomain) +
            ((s) ? "; secure" : "");
    },
    get: function (n) {
        var arr = document.cookie.match(new RegExp("(^| )"+n+"=([^;]*)(;|$)"));
        if (arr != null)
        {
            return unescape(arr[2]);
        }
        return null;

    },
    clear: function (n, p, d) {
        document.cookie = n + "=" +
            ((p) ? "; path=" + p : "; path=/") +
            ((d) ? "; domain=" + d : "; domain="+curDomain) +
            ";expires=Fri, 02-Jan-1970 00:00:00 GMT";
    }
};

export default Cookie;