var config = {
    "server": [{
        "host": '10.1.60.20',
        "port": 22,
        "username": 'root',
        "password": 'nongfadai'
    }, {
        "host": '192.168.1.21',
        "port": 22,
        "username": 'root',
        "password": 'nongfadai'

    }, {
        "host": '192.168.1.5',
        "port": 22,
        "username": 'root',
        "password": 'nongfadai'

    }, {
        "host": '192.168.1.7',
        "port": 22,
        "username": 'root',
        "password": 'nongfadai'

    }, {
        "host": '10.1.60.23',
        "port": 22,
        "username": 'root',
        "password": 'nongfadai'

    }, {
        "host": '10.1.60.25',
        "port": 22,
        "username": 'root',
        "password": 'nongfadai'

    }, {
        "host": '10.1.60.52',
        "port": 22,
        "username": 'root',
        "password": 'nongfadai'

    }, {
        "host": '10.1.60.61',
        "port": 22,
        "username": 'root',
        "password": 'nongfadai'

    }, {
        "host": '10.1.60.62',
        "port": 22,
        "username": 'root',
        "password": 'nongfadai'

    }],
    "uploadArr": [{
            "localDir": '/Users/node_deploy/nfd/front/src/main/webapp/WEB-INF/pages',
            "remoteDir": '/home/webapps/p2p_pc/front/current/WEB-INF/pages',
            "backupDir": '/Users/node_deploy/backup/p2p_pc/front/'
        }, {
            "localDir": '/Users/node_deploy/nfd/user/src/main/webapp/WEB-INF/pages',
            "remoteDir": '/home/webapps/p2p_pc/user/current/WEB-INF/pages',
            "backupDir": '/Users/node_deploy/backup/p2p_pc/user/'
        }, {
            "localDir": '/Users/node_deploy/h5nfd/front/src/main/webapp/WEB-INF/pages',
            "remoteDir": '/home/webapps/p2p_h5/h5front/current/WEB-INF/pages',
            "backupDir": '/Users/node_deploy/backup/p2p_h5/h5front/'
        }
        // , {
        //     "localDir": '/Users/node_deploy/h5nfd/user/src/main/webapp/WEB-INF/pages',
        //     "remoteDir": '/home/webapps/p2p_h5/h5user/current/WEB-INF/pages',
        // "backupDir": '/Users/node_deploy/backup/p2p_h5/h5user/'
        // }
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
