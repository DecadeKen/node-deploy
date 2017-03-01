var $cont,
    tpl_index = require('./tpl/index.tpl');

var lock = false;
var DB = {
    ProjectInfo: {
        url: 'index/ProjectInfo.htm',
        type: 'GET'
    },
    build: {
        url: '/index/build.htm',
        type: 'GET'
    },
    rollBack: {
        url: '/index/rollBack.htm',
        type: 'GET'
    },
    deleteData: {
        url: '/index/delete.htm',
        type: 'GET'
    }
};
var buildOpt = {},
    rollBackOpt = {},
    deleteOpt = {};

var buildLock = false;



function renderHtml(data) {
    $cont.find('.js-main-content').hide();
    $cont.find('.js-main-index').show().html(tpl_index(data));
}

function bindEvent() {
    // if (lock) return;
    // lock = !lock;

    $cont.find('.js-btn-build').on('click', function() {

        username = Cache.get('userinfo');
        console.log(Cache.get('userinfo'))
        buildOpt.id = $(this).parent().attr('data-id');
        buildOpt.number = $(this).parent().attr('data-number');
        buildOpt.logName = [username, buildOpt.id, +new Date()].join('_');

        startBuild(null, function(data) {
            console.log(data.data.deployLock)
            if (data.data.deployLock) {
                alert('正在构建上传，请稍后再试');
                return;
            }
            location.href = '/#tab=log&logname=' + buildOpt.logName;
        });
    });

    $cont.find('.js-btn-rollback').on('click', function() {
        rollBackOpt.id = $(this).parent().attr('data-id');
        rollBackOpt.number = $(this).parent().attr('data-number');
        username = Cache.get('userinfo');
        rollBackOpt.logName = [username, buildOpt.id, +new Date()].join('_');
        rollBack(null, function(data) {
            location.href = '/#tab=log&logname=' + rollBackOpt.logName;
            // if (data.code == 0) {
            //     alert(data.data);
            // }

        });
    });

    $cont.find('.js-btn-delete').on('click', function() {
        deleteOpt.id = $(this).parent().attr('data-id');
        deleteData(null, function(data) {
            if (data.code == 0) {
                alert(data.data);
                window.location.reload();
            }

        });
    });
}

function deleteData(err, callback) {
    if (err) return;

    $.Ajax({
        url: DB.deleteData.url,
        type: DB.deleteData.type,
        dataType: 'json',
        data: deleteOpt,
        success: function(data) {
            callback && callback(data);
        }
    });
}

function rollBack(err, callback) {
    if (err) return;

    $.Ajax({
        url: DB.rollBack.url,
        type: DB.rollBack.type,
        dataType: 'json',
        data: rollBackOpt,
        success: function(data) {
            callback && callback(data);
        }
    });
}

function startBuild(err, callback) {
    buildLock = true;
    $.Ajax({
        url: DB.build.url,
        type: DB.build.type,
        dataType: 'json',
        data: buildOpt,
        success: function(data) {
            callback && callback(data);
        }
    });
}

function getProjectInfoData(err, callback) {
    if (err) return;
    $.Ajax({
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
    getProjectInfoData(null, function(data) {
        window.Cache.set('userinfo', data.user);
        renderHtml(data);
        bindEvent();
    });


}

return {
    init: init
};
