var config = {
    "server": [{
        "host": '10.1.60.20',
        "port": 22,
        "username": 'root',
        "password": 'nongfadai',
        "uploadOpt": {
            "localDir": '/root/node_deploy/',
            "remoteDir": '/root/test/',
            "backupDir": '/root/node_deploy/backup'
        }
    }],
    "svnUrl": [
        'https://nfd-server02/svn/p2p/preRelease',
        'https://nfd-server02/svn/activity/preRelease'
    ]
};

module.exports = config;