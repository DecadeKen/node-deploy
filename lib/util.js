var fs = require('fs'),
    path = require('path');

exports.log = function(data) {
    if(!global.wsLog) {
        console.log(data);
        return;
    }

    global.wsLog.send(data);
};

exports.buildDir = function (filename) {
    var fileDir = path.dirname(filename),
        arr = fileDir.split(/\/|\\/),
        baseDir = arr.shift();

    baseDir || (baseDir = '/');

    for(var i = 0, len = arr.length; i <= len; i++) {
        if(fs.existsSync(baseDir)) {

            if(arr[i]) {
                baseDir = path.resolve(baseDir, arr[i]);
            }
            continue;
        } else {
            fs.mkdirSync(baseDir);

            if(arr[i]) {
                baseDir = path.resolve(baseDir, arr[i]);
            }
        }
    }
};
