var mongoose = require('mongoose');
var config = require('../config.js');
DB_URL = 'mongodb://' + config.mongodb.host + ':' + config.mongodb.port + '/node-deploy';

// 连接
mongoose.connect(DB_URL);
var db = mongoose.connection;

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
var userInfoSchema = new mongoose.Schema({
    userName: String, //账号名
    password: String //密码
});

var userInfo = db.model('userInfo', userInfoSchema);

// 服务器配置
var systemInfoSchema = new mongoose.Schema({
    workSpacePath: String, //工作目录
    servers: [{
        ip: String, //服务器ip
        serverName: String, //服务器账号
        password: String, //密码
        port: Number, //端口号
        serverWorkingPath: String //目标路径
    }]
});

var systemInfo = db.model('systemInfo', systemInfoSchema);

// 打包配置
var buildInfoSchema = new mongoose.Schema({
    id: Number, //项目id
    name: String, //打包项目名称
    svnUrl: String, //svn下载地址
    serverId: Number, //部署目标服务器id
    // serverIp: String, //部署目标服务器ip
    fisMedia: String, //fis命令
});

var buildInfo = db.model('buildInfo', buildInfoSchema);

// 构建历史
var buildListSchema = new mongoose.Schema({
    user: String,
    id: Number, //项目id，和buildInfoSchema的id相同
    name: String, //打包项目名称
    number: Number, //项目打包序号
    date: Date, //日期
    status: String, //状态
    finishTime: Number,
    log: String //日志
});

var buildList = db.model('buildList', buildListSchema);


module.exports = {
    userInfo: userInfo,
    systemInfo: systemInfo,
    buildInfo: buildInfo,
    buildList: buildList
};
