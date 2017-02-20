var session = require('express-session');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var db = require( '../storage/initdb' );//db.systemInfo是系统配置模型
var loginCheck = require('../loginCheck.js')(db);
var path = require('path');
/*
options = {
	pageStatic: __dirname,//页面资源路径
	resourceStatic: __dirname//静态资源路径
}
*/
module.exports = function(app, options) {	
	// application/x-www-form-urlencoded 编码解析,在post中使用req.body需要用到
	app.use(bodyParser.urlencoded({ extended: true }));
	app.use(cookieParser());
	app.use(session({
	    secret: '12345',
	    name: 'front-deploy',   //这里的name值得是cookie的name，默认cookie的name是：connect.sid
	    cookie: {maxAge: 30 * 60 * 1000 },  //设置maxAge是30分钟，即30分钟后session和相应的cookie失效过期
	    resave: false,
	    saveUninitialized: true
	}));


	app.all('/*', function(req,res){
		var reg = {
			data: /\S+\.htm$/,//数据请求
			html: /(\S+\.html)|\/$///页面请求
		};
		// console.log('req.path = ' + req.path);
		if(req.session.isVisit) {//当前用户
			req.session.isVisit++;
		}else {//当前浏览器的当前用户初次访问
			req.session.isVisit = 1;
		}

		if(reg.html.test(req.path)){//页面请求
			if(req.path === '/' || req.path === '/login.html' ){
				res.sendFile(options.pageStatic + "/login.html");
				return;
			}
			//...

		}else if(reg.data.test(req.path)){//数据请求
			if(req.path == '/login.htm'){//登录接口	
				loginCheck.login(req, res);

			}else{
				if(loginCheck.statusCheck(req)){
					//going on 
					/*
					*
					*
					res.send({
					  code: 0,//0表示成功，其他状态表示失败
					  message: '用户已登录，允许访问',
					  data:{}//数据
					});
					*/
					res.send({
					  code: 0,//0表示成功，其他状态表示失败
					  message: '用户已登录，允许访问',
					  data:{}//数据
					});
					return;

				}else{
					res.send({
					  code: 1,//0表示成功，其他状态表示失败
					  message: '用户未登录，不允许访问',
					  data:{}//数据
					});
					return;
				}
			}

		}else{//请求静态资源
			res.sendFile(options.resourceStatic + req.path);
		}
	});
}