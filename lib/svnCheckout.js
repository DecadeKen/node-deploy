var cLog = require('./cLog.js');
var gEvent = require('./event.js');
var exec = require('child_process').exec;
// var spawn = require('child_process').spawn; 
var path = require('path');
var config = require('./config.js');
var fs = require('fs');


module.exports = function(db) {


    //获取buildId对应的打包项的svn信息
    function getsvn(buildId, callback) {
        var svnObj = {
            svnUrl: '', //svn路径
            username: config.svn.username, //svn账号
            password: config.svn.password, //svn密码
            workSpace: config.workSpace, //工作目录需要从数据库获取
            dirFileName: '', //拉取svn到dirFileName目录，dirFileName是svn路径拼接而成
            dir: '' //拉取svn到dir目录下，dir是完整路径
        };
        //所有信息获取完毕后执行回调
        function doAferGet() {
            if (svnObj.workSpace && svnObj.svnUrl) {
                svnObj.dir = path.resolve(svnObj.workSpace, './' + svnObj.dirFileName);
                callback(svnObj);
            }
        }

        // //获取工作目录
        // db.buildInfo.findOne(function(err, result){
        //  if (err) {
        //      console.log('系统配置获取失败');
        //      return;
        //  }
        //  svnObj.workSpace = result.workSpace;
        //  doAferGet();
        // });

        //获取svn信息
        db.buildInfo.findOne({ id: buildId }, function(err, result) {
            if (err) {
                console.log('打包配置获取失败');
                return;
            }
            svnObj.svnUrl = result.svnUrl + '/static';
            svnObj.dirFileName = svnObj.svnUrl.replace('https:', '').replace(/\//g, '');
            doAferGet();
        });
    }


    function creatFileDir(fileDir, arrList, callback) {
        var exist = fs.existsSync(fileDir);
        if (!exist) {
            arrList.unshift(fileDir);
            creatFileDir(path.dirname(fileDir), arrList, callback);

        } else {
            // 创建文件夹
            arrList && arrList.forEach(function(DirName) {
                fs.mkdirSync(DirName);

            });

            callback && callback();
        }
    }


    function checkout(buildId, logname, callback) {
        //获取buildId对应的打包项的svn信息
        getsvn(buildId, function(svnObj) {
            //工作目录不存在则新建
            creatFileDir(svnObj.workSpace, [], function() {});


            //拉取svn到workSpaceName目录，workSpaceName是svn路径拼接而成
            var log = '';

            //组装svn拉取命令
            var cmd = 'svn checkout ' + svnObj.svnUrl  + ' ' + svnObj.dir + ' --non-interactive --trust-server-cert --username=' + svnObj.username + ' --password=' + svnObj.password;

            //独立进程执行拉取代码的命令，执行完成以后调用回调
            var child = exec(cmd, { cwd: svnObj.workSpace, maxBuffer: (5 * 1024 * 1024) }, function(error, stdout, stderr) {
                if (error) {
                    log += error;
                    console.error('exec error: ' + error);
                    statusError = error;
                    callback && callback(statusError);
                    return;
                }
            });
            var statusError = '';

            var logObj = cLog.logs[logname];

            logObj.content += 'svn checkout or update start</br>';
            logObj.appendC = 'svn checkout or update start</br>';

            gEvent.emit('logChange_', logname);
            //实时打印输出
            child.stdout.on('data', function(data) {
                // console.log(data)
                logObj.content += data + '</br>';
                logObj.appendC = data + '</br>';
                gEvent.emit('logChange_', logname);
            });

            child.stdout.on('end', function(data) {
                logObj.content += '</br>';
                logObj.appendC = '</br>';
                gEvent.emit('logChange_', logname);

                !statusError && callback && callback(statusError, svnObj.dirFileName, log);

            });
            child.stderr.on('data', function(data) {
                statusError = data;
                callback && callback(statusError,svnObj.dirFileName, log);

            });
            // child.on('close', function(data) {
            //     statusError = 'error';
            //     callback && callback(statusError);
            // });



        });
    }

    return {
        checkout: checkout
    };
}
