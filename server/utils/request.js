/**
* @file: request-promise 二次封装
* @Author: liyunjiao
* @Date:   2018-05-17 11:09:59
* @Last Modified by:   liyunjiao
* @Last Modified time: 2018-05-17 11:35:43
*/

import request from 'request-promise';

/**
 * 请求接口数据
 * @param {Object} params 后台http请求参数数据 
 */

function reqData(params){
    let {uri,qs} = params;
    return new Promise((resolve,reject)=>{
        request({
            uri,
            qs,
            headers: {
                'User-Agent': 'Request-Promise'
            },
            json: true
        }).then(data => {
            let newData = {
                status:1,
                data,
                statusInfo:'成功'
            }
            resolve(newData);
        }, err => {
            let errData = {
                status:0,
                data:err,
                statusInfo:'失败'
            }
            reject(errData);
        }).catch(err => {
            let obj = {
                status: 1,
                data: err,
                statusInfo: '未知错误！'
            };
            reject(obj);
        });
    });
}

export default reqData;