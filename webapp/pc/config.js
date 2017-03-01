var config = {
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
            "remoteDir": '/root/test/',
            "backupDir": '/Users/node_deploy/backup',
        }
    }],
    "svnUrl": [
        'https://nfd-server02/svn/p2p/preRelease/',
        'https://nfd-server02/svn/activity/preRelease/'
    ]
};

module.exports = config;
