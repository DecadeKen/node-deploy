/**
 * @description 定义cache，用于模块间通信
 * @author 冬冬
 * @date "2016-05-03"
 * 
 * @example
 *      mod.set('data', 'hello world', false);
 *      mod.get('data');
 */

var _cache = {};
var _readonly_map = {};
var get = function(key) {
    return _cache[key];
};

var set = function(key, value, isReadonly) {
    if (_readonly_map[key]) return console.error(key, "is readonly.");
    _cache[key] = value;
    isReadonly && (_readonly_map[key] = 1);
};

return {
    get: get,
    set: set
};