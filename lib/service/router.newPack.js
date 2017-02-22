module.exports = function(req, res, dbHandle, DB){
	var config = require('../config.js');
	var path = require('path');
	var async = require('async');
	switch(req.path){
		case '/newPack/newPackInfo.htm':// 查询
		    dbHandle.getByConditions('buildInfo', {}, function(err, data) {
		        var id = dbHandle.findMax(data) + 1;
		        req.query.id = id;

		        async.parallel([function(callback) {

		            // 插入信息到打包配置表
		            dbHandle.insert('buildInfo', req.query, function(err, data) {
		                callback(err, data);
		            });
		        }, function(callback) {
		            buildListObj = {
		                id: req.query.id, //项目id，和buildInfoSchema的id相同
		                name: req.query.name, //打包项目名称
		                number: 0, //项目打包序号
		                date: new Date(), //日期
		                status: '', //状态
		                finishTime: 0,
		                log: '' //日志
		            };

		            // 插入信息到打包列表表
		            dbHandle.insert('buildList', buildListObj, function(err, data) {
		                callback(err, data);
		            });
		        }], function(err, result) {
		            var resData = {};
		            if (err) {
		                resData = {
		                    code: 1,
		                    data: 'error'
		                };

		            } else {
		                resData = {
		                    code: 0,
		                    data: '保存成功'
		                };

		            }
		            res.send(resData);
		        });

		    });
			break;
		default:
			console.log('default');
	}

}