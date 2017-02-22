module.exports = function(req, res, dbHandle, DB) {
	var onePageSize = 10;
    switch (req.path) {
        case '/packList/packList.htm': // 查询
            var page = req.query.page || req.body.page;//当page小于0表示不分页，页数从1开始
            var pageSize = req.query.pageSize || req.body.pageSize || 10;
            console.log(page + ' ' + pageSize);
            //按创建日期降序排列
            var dd = DB.buildList.find(null, null, function(err, data) {
                var resData = {};
                if (err) {
                    resData = {
                        code: 1,
                        data: 'error'
                    };
                } else {
                    resData = {
                        code: 0,
                        data: {
                            data:data,
                            page: page,
                            pageSize: pageSize,
                            realSize: data.length
                        }
                    };
                }
                res.send(resData);
            }).sort({date:'desc'});

            if(page > 0){//分页
                dd.skip((page - 1) * pageSize).limit(pageSize);
            }

            break;
        default:
            console.log('default');
    }

}
