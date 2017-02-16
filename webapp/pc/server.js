var express = require('express');
var path = require('path');
var app = express();
// var proxy = require('http-proxy').createProxyServer({});
var fs = require('fs');


app.use(express.static(__dirname));
// console.log(__dirname)




app.listen(3000, function() {
    console.log('listen on 3000');
});