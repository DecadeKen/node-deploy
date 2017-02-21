var $cont,
	tpl_packList = require('./tpl/packList.tpl');

var lock = false;

function renderHtml(){
	$cont.find('.js-main-content').hide();
	$cont.find('.js-main-packList').show().html(tpl_packList());
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