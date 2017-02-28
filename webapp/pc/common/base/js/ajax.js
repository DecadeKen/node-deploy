/**
 * @description 基于jquery的ajax函数封装，同一处理异常情况 依赖jquery和dialog_new插件
 默认阻止重复提交，如果需要允许重复提交可以参数配置
 * @author '陈桦'
 * @date '2016-5-14'
 *
 * @example 调用：Ajax({
		repeatable: true,
		url: 'http://xx/xxx',
		data: {user: 'chua'},
		type: 'get',
		success: function(data){
			$.dialog.alert(data);
		},
		'dataError': function(dt){//后台报告错误提示
            $.dialog.error(dt.message,{});
        },
        'error': function(jqXHR, textStatus, errorMsg) {
            console.log(errorMsg);
        }
 	});

 * @param repeatable {Boolean} 可重复提交标志，默认为false
 * @param url {String} 同$.ajax的url参数,必须
 * @param type {String} 同$.ajax的type参数,默认post
 * @param dataError {Function} 自定义的error和ajax的error不同，返回的第一个参数是后台直接返回的数据data
 * @param error {Function} ajax的error
 * @param 其他参数参考$.ajax
 */

// require('/common/module/dialog_new/dialog.js');
/*
缓存正在执行的ajax
urlArr格式：{
	'url1': {
		'_': 'req3',//没有参数的时候默认为"_"
		'dataStr11': 'req1',
		'dtaStr12': 'req2'
		},
	'url2': {
		'dataStr21': 'req4',
		'dtaStr22': 'req5'
	}
}
*/
var urlArr = {};
var guid = 0;
//监听ajax结束
$(document).on('ajaxComplete', function() {
    var reg = /^([^\?]+)((\?.+)|)$/;
    var ajaxUrl = arguments[2].url.replace(reg, '$1'), //去掉url后面的参数
        ajaxNfd = arguments[2].nfd; //自定义的ajax标志

    //删除已结束的ajax请求缓存
    if (urlArr[ajaxUrl]) {
        for (var i in urlArr[ajaxUrl]) {
            if (urlArr[ajaxUrl][i] == ajaxNfd) {
                delete urlArr[ajaxUrl][i];
                break;
            }
        }
        if ($.isEmptyObject(urlArr[ajaxUrl])) {
            delete urlArr[ajaxUrl];
        }
    }
})

function Ajax(opt) {
    if (opt.url) {
        var optError;
        //不能重复提交的ajax处理
        if (!opt.repeatable) {
            var dtStr = opt.data ? JSON.stringify(opt.data) : '_';

            //url和参数都相同的请求认为是重复提交
            if (urlArr[opt.url] && urlArr[opt.url][dtStr]) {
                return;
            }

            //缓存ajax url和data
            urlArr[opt.url] = urlArr[opt.url] || {};
            var flag = 'req' + (++guid);
            urlArr[opt.url][dtStr] = flag;
            //加一个标志，用来在ajax结束的时候用来判断
            opt.nfd = flag;
        }
        if(opt.error && typeof opt.error === 'function') {
            optError = opt.error;
            delete opt.error;
        }
        
        var options = {
                url: '',
                data: '',
                dataType: 'json',
                type: 'post',
                success: function() {},
                error: function(jqXHR, textStatus, errorMsg) {
                    console.log('error');

                    if(optError) {
                        optError.apply(this, arguments);
                    }
                },
                dataError: function(dt){
                    console.log(dt.message);
                }
            },
            succfn = opt.success,
            errfn = opt.dataError || options.dataError;//自定义的err和ajax的err不同，返回的第一个参数是后台返回的数据
        

        opt = $.extend(options, opt);

        opt.success = function(data, textStatus, jqXHR) {
            if (data.code == 0 || data.code ==  1) {
                succfn && succfn(data, textStatus, jqXHR);
            } else {
                errfn && errfn(data);
                if (data.code == 1001) window.location.href = '/login.html';
            }
        };
        $.ajax(opt);
    }

}

return Ajax;