var cLog = require('./cLog.js');
var gEvent = require('./event.js');


module.exports = function(server, uploadOpt, logname, ishtml, callback) {
    var deploy = require('./deploy.js');
    // var Client = require('ssh2').Client;
    var path = require('path');


    deploy.connect(server, function(conn) {
        conn.sftp(function(err, sftp) {
            if (err) {
                console.log(err);
            } else {
                if (!cLog.logs[logname]) cLog.logs[logname] = {};
                var logObj = cLog.logs[logname];
                logObj.content ='';

                logObj.content += '</br>rollback start----</br>';
                logObj.appendC = '</br>rollback start----</br>';
                gEvent.emit('logChange_' + logname);
                // 获取要发送的文件集合
                var filesList = deploy.getFileList(uploadOpt.backupDir, []);

                deploy.uploadFile(filesList, uploadOpt, sftp, logname, ishtml, function() {
                    // 关闭连接
                    conn.end(); 
                    
                    logObj.content += '</br>文件回退成功</br>';
                    logObj.appendC = '</br>文件回退成功</br>';
                    gEvent.emit('logChange_' + logname);
                    
                    console.log('回退成功');
                    callback && callback();

                });
            }
        });
    });


};
