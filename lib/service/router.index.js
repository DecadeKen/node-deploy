module.exports = function(req, res, dbHandle){
	switch(req.path){
		case '/index/ProjectInfo.htm':// 查询
		    dbHandle.getByConditions('buildList', {
		        'number': 0
		    }, function(err, data) {
		        var resData = {};
		        if (err) {
		            resData = {
		                code: 1,
		                data: 'error'
		            };
		        } else {
		            resData = {
		                code: 0,
		                data: data
		            };

		        }
		        res.send(resData);
		    });
			break;
		default:
			console.log('default');
	}

}