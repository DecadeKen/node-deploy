var path = require('path');
var fs = require('fs');

var config = require('../config.js');
var cLog = require('../cLog.js');
var gEvent = require('../event.js');

var deployLock = false;

module.exports = function(req, res, dbHandle, DB) {

    switch (req.path) {
        case '/index/ProjectInfo.htm': // 查询
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
            break;
        case '/index/build.htm': //打包构建
            if (deployLock) {
                break;
            }
            deployLock = true;
            // svn拉取
            console.log(req.query);
            var logname = req.query.logName;

            /*var logFile = cLog.generateLog(req.query.logName),
                logFileFd = fs.openSync(logFile, 'a+');*/

            cLog.logs[logname] = {
                content: '',
                appendC: ''
            };

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
                            serverConfig.uploadOpt.localDir = path.resolve(serverConfig.uploadOpt.localDir, dirFileName + '/static');
                            serverConfig.uploadOpt.remoteDir = path.resolve(serverConfig.uploadOpt.remoteDir, dirFileName + '/static');
                            serverConfig.uploadOpt.backupDir = path.resolve(serverConfig.uploadOpt.backupDir, dirFileName + '/static');
                            deploy(serverConfig, serverConfig.uploadOpt, function() {
                                deployLock = false;
                            });
                        });

                    });
                });
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
        default:
            console.log('default');
    }

};
