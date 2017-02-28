var $cont,
    tpl_log = require('./tpl/log.tpl'),
    proId, num;



function renderHtml(data){
    $cont.find('.js-main-content').hide();
    $cont.find('.js-main-logview').show().html(tpl_log(data));
}


function getLog(callback) {
    $.Ajax({
        url: '/logview/getlog.htm',
        type: 'get',
        data:{
            proId: parseInt($.bom.getHash('pro_id')),
            num: parseInt($.bom.getHash('num'))
        },
        success: function(res){
            if(res.code === 0) {
                callback && callback(res.data);
            } else {
                alert(res.message);
            }
        },
        error: function(){
        }
    });
}


function bindEvent(){


}


function init(opt) {
    $cont = opt.cont;

    getLog(function(data) {
        renderHtml(data);
    });

    bindEvent();
}

return {
    init: init
};