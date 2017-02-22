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
    }
};
var buildOpt= {};

var buildLock = false;


require('/common/base/js/date.js');

function renderHtml(data) {
    $cont.find('.js-main-content').hide();
    $cont.find('.js-main-index').show().html(tpl_index(data));
}

function bindEvent() {
    // if (lock) return;
    // lock = !lock;

    $cont.find('.js-btn-build').on('click', function() {
        username = Cache.get('userinfo').name;
    	buildOpt.id = $(this).parent().attr('data-id');
    	buildOpt.number = $(this).parent().attr('data-number');
        buildOpt.logName = [username, buildOpt.id, +new Date()].join('_');
        startBuild(null, function(data) {
            location.href = '/#tab=log&logname=' + buildOpt.logName;
        });
    });

}

function startBuild(err, callback) {
    if (err) return;
    if (buildLock) {
        alert('正在构建上传，请稍后再试')
    }
    buildLock = true;
    $.ajax({
        url: DB.build.url,
        type: DB.build.type,
        dataType: 'json',
        data: buildOpt,
        success: function(data) {
            callback && callback(data);
            buildLock = false;
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
    getProjectInfoData(null, function(data) {
        renderHtml(data);
        bindEvent();
    });

    
}

return {
    init: init
};
