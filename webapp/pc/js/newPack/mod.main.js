var $cont,
    tpl_newPack = require('./tpl/newPack.tpl');

var lock = false;

function renderHtml() {
    $cont.find('.js-main-content').hide();
    $cont.find('.js-main-newPack').show().html(tpl_newPack());
}

function bindEvent() {
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
