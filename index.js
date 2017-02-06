/*
 * deploy 模块入口
 */
var db = require( './lib/storage/initdb' );

//测试systemSetting.js
var systemSetting = require('./lib/systemSetting')(db);
systemSetting.set({
    workSpacePath: 'workspace', //工作目录
    servers: [{
        ip: '10.1.1.21', //服务器ip
        serverName: 'chua', //服务器账号
        password: 'ddddd', //密码
        port: 21, //端口号
        serverWorkingPath: 'static' //目标路径
    }]
}, function(){
	systemSetting.get();
});
// 'use strict';


// module.exports = deploy;



