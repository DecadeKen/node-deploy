module.exports = function(DB){
    // 插入
    function insert(dataTable, opt, callback) {

        dataTable = new DB[dataTable](opt);

        dataTable.save(function(err, res) {
            callback && callback(err, '保存成功');
        });
    }

    //条件查询
    function getByConditions(dataTable, opt, callback) {
        DB[dataTable].find(opt, function(err, res) {
            // if (err) {
            //     console.log("Error:" + err);
            // } else {
            //     console.log("Res:" + res);

            // }
            callback && callback(err, res);
        });
    }

    //数量查询
    function getCountByConditions(dataTable, opt, callback) {
        DB[dataTable].count(opt, function(err, res) {
            // if (err) {
            //     console.log("Error:" + err);
            // }
            // else {
            //     console.log("Res:" + res);
            //     callback && callback(res);
            // }
            callback && callback(err, res);
        });
    }

    // 查找最大值
    function findMax(arr) {
        var t = 0;
        arr.forEach(function(item) {
            if (item.id > t) {
                t = item.id;
            }

        });
        return t;
    }

    // function find(dataTable) {
    //     DB[dataTable].find({'id':$maxDistance}, function(data){
    //         console.log(data)
    //     });
    // }

    // find('buildList');

    // insert('buildList', {
    //     id: 3,
    //     number: 1,
    //     user: 'lijianxiang',
    //     date: new Date(),
    //     name: '日常版本20170122分支',
    //     status: 'sucess',
    //     finishTime: 0,
    //     log: 'ok'
    // }, function() {
    //     // require('../storage/dbHandle.js').getByConditions('buildList', { 'id': 4 });
    // });

    // getByConditions('buildList', {}, function(err, data) {
    //     console.log(err + data)
    // })
    return {
        insert: insert,
        getByConditions: getByConditions,
        getCountByConditions: getCountByConditions,
        findMax: findMax
    };
}
