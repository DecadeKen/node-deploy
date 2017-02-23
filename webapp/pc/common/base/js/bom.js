var exports = {
    /**
     * @description 读取location.search
     * @author 冬冬
     * @date "2016-05-03"
     * 
     * @param {String} n 名称
     * @return {String} search值
     * @example
     *      mod.query('mod');
     */
    query:function(n){
        var m = window.location.search.match(new RegExp( "(\\?|&)"+n+"=([^&]*)(&|$)"));
        return !m ? "":decodeURIComponent(m[2]);
    },
    /**
     *@description 读取location.hash值
     * @author 冬冬
     * @date "2016-05-03"
     * 
     *@param {String} n 名称
     *@return {String} hash值
     *@example
     *      mod.hash('mod');
     */
    getHash:function(n){
        var m = window.location.hash.match(new RegExp( "(#|&)"+n+"=([^&]*)(&|$)"));
        return !m ? "":decodeURIComponent(m[2]);
    }
};

return exports;
