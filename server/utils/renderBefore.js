/**
* @file: 渲染前数据加载
* @Author: liyunjiao
* @Date:   2018-05-17 18:24:31
* @Last Modified by:   liyunjiao2048@163.com
* @Last Modified time: 2018-07-19 16:39:07
*/

import table from './apiTable';
import request from './request';
import {dealPath} from './tools';
import task from '../sql/task';
async function renderBefore(path,params){
    let stateObj = {reducer:{}};
    let obj = table[path];
    if(obj && obj.length){
        for(let i=0;i<obj.length;i++){
            let e=obj[i];
            let {api,state,init} = e;
            let data = await task[api](params);
            data = data.status == 0 ? data : false;
            data = data || init || {};
            stateObj.reducer[state] = data;
        }
        return stateObj;
    }
}

export default renderBefore;