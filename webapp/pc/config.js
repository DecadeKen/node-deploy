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
        "host": '10.1.60.23',
        "port": 22,
        "username": 'root',
        "password": 'nongfadai',
        "uploadArr": [{
            "localPcFront": '/Users/node_deploy/nfd/front/src/main/webapp/WEB-INF/pages',
            "remotePcFront": '/home/webapps/p2p_pc/front/current/WEB-INF/pages',

        }, {
            "localPcUser": '/Users/node_deploy/nfd/User/src/main/webapp/WEB-INF/pages',
            "remotePcUser": '/home/webapps/p2p_pc/user/current/WEB-INF/pages',

        }, {
            "localH5Front": '/Users/node_deploy/h5nfd/front/src/main/webapp/WEB-INF/pages',
            "remoteH5Front": '/home/webapps/p2p_h5/front/current/WEB-INF/pages',

        }
        // , {
        //     "localH5User": '/Users/node_deploy/h5nfd/User/src/main/webapp/WEB-INF/pages',
        //     "remoteH5User": '/home/webapps/p2p_h5/user/current/WEB-INF/pages',

        // }
        ],
        "backupDir": '/Users/node_deploy/backup'

    }],
    "svnUrl": [
        'https://nfd-server02/svn/p2p/preRelease/',
        'https://nfd-server02/svn/activity/preRelease/'
    ],
    "staticServer": {
        "host": '192.168.1.7',
        "port": 22,
        "username": 'root',
        "password": 'nongfadai',
        "uploadOpt": {
            "localDir": '/Users/node_deploy/',
            "remoteDir": '/app/soft/pc/static/',
            // "remoteDir": '/root/test/',
            "backupDir": '/Users/node_deploy/backup'
        }
    }
};

module.exports = config;
