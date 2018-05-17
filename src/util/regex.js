// 正则
export let _childReg = /\{\{([^\{\}]*)\}\}/g; //匹配子组件在父组件模板的占位符。
export let _childRootDomReg =/^<([a-z/][-a-z0-9_:.]*)[^>/]*>/; //子组件模板字符串首个tag的开始标签
export let _idReg = /id=[^\s>]*/;