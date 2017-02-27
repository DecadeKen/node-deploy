var exec = require('child_process').exec;
var spawn = require('child_process').spawn;
var path = require('path');
var fs = require('fs');
var fisPath = '/static/src/main/webapp/';

var cLog = require('./cLog.js');
var gEvent = require('./event.js');
var statusError = '';

// fis打包
function fisBuild(fisOpt, env, logname, callback) {

    var fiscmd = 'fis3 release ' + fisOpt.fisMedia;
    var fis = exec(fiscmd, { cwd: path.resolve(fisOpt.workSpace, fisOpt.dirFileName + fisPath + env) }, function(error, stdout, stderr) {
        if (error) {
            console.log(error + ':Failed to start child process');
            statusError = error;
            callback && callback(statusError);
        }
    });


    var logObj = cLog.logs[logname];

    logObj.content += '【' + env + '】' + fiscmd + '<br/>';
    logObj.appendC = '【' + env + '】' + fiscmd + '<br/>';
    gEvent.emit('logChange_' + logname);

    fis.stdout.on('data', function(data) {
        data = data.replace(/\[\d*m/g, '');

        logObj.content += data;
        logObj.appendC = data;
        gEvent.emit('logChange_' + logname);
    });

    fis.stdout.on('end', function(data) {

        // fs.close(cLog.logs[logname]);
        console.log('fis end');
        // gEvent.removeAllListeners(['logChange_' + logname]);

        logObj.content += '</br>';
        logObj.appendC = '</br>';
        gEvent.emit('logChange_' + logname);
        !statusError && callback && callback(statusError);

    });

    // fis.stderr.on('data', function(data) {
    //     console.log(data)
    //     statusError = data;
    //     callback && callback(statusError);
    // });

    
    // fis.on('close', function(data) {
    //     statusError = 'error';
    //     callback && callback(statusError);
    // });


}


module.exports = {
    fisBuild: fisBuild
};
