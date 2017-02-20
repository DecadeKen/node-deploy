var User = require("./initdb.js");

/**
 * 插入
 */
function insert() {

    var user = new User.userInfo({
        username : 'ken',                 //用户账号
        userpwd: 'abcd',                            //密码

    });

    user.save(function (err, res) {

        if (err) {
            console.log("Error:" + err);
        }
        else {
            console.log("Res:" + res);
        }

    });
}

insert();



// var name = 'ken';
// var arr = ['1', '2', '3', '4']

// function init(name, callback) {
//     var arrFile = arr.shift();
//     var color = 'blue';
//     if (arrFile) {
//         init(name, callback)
//         console.log(1)
//     } else {
//         callback();
//     }

// }

// function console1(color) {
//     console.log(color);
// }

// function dec() {
//     var age = '18'
//     init(name, function() {
//         console1(age)
//     });
// }
// // console1(name);
// dec()
