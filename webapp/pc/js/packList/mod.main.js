var $cont,
	tpl_index = require('./tpl/index.tpl');

var lock = false;

function renderHtml(){
	$cont.find('.js-main-content').hide();
	$cont.find('.js-main-index').show().html(tpl_index());
}

function bindEvent(){
	if (lock) return;
	lock = !lock;

}


function init(opt) {
	$cont = opt.cont;
	renderHtml();
    bindEvent();
}

return {
	init: init
};