var exec = require( 'child_process' ).exec;
var path = require('path');

//获取buildId对应的打包项的svn信息
function getsvn(buildId, callback){
	var svnObj = {
			workspace: '',//工作目录需要从数据库获取
		    dirFileName: '',//拉取svn到dirFileName目录，dirFileName是svn路径拼接而成
		    dir: ''//拉取svn到dir目录下，dir是完整路径
		};
	
	//获取svn信息和工作目录
	/*
	......
	*/
	svnObj = {
		svn: 'https://nfd-server02/svn/p2p/branches/rcrw20170112/static/src/main/webapp/pc/common',
		username: 'chenhua',
	    password: 'nfd12345678',
	    workspace: __dirname,
	    dirFileName: '',
	    dir: ''
	};

	svnObj.dirFileName = svnObj.svn.replace('https:', '').replace(/\//g,'');
	svnObj.dir = path.resolve(svnObj.workspace, './' + svnObj.dirFileName);

	callback(svnObj);
}

function checkout(buildId, callback){
	//获取buildId对应的打包项的svn信息
	getsvn(buildId, function(svnObj){
		//拉取svn到workspaceName目录，workspaceName是svn路径拼接而成
		var dirFileName = svnObj.dirFileName,
			log = '';

		//组装svn拉取命令
		var cmd = 'svn checkout ' + svnObj.svn + ' ' + svnObj.dir 
			+ ' --non-interactive --trust-server-cert --username=' + svnObj.username 
			+ ' --password=' + svnObj.password;
		//独立进程执行拉取代码的命令，执行完成以后调用回调
		exec( cmd, {cwd:process.cwd(), maxBuffer:( 5 * 1024 * 1024 ) /*defaults to 5MB*/}, function( error, stdout, stderr ) {
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
				callback(dirFileName, log);
			}
		} );
	})
	
}
exports.checkout = checkout;