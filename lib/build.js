var exec = require('child_process').exec;
var spawn = require('child_process').spawn;

var DB = {
    svnWorkSpace: '',
    svnUrl: 'https://nfd-server02/svn/p2p/preRelease/',
    workSpace: '/Users/ken/workSpace/p2p/preRelease/static/src/main/webapp/pc',
    fisMedia: 'dev'
};

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



// svn拉取
function svnCheckOut() {

}


// fis打包
function fisBuild() {
    var fis = spawn('fis3', ['release', DB.fisMedia], { cwd: DB.workSpace });

    fis.stdout.on('data', function(data) {
        console.log('' + data);
    });

    fis.on('error', function(err) {
        console.log('Failed to start child process');
    });

    fis.on('close', function(code) {
        // console.log('child process exited with code' + code);
    });
}

//上传服务器
function fileDeploy() {

}