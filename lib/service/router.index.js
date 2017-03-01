var path = require('path');
var fs = require('fs');

var config = require('../config.js');
var cLog = require('../cLog.js');
var gEvent = require('../event.js');
var childProcess = require('child_process');
var serverName = '../../index.js';

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
                        data: resData,
                        user: req.session.user
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

            break;
        case '/index/build.htm': //打包构建
            res.send({
                code: 0,
                data: {
                    deployLock: deployLock
                }
            });

            if (deployLock) {
                break;
            }

            deployLock = true;
            // svn拉取
            var logname = req.query.logName;

            var finishTime = 0;

            /*var logFcoile = cLog.generateLog(req.query.logName),
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
            svnCheckout.checkout(req.query.id, logname, function(err, dirFileName, log) {
                if (err) {
                    console.log('----------------svn Error');
                    insertPackListData('fail', logname, function() {

                    });
                    return;

                }
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

                    fisBuild(fisOpt, 'h5', logname, function(err) {
                        if (err) {

                            console.log('----------------fis Error');
                            insertPackListData('fail', logname, function() {

                            });
                            return;

                        }
                        fisBuild(fisOpt, 'pc', logname, function(err) {
                            if (err) {
                                console.log('----------------fis Error');
                                insertPackListData('fail', logname, function() {});
                                return;

                            }
                            //上传文件
                            var deploy = require('../deploy.js').init;

                            // 静态文件服务器
                            var staticServer = config.staticServer;
                            var staticUploadOpt = {};
                            staticUploadOpt.localDir = path.resolve(staticServer.uploadOpt.localDir, dirFileName, './src/main/webapp/');
                            staticUploadOpt.remoteDir = path.resolve(staticServer.uploadOpt.remoteDir);


                            // 上传静态文件
                            deploy(staticServer, staticUploadOpt, logname, false, function(err) {

                                var serverId = data[0].serverId;
                                var server = config.server[serverId];
                               

                                // 上传html | jsp

                                function deployHtml(logObj, callback) {
                                    var uploadOpt = config.uploadArr.shift();
                                    if (uploadOpt) {
                                        deploy(server, uploadOpt, logname, true, function(logObj) {
                                            deployHtml(logObj, callback);
                                        });
                                    } else {
                                        callback && callback(logObj);
                                    }

                                }

                                deployHtml('', function(logObj) {

                                    logObj.content += '</br>文件备份完成</br>部署完成</br>';
                                    logObj.appendC = '</br>文件备份完成</br>部署完成</br>';
                                    gEvent.emit('logChange_' + logname);

                                    //remove log 事件
                                    gEvent.removeAllListeners(['logChange_' + logname]);
                                    fs.writeFile(path.resolve(config.logDir, logname), cLog.logs[logname].content, {
                                        encoding: 'utf8'
                                    });

                                    insertPackListData('sucess', logname, function() {

                                    });
                                });






                            });

                        });

                    });
                });
            });

            // 插入数据到PackList
            function insertPackListData(status, logname, callback) {
                clearTimeout(countTime);

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
                        status: status, //状态
                        finishTime: finishTime,
                        log: logname //日志
                    }, function() {
                        deployLock = false;
                        callback && callback();
                    });
                });
            }



            break;
        case '/index/rollBack.htm':
            // 回滚版本
            var logname = req.query.logName;
            dbHandle.getByConditions('buildInfo', {
                id: req.query.id
            }, function(err, data) {
                var serverId = data[0].serverId;
                var server = config.server[serverId];

                var rollBack = require('../rollback.js');
                // rollBack(serverConfig, serverConfig.uploadOpt, logname, function() {

                    function rollBackHtml(callback) {
                        var uploadOpt = config.uploadArr.shift();
                        if (uploadOpt) {
                            uploadOpt.localDir = uploadOpt.backupDir;
                            rollBack(server, uploadOpt, logname, true, function() {
                                rollBackHtml(callback);
                            });
                        } else {
                            callback && callback();
                        }

                    }

                    rollBackHtml(function() {
                        //更新log
                        dbHandle.getByConditions('buildList', {
                            id: Number(req.query.id),
                            number: Number(req.query.number)
                        }, function(err, data) {
                            var file_logname = data[0].log;
                            //remove log 事件
                            gEvent.removeAllListeners(['logChange_' + logname]);
                            fs.appendFile(path.resolve(config.logDir, file_logname), cLog.logs[logname].content, {
                                encoding: 'utf8'
                            });

                        });
                    });




                // });
            });
            res.send({
                code: 0,
                data: ''
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
                    res.send({
                        code: 0,
                        data: '项目已删除'
                    });
                });
            });

            break;
        default:
            console.log('default');
    }

};
