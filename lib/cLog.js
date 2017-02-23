var fs = require('fs'),
    path = require('path'),

    config = require('./config.js'),
    util = require('./util.js');

function generateLog(filename) {
    var logDir = config.logDir,
        logFilePath = path.resolve(logDir, filename + '.txt');

    if(!fs.existsSync(logDir)) {
        util.buildDir(logFilePath);
    }

    console.log(logFilePath);

    // fs.writeSync(logFilePath, '', {encoding: 'utf8'});

    return logFilePath;
}


module.exports = {
    generateLog: generateLog,
    logs: {}
};