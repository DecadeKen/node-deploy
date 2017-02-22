var express = require('express');
var path = require('path');
var app = express();
var async = require('async');
// var router = require('./router.js');
// var proxy = require('http-proxy').createProxyServer({});
var fs = require('fs');
var dbHandle = require('../storage/dbHandle.js');
var DB = require("../storage/initdb.js");
var config = require('../config.js');


app.use(express.static(path.resolve(__dirname, '../../webapp/pc-dev/')));



// 首页表格信息
app.get('/index/ProjectInfo.htm', function(req, res, next) {
    // 查询
    dbHandle.getByConditions('buildList', {
        'number': 0
    }, function(err, data) {
        var resData = {};
        if (err) {
            resData = {
                code: 1,
                data: 'error'
            };
        } else {
            resData = {
                code: 0,
                data: data
            };

        }
        res.send(resData);
    });

});


// 新建打包项目信息
app.get('/index/newPackInfo.htm', function(req, res, next) {

    // 查询
    dbHandle.getByConditions('buildInfo', {}, function(err, data) {
        var id = dbHandle.findMax(data) + 1;
        req.query.id = id;

        async.parallel([function(callback) {

            // 插入信息到打包配置表
            dbHandle.insert('buildInfo', req.query, function(err, data) {
                callback(err, data);
            });
        }, function(callback) {
            buildListObj = {
                id: req.query.id, //项目id，和buildInfoSchema的id相同
                name: req.query.name, //打包项目名称
                number: 0, //项目打包序号
                date: new Date(), //日期
                status: '', //状态
                finishTime: 0,
                log: '' //日志
            };

            // 插入信息到打包列表表
            dbHandle.insert('buildList', buildListObj, function(err, data) {
                callback(err, data);
            });
        }], function(err, result) {
            var resData = {};
            if (err) {
                resData = {
                    code: 1,
                    data: 'error'
                };

            } else {
                resData = {
                    code: 0,
                    data: '保存成功'
                };

            }
            res.send(resData);
        });

    });


});


//打包构建
app.get('/index/build.htm', function(req, res, next) {
    // svn拉取
    console.log(req.query);
    var svnCheckout = require('../svnCheckout')(DB);
    svnCheckout.checkout(req.query.id, function(dirFileName, log) {
        // console.log("dirFileName = " + dirFileName);
        console.log("log = " + log);


        // fis打包
        var fisBuild = require('../build.js').fisBuild;

        dbHandle.getByConditions('buildInfo', {
            id: req.query.id
        }, function(err, data) {
            var fisOpt = {
                fisMedia: data[0].fisMedia,
                workSpace: config.workSpace,
                dirFileName: dirFileName,

            };
            console.log(fisOpt)

            fisBuild(fisOpt, 'h5', function() {
                fisBuild(fisOpt, 'pc', function() {
                    //上传文件
                    var deploy = require('../deploy.js').init;
                    var serverId = data[0].serverId;
                    var serverConfig = config.server[serverId];
                    serverConfig.uploadOpt.localDir = path.resolve(serverConfig.uploadOpt.localDir , dirFileName + '/static');
                    serverConfig.uploadOpt.remoteDir = path.resolve(serverConfig.uploadOpt.remoteDir , dirFileName + '/static');
                    console.log(serverConfig.uploadOpt)
                    deploy(serverConfig, serverConfig.uploadOpt);
                });

            });
        });



    });

});




app.listen(3000, function() {
    console.log('listen on 3000');
});
