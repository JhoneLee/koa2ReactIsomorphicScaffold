/**
* @file: 首页reducer
* @Author: liyunjiao
* @Date:   2018-05-15 16:31:56
* @Last Modified by:   liyunjiao2048@163.com
* @Last Modified time: 2018-07-13 17:33:04
*/

import {HOME_LIST} from '../action';

export const homeList = (state = {
    data:{
        list:[]
    }
}, action)=>{
    const {type, payload} = action;
    let payloads = type === HOME_LIST ? payload : null;
    return payloads || state;
};