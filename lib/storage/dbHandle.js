module.exports = function(DB) {
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

            callback && callback(err, res);
        });
    }

    //数量查询
    function getCountByConditions(dataTable, opt, callback) {
        DB[dataTable].count(opt, function(err, res) {
 
            callback && callback(err, res);
        });
    }

    // 删除
    function deleteData(dataTable, opt, callback) {
        DB[dataTable].remove(opt, function(err, res) {
            callback && callback(err, res);
        });
    }

    // 查找最大值
    function findMax(arr, attr) {
        var t = 0;
        arr.forEach(function(item) {
            if (item[attr] > t) {
                t = item[attr];
            }

        });
        return t;
    }

    
    return {
        insert: insert,
        getByConditions: getByConditions,
        getCountByConditions: getCountByConditions,
        findMax: findMax,
        deleteData: deleteData
    };
};
