/**
* @file: 工具函数
* @Author: liyunjiao
* @Date:   2018-05-18 15:26:09
* @Last Modified by:   liyunjiao2048@163.com
* @Last Modified time: 2018-07-13 16:07:10
*/

export function dealPath(path,data){
    var reg = /^:[0-9a-zA-Z]/;
    let arr = path.split('/');
    let res = [];
    arr.forEach((e)=>{
        if(reg.test(e)){
            let kk = e.substr(1,e.length);
            let vv = data[kk] || 0;
            res.push(vv);
        } else {
            res.push(e);
        }
    })
    return res.join('/');
}

export function htmlDecode(str) {
    var s = "";
    if (str.length == 0) return "";
    s = str.replace(/>/g, "&");
    s = s.replace(/</g, "<");
    s = s.replace(/>/g, ">");
    s = s.replace(/ /g, "");
    s = s.replace(/'/g, "\'");
    s = s.replace(/"/g, "\"");
    s = s.replace(/<br>/g, "\n");
    s = s.replace(/&nbsp;/g,"");
    return s;
}