module.exports = function(db) {
	var log = '';
	//设置系统配置
	function set(obj, callback){
		obj.workspacePath = obj.workspacePath || __dirname;
		//删除原来的配置然后插入新配置
		db.systemInfo.remove(function(err, result){
			if (err) {
				console.log('系统配置修改失败');
				return;
			}
			var entity = new db.systemInfo(obj);
	        //保存数据库
	        entity.save(function(err, result) {
	            if (err) {
	                console.log('系统配置修改失败');
	                return;
	            }
	            callback && callback(result);
	        });
		});
	}

	function get(callback){
		db.systemInfo.findOne(function(err, result){
			if (err) {
				var ms = '系统配置获取失败';
				log += ms + '\n';
				console.log(ms);
				return;
			}
			callback && callback(result, log);
		});
	}
	return {
		set: set,
		get: get
	};
}