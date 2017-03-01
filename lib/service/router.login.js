var config = require('../config.js');
var path = require('path');
var extend = require('util')._extend;

module.exports = function(req, res, dbHandle, DB) {
    var query = extend(req.query, req.body); //get请求参数在req.query中，post请求数据保存在req.body中
    console.log(query)
    switch (req.path) {
        case '/login/submit.htm':
            // 查询
            dbHandle.getByConditions('userInfo', { userName: query.user, password: query.password }, function(err, data) {
                if (err) {
                    console.log(err);
                    req.session.login = false;
                }
                console.log(data)
                if (data.length == 0) {
                    req.session.login = false;
                    resData = {
                        code: 1,
                        data: '用户名或密码不正确'
                    };
                } else {
                    req.session.user = query.user;
                    req.session.login = true;
                    resData = {
                        code: 0,
                        data: '登陆成功'
                    };
                }
                res.send(resData);

            });
            break;

        case '/login/register.htm':
            dbHandle.getByConditions('userInfo', { userName: query.user, password: query.password }, function(err, data) {
                if (err) {
                    console.log(err);
                }
                console.log(data)
                if (!data.length == 0) {
                    resData = {
                        code: 1,
                        data: '用户已注册'
                    };
                    res.send(resData);
                } else {
                    dbHandle.insert('userInfo', { userName: query.user, password: query.password }, function(err, data) {

                        if (err) {
                            console.log(err);
                        }

                        resData = {
                            code: 0,
                            data: '注册成功'
                        };

                        res.send(resData);

                    });
                }


            });


            break;
        default:
            console.log('default');
    }

}
