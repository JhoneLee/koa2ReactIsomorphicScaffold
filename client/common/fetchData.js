/**
* @file: 获取接口数据
* @Author: liyunjiao
* @Date:   2018-05-15 14:15:02
* @Last Modified by:   liyunjiao2048@163.com
* @Last Modified time: 2018-07-23 13:55:53
*/

import fetch from '../util/fetch';
import {judgeType} from '../util/tools';
import { message,Modal } from 'antd';
import {requestPosts} from '../action';
const BASE = '/api/';
// 带abort功能的fetch
function wrapFetch(fetchPromise, timeout) {
    let abortFn = null;
    let time = timeout*1000;
    //这是一个可以被reject的promise
    let abortPromise = new Promise((resolve, reject)=>{
        abortFn = ()=>{
            reject({
                type:'600',
                text:'请求超时,请稍后再试'
            });
         };
    });

    //使用Promise.race 组装两个promise
    let abortablePromise = Promise.race([
         fetchPromise,
         abortPromise
    ]);
    setTimeout(()=>{
         abortFn();
    }, time);

   return abortablePromise;
}

/**
 * ------------------------------------------------------------------
 * fetchApis opt参数 (string/object)
 * string : api名称
 * object: 属性：
 *     api : 请求的api名称
 *     params: 请求参数
 *     success: 请求成功回调
 *     error: 请求接口错误回调
 *     disconnect: 断网错误回调
 * ------------------------------------------------------------------
 */
export default function mkFetchPost(receive){
    return function fetchApis(opt) {
        let type = judgeType(opt);
        let {api,params,success,error,disconnect,pathParams,nsign,loading,timeout,notmsg} = opt;
        let func = () =>{};
        disconnect = disconnect || func;
        error = error || func;
        params = params || {};
        success = success || func;
        if(type === 'string'){
            api = opt;
        }
        let nload = loading?'show':'hide';
        timeout = timeout || 10;
        return function (dispatch) {
            // 显示loading
            dispatch(requestPosts(nload));
            pathParams = pathParams || [];
            let pathP = pathParams.join('/');
            pathP = pathP == '' ? '':`/${pathP}`;
            let dataUrl = `${BASE}${api}${pathP}`;
            return wrapFetch(fetch({
                url:dataUrl,
                params:params,
                method:'get'
            }),timeout).then((response)=>{
                return response.json();
            },(error)=>{
                console.log(error);
                // 隐藏loding
                dispatch(requestPosts('hide'));
                // 网络中断处理
                let text = '网络不给力，请检查网络后重试';
                // Modal.error({
                //     title:'请求失败',
                //     content:text
                // });
                console.log(text);
                disconnect(error);
            }).then((json)=>{
                // 隐藏loading
                dispatch(requestPosts('hide'));
                if(json){
                    console.log(json,'fetch');
                    if(judgeType(json) == 'object' && json.status == 0){
                        // 请求成功
                        success(json);
                    } else {
                        // 请求成功，但是接口返回错误
                        message.error('数据错误');
                        error(json);
                    }
                    return dispatch(receive(api, json));
                }
            }).catch(err => {
                // 捕捉其他一切未知错误
                error(err);
            });
        };
    }
}


export function simpleFetch(opt){
    let {api,params,success,error,method,timeout} = opt;
    let dataUrl = `${BASE}${api}`;
    timeout = timeout || 30000;
    return wrapFetch(fetch({
        url:dataUrl,
        params:params,
        method
    }),timeout).then((response)=>{
        return response.json();
    },(error)=>{
        console.log(error);
        // 网络中断处理
        let text = '网络不给力，请检查网络后重试';
        // Modal.error({
        //     title:'请求失败',
        //     content:text
        // });
        console.log(text);
    }).then((json)=>{
        if(json){
            console.log(json,'fetch');
            if(judgeType(json) == 'object' && json.status == 0){
                // 请求成功
                success(json);
            } else {
                error(json);
            }
        }
    }).catch(err => {
        // 捕捉其他一切未知错误
        error(err);
    });
}