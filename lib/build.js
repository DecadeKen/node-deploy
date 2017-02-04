var exec = require('child_process').exec;


var bulidCommand = 'fis3 release dev';
exec(bulidCommand, function(error, stdout, stderr) {
    if (error) {
        console.error('error: ' + error);
        return;
    }
    console.log('stdout: ' + stdout);
    console.log('stderr: ' + typeof stderr);
});
