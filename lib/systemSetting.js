var db = require( './db' );

//设置系统配置
function set(obj, callback){
	obj.workspacePath = obj.workspacePath || __dirname;
	//删除原来的配置然后插入新配置
	db.system.remove(function(err, result){
		if (err) {
			console.log('系统配置修改失败');
			return;
		}
		var entity = new db.system(obj);
        //保存数据库
        entity.save(function(err) {
            if (err) {
                console.log('系统配置修改失败');
                return;
            }
            callback();
        });
	});
}

function get(callback){
	db.system.findOne(function(err, result){
		if (err) {
			console.log('系统配置获取失败');
			return;
		}
		callback(result);
	});
}
exports.set = set;
exports.get = get;