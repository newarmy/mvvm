// 模拟异步请求
var ajax = function (data, cb) {
    setTimeout( function () {
        cb({dd: 'async data', cc: 'a async data'})
    }, 1000)
}

module.exports = ajax;
