
/**
* 请求模块
*/

module.exports = function (opt) {
	var options = {
		url: opt.url,
		dataType : opt.dataType || 'json',
		data: opt.data || {},
		context: opt.context || true,
		type: opt.method || "GET",
		success:function(data, stateText, jqXHR){
			opt.success(data, stateText, jqXHR, this);
		},
		error:function(jqXHR, textStatus, errorThrow){
			opt.error && opt.error(jqXHR, textStatus, errorThrow, this);
		}
	};
	if(opt.jsonp) {
		options.jsonp = opt.jsonp;
	}
	if(opt.jsonpCallback) {
		options.jsonpCallback = opt.jsonpCallback;
	}

	$.ajax(options);	
};
