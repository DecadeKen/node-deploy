var $cont,
    tpl_newPack = require('./tpl/newPack.tpl');

var lock = false;

var DB = {

    newPackInfo: {
        url: '/newPack/newPackInfo.htm',
        type: 'GET'
    }
};

var config = require('/config.js');

var newPackOpt = {};


function renderHtml() {
    $cont.find('.js-main-content').hide();
    $cont.find('.js-main-newPack').show().html(tpl_newPack(config));
}

function bindEvent() {
    // if (lock) return;
    // lock = !lock;

    $cont.find('.newPack-save-btn').on('click', 'button', function() {
        if (checkSaveBtn()) {
            SendNewPackInfoData(null, function() {
                alert('项目新建成功');
            });
        } else {
            alert('请输入完整信息');
        }


    });
}

function SendNewPackInfoData(err, callback) {
    if (err) return;
    $.ajax({
        url: DB.newPackInfo.url,
        type: DB.newPackInfo.type,
        dataType: 'json',
        data: newPackOpt,
        success: function(data) {
            callback && callback(data);
        }
    });
}

function checkSaveBtn() {
    var isSave = true;
    newPackOpt = {
        name: $cont.find('[name=projectName]').val(),
        svnUrl: config.svnUrl[$cont.find('[name=svnUrl]').val()],
        fisMedia: $cont.find('[name=fisMedia]').val(),
        serverId: $cont.find('[name=serverId]').val()
    };

    for (index in newPackOpt) {
        if (!newPackOpt[index]) {
            isSave = false;
        }

    }
    return isSave;
}


function init(opt) {
    $cont = opt.cont;
    renderHtml();
    bindEvent();
}

return {
    init: init
};
