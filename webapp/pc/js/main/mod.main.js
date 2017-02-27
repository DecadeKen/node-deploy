var $cont = $('.js-deploy-container'),
    tpl_aside = require('./tpl/aside.tpl'),
    tpl_container = require('./tpl/container.tpl'),
    tpl_main = require('./tpl/main.tpl');

require('/common/common.js');

var lock = false,
    hash = '';

function renderHtml() {
    $cont.html(tpl_container());
    $cont.find('.js-deploy-aside').html(tpl_aside());
    $cont.find('.js-deploy-main').html(tpl_main());
}

function bindEvent() {
}

function initHash() {
    hash = $.bom.getHash('tab') || 'index';
    $cont.find('.js-deploy-aside').find('[data-tab]').removeClass('active');
    $cont.find('.js-deploy-aside').find('[data-tab=' + hash + ' ]').addClass('active');

}


function initMod() {
    switch (hash) {
        case 'index':
            require.async('/js/index/mod.main.js', function(mod) {
                mod.init({ cont: $cont.find('.js-deploy-main') });
            });
            break;
        case 'log':
            require.async('/js/log/mod.main.js', function(mod) {
                mod.init({ cont: $cont.find('.js-deploy-main') });
            });
            break;
        case 'logview':
            require.async('/js/logview/mod.main.js', function(mod) {
                mod.init({ cont: $cont.find('.js-deploy-main') });
            });
            break;
        case 'packList':
            require.async('/js/packList/mod.main.js', function(mod) {
                mod.init({ cont: $cont.find('.js-deploy-main') });
            });
            break;
        case 'newPack':
            require.async('/js/newPack/mod.main.js', function(mod) {
                mod.init({ cont: $cont.find('.js-deploy-main') });
            });
            break;
    }
}

window.onhashchange = function() {
    initHash();
    initMod();
};


function init() {
    renderHtml();
    initHash();
    initMod();
    bindEvent();
}

return {
    init: init
};
