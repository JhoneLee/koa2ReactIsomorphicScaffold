/*
* @Author: liyunjiao2048@163.com
* @Date:   2018-07-20 10:40:28
* @Last Modified by:   liyunjiao2048@163.com
* @Last Modified time: 2018-07-23 17:22:09
*/

// 引入redis管理session

import Redis from './transformer';
import conf from './config';
import { Store } from "koa-session2";
export const redis = new Redis(conf);



// export default {
//     async get(key, maxAge, { rolling }){
//         // console.log('get',key,maxAge,rolling);
//         let res = await redis.hgetall(key).then(r=>r).catch(e=>{
//             {error:e}
//         });
//         console.log('get',res);
//     },
//     async set(key, sess, maxAge, { rolling, changed }){
//         console.log('set',key,sess,maxAge,rolling,changed);
//         if(changed){
//             let seconds = Math.floor(maxAge/1000);
//             redis.hmset(key,sess);
//             redis.expire(key,seconds);
//         }
//     },
//     async destroy(key){
//         console.log('destory',key);
//         await redis.del(key);
//     }
// }

// 使用koa-session2@babel 使获取redis结果能够同步执行 

class RedisStore extends Store {
    constructor(){
        super();
        // this.redis = new Redis(conf);
    }
    async get(key,ctx){
        // console.log('get',key,maxAge,rolling);
        let res = await redis.hgetall(key).then(r=>r).catch(e=>{
            {error:e}
        });
        return res;
    }
    async set(session, { sid =  this.getID(24), maxAge = 1000000 } = {}, ctx){
        console.log('set',session.openid,maxAge,sid);
        let seconds = Math.floor(maxAge/1000);
        await redis.hmset(sid,session);
        await redis.expire(sid,seconds);
        return sid;
    }
    async destroy(key,ctx){
        console.log('destory',key);
        await redis.del(key);
    }
}
let store = new RedisStore();

export default store;