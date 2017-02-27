/*
 * deploy 模块入口
 */
var express = require('express');
var app = express();
var path = require('path');
var childProcess = require('child_process');
require('express-ws')(app);

app.use(express.static(path.resolve(__dirname, '../webapp/pc-dev/')));



require('./service/router.js')(app);


app.listen(5000, function() {
    console.log('listen 5000');
});

// module.exports = deploy;
