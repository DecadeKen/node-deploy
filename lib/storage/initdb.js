var mongoose = require('mongoose');
var config = require('../config');
DB_URL = 'mongodb://' + config.mongodb.host + ':' + config.mongodb.port + '/node-deploy';

// 连接
mongoose.connect(DB_URL);

// 连接成功
mongoose.connection.on('connected', function() {
    console.log('Mongoose connection open to ' + DB_URL);
});

// 连接异常
mongoose.connection.on('error', function(err) {
    console.log('Mongoose connection error: ' + err);
});

// 连接断开
mongoose.connection.on('disconnected', function() {
    console.log('Mongoose connection disconnected');
});


// 用户信息
var userInfoSchema = new mongoose.Shema({
    userName: String,	//账号名
    password: String	//密码
});

var userInfo = db.model('userInfo', userInfoSchema);

// 服务器配置
var serverInfoSchema = new mongoose.Shema({
    ip: String,	//服务器ip
    serverName: String,	//服务器账号
    password: String,	//密码
    port: Number,	//端口号
    serverWorkingPath: String	//目标路径
});

var serverInfo = db.model('serverInfo', serverInfoSchema);

// 打包配置
var buildInfoSchema = new mongoose.Shema({
    name: String,	//打包项目名称
    svnUrl: String,	//svn下载地址
    serverId: Number,	//部署目标服务器id
    serverIp: Number,	//部署目标服务器ip
    fisMedia: String	//fis命令
});

var buildInfo = db.model('buildInfo', buildInfoSchema);

// 打包列表
var buildListShema = new mongoose.Shema({
    id: Number,	//项目id
    number: Number,	//项目打包序号
    date: Date,	//日期
    status: String,	//状态
    log: String	//日志
});

var buildList = db.model('buildList', buildListSchema);


module.exports = {
    userInfo: userInfo,
    serverInfo: serverInfo,
    buildInfo: buildInfo,
    buildList: buildList
};