var Client = require('ssh2').Client;
var fs = require('fs');
var path = require('path');
var exec = require('child_process').exec;

var cLog = require('./cLog.js');
var gEvent = require('./event.js');

var files = [],
    remotefileDir = '',
    remotePath = '';
var sendOpt = {
    chunkSize: 50 * 1024 * 1024,
};

var filesListIndex = 0,
    backupListIndex = 0;

function connect(server, callback) {
    var conn = new Client();
    conn.on("ready", function() {
            console.log('connect ready');
            callback(conn);
        })
        .on('error', function(err) {
            console.log("connect error!");
        })
        .on('end', function() {
            console.log("connect end!");
        })
        .on('close', function(err) {
            console.log("connect close");
        })
        .connect(server);
}

//上传文件
function uploadFile(filesList, uploadOpt, sftp, logname, callback) {
    var filePath = filesList.shift();

    if (filePath) {
        if (!/\.svn/.test(filePath) && !/\/((pc|h5)|(pc|h5)-dev)\//.test(filePath)) {
            //非.svn文件夹里面的文件
            var remotePath = path.join(uploadOpt.remoteDir, filePath.slice(uploadOpt.localDir.length)).replace(/[\\]/g, '/');
            var remotefileDir = path.dirname(remotePath);
            if (!/\.html$/g.test(filePath)) {
                // 文件不存在，则判断文件所在文件夹是否存在
                sftp.realpath(remotePath, function(err, absPath) {
                    if (!absPath) {
                        //文件不存在，创建文件夹并上传
                        creatDirAndSend(filePath, remotefileDir, remotePath, sftp, logname, function() {
                            uploadFile(filesList, uploadOpt, sftp, logname, callback);
                        });
                    } else {
                        //文件存在，继续下个文件上传
                        uploadFile(filesList, uploadOpt, sftp, logname, callback);
                    }
                });
            } else {
                //是html文件直接上传文件
                creatDirAndSend(filePath, remotefileDir, remotePath, sftp, logname, function() {
                    uploadFile(filesList, uploadOpt, sftp, logname, callback);
                });
            }
        } else {
            //.svn文件夹里面的文件不发送，继续下个文件上传
            uploadFile(filesList, uploadOpt, sftp, logname, callback);
        }


    } else {
        callback && callback();
    }
}


// 判断是否建立目录和上传
function creatDirAndSend(filePath, remotefileDir, remotePath, sftp, logname, callback) {
    sftp.readdir(remotefileDir, function(err, result) {

        if (err) {
            // 不存在，则创建文件夹
            sftpCreatFileDir(remotefileDir, sftp, [remotefileDir], function() {
                send(filePath, remotePath, sftp, logname, callback);
            });
        } else {
            send(filePath, remotePath, sftp, logname, callback);
        }
    });
}


// 发送文件
function send(filePath, remotePath, sftp, logname, callback) {
    // 上传文件
    if (!cLog.logs[logname]) cLog.logs[logname] = {};
    var logObj = cLog.logs[logname];

    sftp.fastPut(filePath, remotePath, sendOpt, function(err, result) {
        if (err) {
            console.log('sendStaicFile error:' + err);
        }
        //打印成功发送到服务器的文件地址
        // console.log(remotePath);
        callback && callback();

        logObj.content += remotePath + '</br>';
        logObj.appendC = remotePath + '</br>';

        gEvent.emit('logChange_' + logname);

    });
}


// sftp递归创建目录
function sftpCreatFileDir(remotefileDir, sftp, arrList, callback) {
    sftp.readdir(path.dirname(remotefileDir), function(err, result) {
        var pathDir = path.dirname(remotefileDir);
        if (err) {
            arrList.unshift(pathDir);
            sftpCreatFileDir(pathDir, sftp, arrList, callback);
        } else { //exist
            arrList.forEach(function(DirName) {
                sftp.mkdir(DirName);
            });
            callback && callback();
        }
    });

}

// 获取文件夹里面的所有文件
function getFileList(localDir, files) {


    var dir = fs.readdirSync(localDir);

    for (var i = 0; i < dir.length; i++) {
        var p = path.join(localDir, dir[i]);

        var stat = fs.statSync(p);
        if (stat.isDirectory()) {

            getFileList(p, files);
        } else {
            files.push(p);
        }
    }
    return files;

}



//复制文件
function copyFile(filePath, backupPath, callback) {
    var rs = fs.createReadStream(filePath);
    rs.pipe(fs.createWriteStream(backupPath));

    rs.on('end', function() {
        callback && callback();
    });
}

//写入文件
function writeFile(backupPath, data) {
    //只备份html文件
    /\.html$/g.test(backupPath) &&
        creatFileDir(backupPath, [], function() {
            fs.writeFile(backupPath, data, 'utf8', function(error) {
                if (error) {
                    console.log(error + "写入失败");
                } else {
                    console.log("已备份：" + backupPath);
                }
            });
        });
}




//递归创建目录
function creatFileDir(filePath, arrList, callback) {
    var pathDir = path.dirname(filePath);
    var exist = fs.existsSync(pathDir);
    if (!exist) {
        arrList.unshift(pathDir);
        creatFileDir(pathDir, arrList, callback);

    } else {
        // 创建文件夹
        // console.log(arrList)
        arrList && arrList.forEach(function(DirName) {
            fs.mkdirSync(DirName);
        });

        //callbak复制文件
        callback && callback();
    }

}



// 备份文件
function backupHtmlFiles(uploadOpt, backupList, callback) {
    var filePath = backupList.shift();

    if (filePath) {
        if (/\.html$/g.test(filePath)) {
            // html文件备份
            var backupFilePath = path.join(uploadOpt.backupDir, filePath.slice(uploadOpt.localDir.length)).replace(/[\\]/g, '/');
            creatFileDir(backupFilePath, [], function() {
                copyFile(filePath, backupFilePath, function() {
                    backupHtmlFiles(uploadOpt, backupList, callback);
                });
            });
        } else {
            // 非html文件，进行下一个文件备份
            backupHtmlFiles(uploadOpt, backupList, callback);
        }


    } else {
        callback && callback();
    }

}

// 初始化
function init(server, uploadOpt, logname, callback) {
    connect(server, function(conn) {
        conn.sftp(function(err, sftp) {
            if (err) {
                console.log(err);
            } else {
                // 获取要发送的文件集合
                var filesList = getFileList(uploadOpt.localDir, files);


                var logObj = cLog.logs[logname];
                console.log('logObj.content ' + logObj.content)
                logObj.content += 'deploy start----</br>';
                logObj.appendC = 'deploy start----</br>';
                gEvent.emit('logChange_' + logname);


                uploadFile(filesList, uploadOpt, sftp, logname, function() {
                    // 关闭连接
                    conn.end();
                    console.log('传输完成');

                    var backupList = getFileList(uploadOpt.localDir, files);
                    // 备份html文件
                    backupHtmlFiles(uploadOpt, backupList, function() {

                        logObj.content += '</br>文件备份完成</br>部署完成</br>';
                        logObj.appendC = '</br>文件备份完成</br>部署完成</br>';
                        gEvent.emit('logChange_' + logname);

                        callback && callback();
                    });
                });

            }
        });
    });
}


module.exports = {
    init: init,
    connect: connect,
    uploadFile: uploadFile,
    getFileList: getFileList
};
