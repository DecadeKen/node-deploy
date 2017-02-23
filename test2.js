var EventEmitter = require('events').EventEmitter;   
var ee = new EventEmitter();


console.log('第二轮');
ee.emit('some_events', 'Wilson', 'Z');