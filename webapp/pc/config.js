var config = {
    "servers": [{
            ip: '10.1.60.20', //服务器ip
            serverName: 'root', //服务器账号
            password: 'nongfadai', //密码
            port: 22, //端口号
            serverWorkingPath: '/root/test' //目标路径
        },{
            ip: '10.1.60.21', //服务器ip
            serverName: 'root', //服务器账号
            password: 'nongfadai', //密码
            port: 22, //端口号
            serverWorkingPath: '/root/test' //目标路径
        }
    ]
};

module.exports = config;