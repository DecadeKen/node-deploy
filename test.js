var fs = require('fs');


// var fd = fs.openSync('README.md', 'a+');


// var d = fs.readFileSync('/root/log/ken_1_1487775208306.txt', {encoding: 'utf8'});

/*fs.watchFile('/root/log/ken_1_1487776256808.txt', function (curr, prev) {
  console.log('the current mtime is: ' + curr.mtime);
  console.log('the previous mtime was: ' + prev.mtime);
});
*/

var EventEmitter = require('events').EventEmitter;   
var ee = new EventEmitter();

/*
    EventEmitter.on(event, listener) 为事件注册一个监听
    参数1：event  字符串，事件名
    参数2：回调函数
*/
ee.on('some_events', function(foo, bar) {
    console.log("第1个监听事件,参数foo=" + foo + ",bar="+bar );
});

console.log('第一轮');
ee.emit('some_events', 'Wilson', 'Zhong');




// console.log(d);



// fs.closeSync(fd);


// fs.writeSync(fd, 'hello 111111', {encoding: 'utf8'});
