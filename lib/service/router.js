var session = require('express-session');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var DB = require('../storage/initdb'); //DB.systemInfo是系统配置模型
var dbHandle = require('../storage/dbHandle.js')(DB);
var loginCheck = require('../loginCheck.js')(DB);
var path = require('path');
var async = require('async');
var indexHtm = require('./router.index.js');
var newPack = require('./router.newPack.js');
var logview = require('./router.logview.js');
var packList = require('./router.packList.js');
var gEvent = require('../event.js');
var cLog = require('../cLog.js');

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
        name: 'front-deploy', //这里的name值得是cookie的name，默认cookie的name是：connect.sid
        cookie: { maxAge: 30 * 60 * 1000 }, //设置maxAge是30分钟，即30分钟后session和相应的cookie失效过期
        resave: false,
        saveUninitialized: true
    }));

    app.ws('/log', function(ws, req) {
        var logname = req.query.logname,
            logObj = cLog.logs[logname],

		firstTrigger = true;
        console.log(logname)
        gEvent.on('logChange_' + logname, function() {
            if(logObj[content] === logObj[appendC]) {
            	ws.send()
            }

            if (firstTrigger) {
                console.log(logObj)
                ws.send(logObj['content']);
                firstTrigger = false;
            } else {
                ws.send(logObj['appendC']);
            }
        });
    });

    //往数据库插入用户名
    // dbHandle.insert('userInfo', {
    //     userName: 'ken',
    //     password: '123456'
    // }, function() {
       	
    // });


    app.all('/*', function(req, res) {
        var reg = {
            data: /\S+\.htm$/, //数据请求
            html: /(\S+\.html)|\/$/ //页面请求
        };
        // // console.log('req.path = ' + req.path);
        // if(req.session.isVisit) {//当前用户
        // 	req.session.isVisit++;
        // }else {//当前浏览器的当前用户初次访问
        // 	req.session.isVisit = 1;
        // }

        // if(reg.html.test(req.path)){//页面请求
        // 	if(req.path === '/' || req.path === '/login.html' ){
        // 		res.sendFile(options.pageStatic + "/login.html");
        // 		return;
        // 	}else{
        // 		res.sendFile(options.pageStatic + req.path);

        // 	}
        // 	//...

        // }else if(reg.data.test(req.path)){//数据请求
        console.log(req.path)
        if (req.path == '/login.htm') { //登录接口	
            loginCheck.login(req, res);

        } else {
            if (loginCheck.statusCheck(req)) { //通过登录态验证
                var reqReg = {
                    index: /\/index\/\S+\.htm$/, //首页接口
                    newPack: /\/newPack\/\S+\.htm$/, //新建打包页接口
                    logview: /\/logview\/\S+\.htm$/, //新建打包页接口
                    packList: /\/packList\/\S+\.htm$/ //打包列表接口
                }

                if (reqReg.index.test(req.path)) { //首页接口
                    indexHtm(req, res, dbHandle, DB);

                } else if (reqReg.newPack.test(req.path)) { //新建打包接口
                    newPack(req, res, dbHandle, DB);
                } else if (reqReg.packList.test(req.path)) {
                    packList(req, res, dbHandle, DB);
                } else if (reqReg.logview.test(req.path)) {
                    logview(req, res, dbHandle, DB);
                }

                return;

            } else {
                res.send({
                    code: 1, //0表示成功，其他状态表示失败
                    message: '用户未登录，不允许访问',
                    data: {} //数据
                });
                return;
            }
        }

        // }else{//请求静态资源
        // 	res.sendFile(options.resourceStatic + req.path);
        // }
    });
}
