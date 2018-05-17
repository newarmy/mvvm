
export function getRandomStr(str) {
    return str+'_'+String((new Date()).getTime()*Math.random()).substr(0,13);
}
export function bind (fn, ctx) {
    return function (a) {
        let len = arguments.length
        return len
            ? len > 1
                ? fn.apply(ctx, arguments)
                : fn.call(ctx, a)
            : fn.call(ctx)
    }
}