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
            "localDir": '/Users/ken/workSpace/p2p/localtest/',
            "remoteDir": '/root/test/',
            "backupDir": '/Users/ken/workSpace/p2p/backup'
        }
    }],
    "workSpace": '/Users/ken/workSpace/p2p/localtest/',
};

module.exports = config;
