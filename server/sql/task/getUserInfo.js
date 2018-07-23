/*
* @Author: liyunjiao2048@163.com
* @Date:   2018-07-23 14:45:49
* @Last Modified by:   liyunjiao2048@163.com
* @Last Modified time: 2018-07-23 15:24:14
*/

// 获取用户信息
import {query} from '../pool';
import {timeStamp2String} from '../../utils/tools';
import uuid from 'node-uuid';

async function getUserInfo(opt){
    let arr =[];
    for(let item in opt){
        arr.push(`${item}='${opt[item]}'`);
    }
    let sql = `select * from user where ${arr.join(' and ')}`;
    let result = await query(sql).then(res=>{
        return res;
    }).catch(e=>false);
    if(result){
        return {
            status:0,
            data:result[0],
            statusInfo:'success'
        }
    } else {
        return {
            status:1,
            statusInfo:'db error'
        }
    }
}

async function updateUserInfo(oid,opt){
    let arr =[];
    for(let item in opt){
        arr.push(`${item}=${opt[item]}`);
    }
    let sql = `update user set ${arr.join(',')} where openid=${oid}`;
    let result = await query(sql).then(res=>true).catch(e=>false);
    if(result){
        return {
            status:0,
            statusInfo:'success'
        }
    } else {
        return {
            status:1,
            statusInfo:'db error'
        }
    }
}

async function addUserInfo(opt){
    let {user_name,name,user_type,create_time,token,openid} = opt;
    openid = openid || uuid.v4();
    create_time = create_time || timeStamp2String(new Date());
    user_type = user_type || 0;
    let sql = `insert into user(user_name,name,user_type,create_time,token,openid) 
               values(${user_name},${name},${user_type},${create_time},${token},${openid})`;
    let result = await query(sql).then(res=>true).catch(e=>false);
    if(result){
        return {
            status:0,
            statusInfo:'success'
        }
    } else {
        return {
            status:1,
            statusInfo:'db error'
        }
    }
}

export default {
    getUserInfo,
    updateUserInfo,
    addUserInfo
}