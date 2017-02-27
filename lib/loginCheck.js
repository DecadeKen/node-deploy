var extend = require('util')._extend;

module.exports = function(db) {
	//登录
	function login(req, res){
		var query =  extend(req.query, req.body);//get请求参数在req.query中，post请求数据保存在req.body中
		//查找login
		console.log(query.userName + ':' + query.password);
		req.session.user = query.userName;
		db.userInfo.findOne({userName: query.userName, password: query.password}, function(err, result){
			var status = true;	
			if (err) {
				status = false;
			}else if(!result){//result为null
				status = false;
			}

			if(status){//登录成功
				req.session.login = true;
				res.send({
				  code: 0,//0表示成功，其他状态表示失败
				  message: 'login success',
				  data:{
				  	name: query.userName
				  }//数据
				});
			}else{
				req.session.login = false;
				res.send({
				  code: 1,//0表示成功，其他状态表示失败
				  message: 'login false',
				  data:{}//数据
				});
			}
		});
	}

	//登录态检测，所有需要登录后才调用的函数后需要
	function statusCheck(req){
		if(req.session.login){
			return true;
		}else{
			return false;
		}
	}
	return {
		login: login,
		statusCheck: statusCheck
	};
}