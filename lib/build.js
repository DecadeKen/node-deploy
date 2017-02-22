var exec = require('child_process').exec;
var spawn = require('child_process').spawn;
var path = require('path');
var fisPath = '/static/src/main/webapp/';

// fis打包
function fisBuild(fisOpt, env, callback) {

    var fiscmd = 'fis3 release ' + fisOpt.fisMedia;
    var fis = exec(fiscmd , { cwd: path.resolve(fisOpt.workSpace, fisOpt.dirFileName+fisPath+env) }, function(error, stdout, stderr) {
        if (error) {
            console.log(error + ':Failed to start child process');
        }

        callback && callback();
    });

    fis.stdout.on('data', function(data) {
            console.log('' + data);
    });

    fis.stdout.on('end', function(data) {
        // console.log('' + data);
    });


}


module.exports = {
    fisBuild: fisBuild
};
