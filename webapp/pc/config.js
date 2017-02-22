var config = {
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
    "svnUrl": [
        'https://nfd-server02/svn/p2p/preRelease',
        'ttps://nfd-server02/svn/activity/preRelease'
    ]
};

module.exports = config;