var $cont,
	tpl_packList = require('./tpl/packList.tpl');

var lock = false;

function renderHtml(){
	$cont.find('.js-main-content').hide();
	$.ajax({
		url: '/packList/packList.htm',
		type: 'get',
		data:{
			page: -1,//不分页
			pageSize: 10
		},
		success: function(data){
			$cont.find('.js-main-packList').show().html(tpl_packList(data.data));
		},
		error: function(){
			alert("没有构建历史");
			console.log('获取构建历史列表错误');
		}
	});
	
}

function bindEvent(){
	// if (lock) return;
	// lock = !lock;
	

}


function init(opt) {
	$cont = opt.cont;
	renderHtml();
    bindEvent();
}

return {
	init: init
};