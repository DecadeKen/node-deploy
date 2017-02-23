var path = require('path');
var fs = require('fs');

var config = require('../config.js');
var cLog = require('../cLog.js');
var gEvent = require('../event.js');

var deployLock = false;
var localDirLock = false;

module.exports = function(req, res, dbHandle, DB) {

    switch (req.path) {
        case '/index/ProjectInfo.htm':
            var resData = [],
                resDataIndex = 0;

            // 查询首页表格
            dbHandle.getByConditions('buildInfo', {}, function(err, data) {
                if (err) {
                    console.log(err);
                }
                findnumMaxData(data, function() {
                    resData = {
                        code: 0,
                        data: resData
                    };
                    res.send(resData);
                })

                function findnumMaxData(infoArr, callback) {

                    var infoData = infoArr.shift();
                    if (infoData) {
                        dbHandle.getByConditions('buildList', {
                            id: infoData.id
                        }, function(err, data) {

                            if (err) {
                                console.log(err);
                            }
                            var number = dbHandle.findMax(data, 'number');
                            resData.push(data[number]);

                            findnumMaxData(infoArr, callback);

                        });
                    } else {
                        callback && callback();
                    }

                }


            });

            // dbHandle.getByConditions('buildList', {
            //     'number': 0
            // }, function(err, data) {
            //     var resData = {};
            //     if (err) {
            //         resData = {
            //             code: 1,
            //             data: 'error'
            //         };
            //     } else {
            //         resData = {
            //             code: 0,
            //             data: data
            //         };

            //     }
            //     res.send(resData);
            // });
            break;
        case '/index/build.htm': //打包构建
            if (deployLock) {
                break;
            }
            deployLock = true;
            // svn拉取
            console.log(req.query);
            var logname = req.query.logName;
            var finishTime = 0;

            /*var logFile = cLog.generateLog(req.query.logName),
                logFileFd = fs.openSync(logFile, 'a+');*/

            cLog.logs[logname] = {
                content: '',
                appendC: ''
            };

            //计时
            var countTime = setInterval(function() {
                finishTime++;
            }, 1000);
            var svnCheckout = require('../svnCheckout')(DB);
            svnCheckout.checkout(req.query.id, logname, function(dirFileName, log) {
                // fis打包
                var fisBuild = require('../build.js').fisBuild;

                console.log('------fis start');
                dbHandle.getByConditions('buildInfo', {
                    id: req.query.id
                }, function(err, data) {
                    var fisOpt = {
                        fisMedia: data[0].fisMedia,
                        workSpace: config.workSpace,
                        dirFileName: dirFileName,
                    };

                    fisBuild(fisOpt, 'h5', logname, function() {
                        fisBuild(fisOpt, 'pc', logname, function() {
                            //上传文件
                            var deploy = require('../deploy.js').init;
                            var serverId = data[0].serverId;
                            var serverConfig = config.server[serverId];

                            if (!localDirLock) {
                                localDirLock = true;
                                var static = './static';
                                serverConfig.uploadOpt.localDir = path.resolve(serverConfig.uploadOpt.localDir, dirFileName, static);
                                serverConfig.uploadOpt.remoteDir = path.resolve(serverConfig.uploadOpt.remoteDir, dirFileName, static);
                                serverConfig.uploadOpt.backupDir = path.resolve(serverConfig.uploadOpt.backupDir, dirFileName, static);
                                console.log(serverConfig.uploadOpt)
                            }

                            deploy(serverConfig, serverConfig.uploadOpt, logname, function() {

                                deployLock = false;
                                clearTimeout(countTime);
                                insertPackListData();
                            });

                        });

                    });
                });
            });

            // 插入数据到PackList
            function insertPackListData() {
                dbHandle.getByConditions('buildList', {
                    id: Number(req.query.id)
                }, function(err, data) {
                    var number = dbHandle.findMax(data, 'number') + 1;

                    dbHandle.insert('buildList', {
                        user: req.session.user,
                        id: req.query.id, //项目id，和buildInfoSchema的id相同
                        name: data[0].name, //打包项目名称
                        number: number, //项目打包序号
                        date: new Date(), //日期
                        status: 'sucess', //状态
                        finishTime: finishTime,
                        log: '' //日志
                    });
                });
            }

            res.send({
                code: 0,
                data: {}
            });

            break;
        case '/index/rollBack.htm':
            // 回滚版本
            dbHandle.getByConditions('buildInfo', {
                id: req.query.id
            }, function(err, data) {
                var serverId = data[0].serverId;
                var serverConfig = config.server[serverId];

                var rollBack = require('../rollBack.js');
                rollBack(serverConfig, serverConfig.uploadOpt, function() {
                    console.log('回退成功');
                });

            });

            break;
        case '/index/delete.htm':
            // 删除项目
            dbHandle.deleteData('buildInfo', {
                id: req.query.id
            }, function(err, data) {
                dbHandle.deleteData('buildList', {
                    id: req.query.id
                }, function(err, data) {
                    console.log('已删除')
                });
            });

            break;
        default:
            console.log('default');
    }

};
