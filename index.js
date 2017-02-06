/*
 * deploy 模块入口
 */
var db = require( './lib/storage/initdb' );

//测试systemSetting.js
require('./lib/systemSetting')(db);
// 'use strict';


// module.exports = deploy;



