/**
 * @description 对Date的扩展，将 Date 转化为指定格式的String
 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字) 
 * @author 陈桦
 * @date "2016-05-11"

 *@example 
    (new Date()).Format("yyyy年MM月d日 h时m分s秒")      ==> "2016年05月11日 13时49分55秒"
    (new Date()).Format("yyyy-MM-dd hh:mm:ss.S")        ==> "2016-05-11 13:50:29.517"
    (new Date()).Format("yyyy-M-d h:m:s.S")             ==> "2016-5-11 13:50:41.708" 
*/
Date.prototype.Format = function (fmt) { //author: meizz 
    var o = {
        "M+": this.getMonth() + 1, //月份 
        "d+": this.getDate(), //日 
        "h+": this.getHours(), //小时 
        "m+": this.getMinutes(), //分 
        "s+": this.getSeconds(), //秒 
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
        "S": this.getMilliseconds() //毫秒 
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}

/**
 * @description 对Date的扩展，将 Date 设定的时间点（时、分、秒）
 * @author 陈桦
 * @date "2016-05-13"

 *@example
    //把当前的时间设置为当前日期的9点30分 
    (new Date()).setNfdTime(9,30,00)      ==> Thu May 12 2016 09:30:00 GMT+0800 (中国标准时间)
*/
Date.prototype.setNfdTime = function(hh,mm,ss){
    if(hh != undefined) this.setHours(hh);
    if(mm != undefined) this.setMinutes(mm);
    if(ss != undefined) this.setSeconds(ss);
    return this;
};