var DB = require('./initdb.js');

// 插入
function insert(dataTable, opt, callback) {

    dataTable = new DB[dataTable](opt);

    dataTable.save(function(err, res) {

        if (err) {
            console.log("Error:" + err);
        } else {
            // console.log("Res:" + res);
            callback && callback();
        }


    });
}

//条件查询
function getByConditions(dataTable, opt, callback) {
    DB[dataTable].find(opt, function(err, res) {
        if (err) {
            console.log("Error:" + err);
        } else {
            console.log("Res:" + res);
            callback && callback(res);
        }
    });
}


// insert('buildList', {
//     id: 1,
//     number: 1,
//     user: 'lijianxiang',
//     date: new Date,
//     name: '日常版本20170122分支',
//     status: 'sucess',
//     finishTime: 0,
//     log: 'ok'
// }, function() {
//     // require('../storage/dbHandle.js').getByConditions('buildList', { 'id': 4 });
// });


module.exports = {
    insert: insert,
    getByConditions: getByConditions
};
