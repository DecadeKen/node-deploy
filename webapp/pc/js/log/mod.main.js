var $cont,
	tpl_log = require('./tpl/log.tpl'),
    logname;



function renderHtml(){
	$cont.find('.js-main-content').hide();
	$cont.find('.js-main-index').show().html(tpl_log());
}

function getLog() {
    var ws = new WebSocket('ws://localhost:5000/log?logname=' + logname),
        $log = $('.js-log-content');

    ws.onmessage = function(data) {
        $log.append(data.data);
    };
}

function bindEvent(){


}


function init(opt) {
    logname = $.bom.getHash('logname');

	$cont = opt.cont;
	renderHtml();
    bindEvent();
    getLog();
}

return {
	init: init
};