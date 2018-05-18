/**
* @file: 渲染前数据加载
* @Author: liyunjiao
* @Date:   2018-05-17 18:24:31
* @Last Modified by:   liyunjiao
* @Last Modified time: 2018-05-18 15:39:46
*/

import table from './apiTable';
import request from './request';
import {dealPath} from './tools';
async function renderBefore(path,params){
    let stateObj = {reducer:{}};
    let obj = table[path];
    if(obj && obj.length){
        for(let i=0;i<obj.length;i++){
            let e=obj[i];
            let {api,state} = e;
            if(params){
                api = dealPath(api,params);
            }
            let data = await request({uri:api});
            stateObj.reducer[state] = data;
        }
        return stateObj;
    }
}

export default renderBefore;