var $cont,
	tpl_packList = require('./tpl/packList.tpl'),
	packList;

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
			packList = data.data;
			$cont.find('.js-main-packList').show().html(tpl_packList(packList));
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
	$cont.on('click', '.js-packlist-view', function(){
		// var index = $(this).attr('data-index');
		$cont.find('.pack-log-content').html(packList.data[index].log);
		$cont.find('.index-table').hide();
		$cont.find('.pack-log').show();

		// location.href = '/#tab=logview&id=' + 

	}).on('click', '.js-packlist-back', function(){
		$cont.find('.index-table').show();
		$cont.find('.pack-log').hide();
	});

}


function init(opt) {
	$cont = opt.cont;
	renderHtml();
    bindEvent();
}

return {
	init: init
};