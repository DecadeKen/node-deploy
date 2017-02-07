/*
 * deploy 模块入口
 */
var db = require( './lib/storage/initdb' );//db.systemInfo是系统配置模型

//测试systemSetting.js
var systemSetting = require('./lib/systemSetting')(db);

function showSystem(){
	systemSetting.get(function(res){
		console.log(res);
	});
}
systemSetting.set({
    workSpacePath: 'workspace', //工作目录
    servers: [{
        ip: '10.1.1.21', //服务器ip
        serverName: 'chua', //服务器账号
        password: 'ddddd', //密码
        port: 21, //端口号
        serverWorkingPath: 'static' //目标路径
    },
    {
        ip: '10.1.1.22', //服务器ip
        serverName: 'chua', //服务器账号
        password: 'ddddd', //密码
        port: 21, //端口号
        serverWorkingPath: 'static' //目标路径
    }]
}, showSystem);
// 'use strict';


// var svnCheckout = require('./lib/svnCheckout')(db);
// svnCheckout.checkout(1,function(dirFileName, log){
//     console.log( "dirFileName = " + dirFileName );
// });

// var exec = require( 'child_process' ).exec;
// exec( 'cd workspace/nfd-server02svnp2pbranchesrcrw20170112staticsrcmainwebapppc && fis3 imweb dev',  function( error, stdout, stderr ) {
// 	if (error) {
// 		console.error('exec error: ' + error);
// 		return;
// 	}
// 	console.log('stdout: ' + stdout + '\n stderr: ' + stderr);
// } );

// module.exports = deploy;



