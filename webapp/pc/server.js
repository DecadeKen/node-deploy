var express = require('express');
var path = require('path');
var app = express();
// var router = require('../../lib/build.js');
// var proxy = require('http-proxy').createProxyServer({});
var fs = require('fs');


// app.use(express.static(path.resolve(__dirname, '../../webapp/pc-dev/')));
// console.log(path.resolve(__dirname, '../../webapp/pc-dev/'))




app.listen(3000, function() {
    console.log('listen on 3000');
});