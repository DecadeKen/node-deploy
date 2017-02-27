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
            "localDir": '/home/ifweb/node_deploy/',
            "remoteDir": '/home/ifweb/test/',
            "backupDir": '/home/ifweb/node_deploy/backup',
        },
    }],
    "logDir": '/home/ifweb/log',
    "workSpace": '/home/ifweb/node_deploy/',
};

module.exports = config;
