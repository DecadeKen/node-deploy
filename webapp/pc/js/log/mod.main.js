var $cont,
	tpl_log = require('./tpl/log.tpl');



function renderHtml(){
	$cont.find('.js-main-content').hide();
	$cont.find('.js-main-index').show().html(tpl_log());
}

function bindEvent(){


}


function init(opt) {
	$cont = opt.cont;
	renderHtml();
    bindEvent();
}

return {
	init: init
};