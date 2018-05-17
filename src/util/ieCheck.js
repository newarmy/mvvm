var ua = navigator.userAgent;
export default {
    ie8: function () {
        var res = ua.indexOf('MSIE 8.0') > -1 ? true : false;
        return res;
    },
    ie7: function () {
        var res = ua.indexOf('MSIE 7.0') > -1 ? true : false;
        return res;
    }
};