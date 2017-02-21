var exec = require('child_process').exec;
var spawn = require('child_process').spawn;
var path = require('path');

// var DB = {
//     svnWorkSpace: '',
//     svnUrl: 'https://nfd-server02/svn/p2p/preRelease/',
//     workSpace: 'D:/github/node-deploy/workspace',
//     fisMedia: 'dev'
// };

// var svnCheckOut = 'svn co ' + DB.svnUrl;

// exec('cd /qqq', function(error, stdout, stderr) {
//     if (error) {
//         console.error('error: ' + error);
//         return;
//     }
//     console.log('stdout: ' + stdout);
//     console.log('stderr: ' + typeof stderr);
// });

// exec(svnCheckOut, function(error, stdout, stderr) {
//     if (error) {
//         console.error('error: ' + error);
//         return;
//     }
//     console.log('stdout: ' + stdout);
//     console.log('stderr: ' + typeof stderr);
// });

// var bulidCommand = 'cd ' + DB.workSpace + ' && ' + 'sudo ' + DB.fisCommand;

// exec(bulidCommand, function(error, stdout, stderr) {
//     if (error) {
//         console.error('error: ' + error);
//         return;
//     }
//     console.log('stdout: ' + stdout);
//     console.log('stderr: ' + typeof stderr);
// });



// fis打包
function fisBuild(fisOpt, callback) {
    console.log(fisOpt.workSpace + fisOpt.dirFileName + fisOpt.fisPath)

    var fis = spawn('fis3', ['release', fisOpt.fisMedia], { cwd: path.resolve(fisOpt.workSpace, fisOpt.dirFileName, fisOpt.fisPath)});

    fis.stdout.on('data', function(data) {
        console.log('' + data);
    });

    fis.on('error', function(err) {
        console.log('Failed to start child process');
    });

    fis.on('close', function(code) {
        callback && callback()
        
        // console.log('child process exited with code' + code);
    });
}


module.exports = {
    fisBuild: fisBuild
};
