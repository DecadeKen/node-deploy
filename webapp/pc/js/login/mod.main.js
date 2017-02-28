require('/common/common.js');

var DB = {
    login: {
        url: '/login/submit.htm',
        type: 'POST'
    },
    register: {
        url: '/login/register.htm',
        type: 'POST'
    }
};

function renderHtml() {
    $cont.html(tpl_container());
    $cont.find('.js-deploy-aside').html(tpl_aside());
    $cont.find('.js-deploy-main').html(tpl_main());
}

function bindEvent() {
    $('.js-btn-login').on('click', function() {
        var loginOpt = {
            user: $('[name=user]').val(),
            password: $('[name=password]').val()
        };
        login(loginOpt, function(data) {
            if (!data.code == 0) {
                alert(data.data)
            } else {

                window.location.href = '/';

            }
        });
    });
    $('.js-btn-register').on('click', function() {
        var registerOpt = {
            user: $('[name=user]').val(),
            password: $('[name=password]').val()
        };
        register(registerOpt, function(data) {

            alert(data.data);

        });
    });
}

function login(loginOpt, callback) {
    $.Ajax({
        url: DB.login.url,
        type: DB.login.type,
        dataType: 'json',
        data: loginOpt,
        success: function(data) {
            callback && callback(data);
        }
    });
}

function register(registerOpt, callback) {
    $.Ajax({
        url: DB.register.url,
        type: DB.register.type,
        dataType: 'json',
        data: registerOpt,
        success: function(data) {
            callback && callback(data);
        }
    });
}


function init() {

    bindEvent();
}

return {
    init: init
};
