var config = {
    "mongodb": {
        "host": '127.0.0.1',
        "port": '27017'
    },
    "svn": {
        "username": 'chenhua',
        "password": 'nfd12345678'
    },
    "server": [{
        "host": '10.1.60.20',
        "port": 22,
        "username": 'root',
        "password": 'nongfadai',
        "uploadOpt": {
            "localDir": '/Users/node_deploy/',
            "remoteDir": '/root/test/',
            "backupDir": '/Users/node_deploy/backup'
        }
    }, {
        "host": '192.168.1.7',
        "port": 22,
        "username": 'root',
        "password": 'nongfadai',
        "uploadOpt": {
            "localDir": '/Users/node_deploy/',
            // "remoteDir": '/app/soft/pc/static/',
            "remoteDir": 'root/test/',
            "backupDir": '/Users/node_deploy/backup',
        }
    }],
    "logDir": '/Users/log',
    "workSpace": '/Users/node_deploy/',
};

module.exports = config;
