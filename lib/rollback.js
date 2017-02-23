module.exports = function(server, uploadOpt, callback) {
    var deploy = require('./deploy.js');
    // var Client = require('ssh2').Client;
    var path = require('path');

    // var deploy = require('../webapp/pc/server.js');

    // var server = {
    //     host: '10.1.60.20',
    //     port: 22,
    //     username: 'root',
    //     password: 'nongfadai'
    // };

    // var rollbackSet = {
    //     rollbackDir: '/Users/ken/workSpace/p2p/backup',
    //     remoteDir: '/root/test/',
    // };


    console.log(server)

    deploy.connect(server, function(conn) {
        conn.sftp(function(err, sftp) {
            if (err) {
                console.log(err);
            } else {
                // 获取要发送的文件集合
                var filesList = deploy.getFileList(uploadOpt.backupDir, []);
                deploy.uploadFile(filesList, uploadOpt, sftp, function() {
                    // 关闭连接
                    conn.end();
                    console.log('回退成功');

                });
            }
        });
    });


};
