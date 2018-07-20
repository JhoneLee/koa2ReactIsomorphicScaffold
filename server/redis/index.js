/*
* @Author: liyunjiao2048@163.com
* @Date:   2018-07-20 10:40:28
* @Last Modified by:   liyunjiao2048@163.com
* @Last Modified time: 2018-07-20 15:00:52
*/

// 引入redis管理session

import Redis from './transformer';
import conf from './config';

const redis = new Redis(conf);



export default {
    async get(key, maxAge, { rolling }){
        // console.log('get',key,maxAge,rolling);
        let res = await redis.hgetall(key).then(r=>r).catch(e=>{
            {error:e}
        });
        console.log('get',res);
    },
    set(key, sess, maxAge, { rolling, changed }){
        console.log('set',key,sess,maxAge,rolling,changed);
        if(changed){
            let seconds = Math.floor(maxAge/1000);
            redis.hmset(key,sess);
            redis.expire(key,seconds);
        }
    },
    destroy(key){
        console.log('destory',key);
        redis.del(key);
    }
}