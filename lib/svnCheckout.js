module.exports = function(db) {
	var exec = require( 'child_process' ).exec;
	var path = require('path');
	var config = require('./config.js');
	var fs = require('fs');

	//获取buildId对应的打包项的svn信息
	function getsvn(buildId, callback){
		var svnObj = {
				svnUrl: '',//svn路径
				username: config.svn.username,//svn账号
				password: config.svn.password,//svn密码
				workSpacePath: '',//工作目录需要从数据库获取
			    dirFileName: '',//拉取svn到dirFileName目录，dirFileName是svn路径拼接而成
			    dir: ''//拉取svn到dir目录下，dir是完整路径
			};
		//所有信息获取完毕后执行回调
		function doAferGet(){
			if(svnObj.workSpacePath && svnObj.svnUrl){
				svnObj.dir = path.resolve(svnObj.workSpacePath, './' + svnObj.dirFileName);
				callback(svnObj);
			}
		}
		
		//获取工作目录
		db.systemInfo.findOne(function(err, result){
			if (err) {
				console.log('系统配置获取失败');
				return;
			}
			svnObj.workSpacePath = result.workSpacePath;
			doAferGet();
		});
		//获取svn信息
		db.buildInfo.findOne({id: buildId}, function(err, result){
			if (err) {
				console.log('打包配置获取失败');
				return;
			}
			svnObj.svnUrl = result.svnUrl;			
			svnObj.dirFileName = svnObj.svnUrl.replace('https:', '').replace(/\//g,'');
			doAferGet();
		});
	}

	function checkout(buildId, callback){
		//获取buildId对应的打包项的svn信息
		getsvn(buildId, function(svnObj){
			//工作目录不存在则新建
			if(!fs.existsSync(svnObj.workSpacePath)){
				if(fs.mkdirSync(svnObj.workSpacePath) < 0){
					console.log('创建工作目录出错');
					return false;
				}
			}
			
			//拉取svn到workSpacePathName目录，workSpacePathName是svn路径拼接而成
			var log = '';

			//组装svn拉取命令
			var cmd = 'svn checkout ' + svnObj.svnUrl + ' ' + svnObj.dir 
				+ ' --non-interactive --trust-server-cert --username=' + svnObj.username 
				+ ' --password=' + svnObj.password;
			//独立进程执行拉取代码的命令，执行完成以后调用回调
			exec( cmd, {cwd: svnObj.workSpacePath, maxBuffer:( 5 * 1024 * 1024 ) /*defaults to 5MB*/}, function( error, stdout, stderr ) {
				log += cmd;
				if (error) {
					log += error;
					console.error('exec error: ' + error);
					return;
				}
				log += stdout;
				log += stderr;
				console.log('stdout: ' + stdout + '\n stderr: ' + stderr);
				if(callback){
					callback(svnObj.dirFileName, log);
				}
			} );
		});
	}

	return {
		checkout: checkout
	};
}