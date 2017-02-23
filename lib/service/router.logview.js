var config = require('../config.js');
var fs = require('fs');
var path = require('path');
var async = require('async');

module.exports = function(req, res, dbHandle, DB){
    var query = req.query;

    switch(req.path){
        case '/logview/getlog.htm':
            // 查询
            dbHandle.getByConditions('buildList', {id: query.proId, number: query.num}, function(err, data) {
                
                console.log('query buildList');
                console.log(data);

                if(data.length !== 0) {
                    var logname = data[0].log;

                    fs.readFile(path.resolve(config.logDir, logname), {encoding: 'utf8'}, function(err, data) {
                        if (err) {
                            res.send({
                                code: 1,
                                message: '没找到对应的 log 记录'
                            });
                            return;
                        }

                        res.send({
                            code: 0,
                            data: {
                                log: {
                                    name: logname,
                                    content: data
                                }
                            }
                        });
                    });

                } else {
                    res.send({
                        code: 1,
                        message: '没找到对应的 log 记录'
                    });
                }


            });
            break;


        default:
            console.log('default');
    }

}