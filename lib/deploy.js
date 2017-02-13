var Client = require('ssh2').Client;
var fs = require('fs');
var path = require('path');
var exec = require('child_process').exec;

var server = {
    host: '10.1.60.20',
    port: 22,
    username: 'root',
    password: 'nongfadai'
};

var upload = {
    localDir: '/Users/ken/workSpace/p2p/localtest/',
    remoteDir: '/root/test/',
    backupDir: '/Users/ken/workSpace/p2p/backup'
};


var files = [],
    remotefileDir = '',
    remotePath = '';

var sendOpt = {
    chunkSize: 500 * 1024 * 1024,
};

var filesListIndex = 0;

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
function uploadFile(filesList, localDir, sftp, callback) {
    var filePath = filesList[filesListIndex++];

    if (filePath) {

        var remotePath = path.join(upload.remoteDir, filePath.slice(localDir.length)).replace(/[\\]/g, '/');
        var remotefileDir = path.dirname(remotePath);

        if (!/\.html$/g.test(filePath)) {

            // 文件不存在，则判断文件所在文件夹是否存在
            sftp.realpath(remotePath, function(err, absPath) {

                if (err) {
                    //文件不存在，创建文件夹并上传
                    creatDirAndSend(filePath, remotefileDir, remotePath, sftp, function() {
                        uploadFile(filesList, localDir, sftp, callback);
                    });
                } else {
                    //文件存在，继续下个文件上传
                    uploadFile(filesList, localDir, sftp, callback);
                }
            });
        } else {
            //是html文件直接上传文件
            creatDirAndSend(filePath, remotefileDir, remotePath, sftp, function() {
                uploadFile(filesList, localDir, sftp, callback);
            });
        }
    } else {
        callback && callback();
    }
}


// 判断是否建立目录和上传
function creatDirAndSend(filePath, remotefileDir, remotePath, sftp, callback) {
    sftp.readdir(remotefileDir, function(err, result) {

        if (err) {
            // 不存在，则创建文件夹
            sftpCreatFileDir(remotefileDir, sftp, [remotefileDir], function() {
                send(filePath, remotePath, sftp, callback);
            });
        } else {
            send(filePath, remotePath, sftp, callback);
        }
    });
}


// 发送文件
function send(filePath, remotePath, sftp, callback) {
    // 上传文件

    sftp.fastPut(filePath, remotePath, sendOpt, function(err, result) {
        if (err) {
            console.log('sendStaicFile error:' + err);
        }
        console.log(remotePath);
        callback && callback();

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
function copyFile(filePath, backupPath) {
    fs.readFile(filePath, 'utf-8', function(err, data) {
        if (err) {
            console.log(filePath + "：读取失败");
        } else {
            writeFile(backupPath, data);
        }
    });
}

//写入文件
function writeFile(backupPath, data) {
	//只备份html文件
	/\.html$/g.test(backupPath) &&
    creatFileDir(backupPath, [], function() {
        fs.writeFile(backupPath, data, 'utf8', function(error) {
            if (error) {
                console.log(error + "写入失败")
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

        }  else {
        	// 创建文件夹
        	arrList.forEach(function(DirName) {
        		fs.mkdirSync(DirName);

        	});

        	//callbak复制文件
            callback && callback();
        }


}



// 备份文件
function backupHtmlFiles(filesList) {
	filesList.forEach(function(filePath) {
		var backupFilePath = path.join(upload.backupDir, filePath.slice(upload.localDir.length)).replace(/[\\]/g, '/');
		copyFile(filePath, backupFilePath);

	});
}

// 初始化
function init(server, localDir) {
    connect(server, function(conn) {
        conn.sftp(function(err, sftp) {
            if (err) {
                console.log(err);
            } else {
                // 获取要发送的文件集合
                var filesList  =  getFileList(localDir, files);
                uploadFile(filesList, upload.localDir, sftp, function() {
                    // 关闭连接
                    conn.end();
                    console.log('传输完成');

                    //备份html文件
				    backupHtmlFiles(filesList);
                });
            }
        });
    });
}


// init(server, upload.localDir);

module.exports = {
	init: init,
	connect: connect,
	uploadFile: uploadFile,
	getFileList: getFileList
};
