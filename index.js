var
    childProcess = require('child_process'),

    serverName="./lib/app.js",

    mainServer = childProcess.fork(serverName);

mainServer.on('uncaughtException', function(e) {
    console.log("deploy on error");
　　 console.log(e);
    restartServer();
});

process.on('exit', function () {
　　console.log('deploy exit!');
});

process.on('uncaughtException', function(e) {
    console.log("deploy on error");
    console.log(e);
    restartServer();
});

function restartServer(){
    console.log("deploy restart...");
    killServer();

    mainServer = childProcess.fork(serverName, process.argv.slice(2));
    console.log("new server is built!\n");
}

function killServer(){
     try{
         process.kill(mainServer.pid);
     }catch(ex){
         console.log("deploy: ",ex);
     }
}