var config = {
    "server": [{
        "host": '10.1.60.20',
        "port": 22,
        "username": 'root',
        "password": 'nongfadai',
        "uploadOpt": {
            "localDir": '／home/ifweb/node_deploy/',
            "remoteDir": '／home/ifweb/test/',
            "backupDir": '／home/ifweb/node_deploy/backup'
        }
    }],
    "svnUrl": [
        'https://nfd-server02/svn/p2p/preRelease/',
        'https://nfd-server02/svn/activity/preRelease/'
    ]
};

module.exports = config;