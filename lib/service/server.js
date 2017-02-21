var express = require('express');
var path = require('path');
var app = express();
var async = require('async');
// var router = require('./router.js');
// var proxy = require('http-proxy').createProxyServer({});
var fs = require('fs');
var dbHandle = require('../storage/dbHandle.js');
var DB = require("../storage/initdb.js");


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
    // 数量查询，用于加id
    dbHandle.getCountByConditions('buildInfo', {}, function(num) {
        req.query.id = ++num;
        console.log(num)

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
    // // svn拉取
    // console.log(req.query);
    // var svnCheckout = require('../svnCheckout')(DB);
    // svnCheckout.checkout(1, function(dirFileName, log) {
    //     console.log("dirFileName = " + dirFileName);
    //     console.log("log = " + log);
    // });

    // fis打包
    // var fisbuild = require('../build.js').fisBuild;
    var fisOpt = {};
    dbHandle.getByConditions('buildList', {
        'id': 1
    }, function(err, data) {
        fisOpt.workSpace = '/Users/ken/workSpace/p2p/preRelease/';
        fisOpt.fisMedia = 'dev';
        fisOpt.env = 'pc';

        // fisbuild(fisOpt);

        var fork = require('child_process').fork;
        var fisbuild = fork('../build.js');
    });



});




app.listen(3000, function() {
    console.log('listen on 3000');
});
