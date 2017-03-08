
/**
* 请求模块
*/

module.exports = function (opt) {
	var options = {
		url: opt.url,
		dataType : opt.dataType || 'json',
		data: opt.data || {},
		type: opt.method || "GET",
		success:function(data){
			opt.success(data);
		},
		error:function(){
			opt.error();
		}
	};
	if(opt.jsonp) {
		options.jsonp = opt.jsonp;
	}
	if(opt.jsonpCallback) {
		opt.jsonpCallback = opt.jsonpCallback;
	}
	$.ajax(options);	
};
