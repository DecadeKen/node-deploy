var express = require('express');
var path = require('path');
var app = express();
// var router = require('./router.js');
// var proxy = require('http-proxy').createProxyServer({});
var fs = require('fs');
var dbHandle = require('../storage/dbHandle.js');
var DB = require("../storage/initdb.js");


app.use(express.static(path.resolve(__dirname, '../../webapp/pc-dev/')));


app.get('/index/build.htm', function(req, res, next) {
    var d = {
        "code": 0
    };
    res.send(d);
});
app.get('/index/ProjectInfo.htm', function(req, res, next) {

    // // // 插入
    // require('../storage/dbHandle.js').insert('buildList', {
    //     id: 4,
    //     number: 1,
    //     name: '预发布分支',
    //     date: new Date,
    //     status: 'sucess',
    //     log: 'ok'
    // }, function() {
    // 	 require('../storage/dbHandle.js').getByConditions('buildList', { 'id': 4 });
    // });

    // 查询
	require('../storage/dbHandle.js').getByConditions('buildList', {
        'number': 1
    }, function(data) {
    	res.send(data);
    });


});


// console.log(router);



app.listen(3000, function() {
    console.log('listen on 3000');
});
