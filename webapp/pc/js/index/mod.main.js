var $cont,
	tpl_index = require('./tpl/index.tpl');

var lock = false;
console.log(new Date().Format);
var DB = {
	// indexBuild: {	
	// 	url: '/index/build.htm',
	// 	type: 'GET'
	// },
	ProjectInfo: {
		url: 'index/ProjectInfo.htm',
		type: 'GET'
	}
};

function renderHtml(data){
	$cont.find('.js-main-content').hide();
	$cont.find('.js-main-index').show().html(tpl_index({data: data}));
}

function bindEvent(){
	if (lock) return;
	lock = !lock;

	$cont.find('.js-btn-build').on('click', function(){
		getIndexBuildData(null, function(data) {
			console.log(data);
		});
	});

}

function getIndexBuildData(err, callback) {
	if (err) return;
	$.ajax({
        url: DB.indexBuild.url,
        type: DB.indexBuild.type,
        dataType: 'json',
        success: function(data) {
            callback && callback(data);
        }
    });
}

function getProjectInfoData(err, callback) {
	if (err) return;
	$.ajax({
        url: DB.ProjectInfo.url,
        type: DB.ProjectInfo.type,
        dataType: 'json',
        success: function(data) {
            callback && callback(data);
        }
    });
}

function init(opt) {
	$cont = opt.cont;
	getProjectInfoData(null, function(data){
		console.log(data)
		renderHtml(data);
	});
	
    bindEvent();
    // console.log((new Date()).Format("yyyy年MM月d日 h时m分s秒"))
}

return {
	init: init
};