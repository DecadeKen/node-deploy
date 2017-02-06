module.exports = function(db) {
	//设置系统配置
	function set(obj, callback){
		console.log('系统配置修改');
		obj.workspacePath = obj.workspacePath || __dirname;
		//删除原来的配置然后插入新配置
		db.serverInfo.remove(function(err, result){
			if (err) {
				console.log('系统配置修改失败');
				return;
			}
			var entity = new db.serverInfo(obj);
	        //保存数据库
	        entity.save(function(err, result) {
	            if (err) {
	                console.log('系统配置修改失败');
	                return;
	            }
	            console.log('save result = ' + result);
	            callback && callback(result);
	        });
		});
	}

	function get(callback){
		db.serverInfo.findOne(function(err, result){
			if (err) {
				console.log('系统配置获取失败');
				return;
			}
			console.log('get result = ' + result);
			callback && callback(result);
		});
	}
	return {
		set: set,
		get: get
	}
}