/*
 * deploy 模块入口
 */
var express = require('express');
var app = express();
var path = require('path');
require('express-ws')(app);

app.use(express.static(path.resolve(__dirname, './webapp/pc-dev/')));

require('./lib/service/router.js')(app, {
	pageStatic: __dirname,//页面资源文件夹
	resourceStatic: __dirname//静态资源文件夹
});


app.listen(5000, function(){
	console.log('listen 5000');
});

// module.exports = deploy;



