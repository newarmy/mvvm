// 模拟异步请求
var ajax = function (data, cb) {
    setTimeout( function () {
        cb({content: 'test tab '+ data.id})
    }, 1000)
}

module.exports = ajax;
