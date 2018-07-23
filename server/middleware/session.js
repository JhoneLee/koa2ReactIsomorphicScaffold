/*
* @Author: liyunjiao2048@163.com
* @Date:   2018-07-19 16:09:11
* @Last Modified by:   liyunjiao2048@163.com
* @Last Modified time: 2018-07-23 17:33:02
*/

//session中间件配置
import {redis} from '../redis';
// cookie配置
const CONFIG = {
    maxAge: 60*60*1000,
    httpOnly: true,
    overwrite: false
}

export default {
    key:'kris_sess',
    maxAge: 60*1000, // session 过期时间 单位ms
    httpOnly:true,
    overwrite:true, // 能否被覆写
    signed:true,
    // renew 是否在即将过期时续签
    // rolling    
}

// 对session进行校验
export async function verify(ctx,next){
    if(ctx.url!='/__webpack_hmr' && ctx.url!='/api/login'){
        let {cookies} = ctx;
        let key = cookies.get('kris_sess');
        console.log('get cookie key',key);
        if(key && ctx.session.openid){
            cookies.set('kris_sess',key,{
                maxAge:60*1000
            }); // 对cookie进行延期
            redis.expire(key,60*1000); // 对redis session存储进行延期
            console.log('update session',ctx.session.openid);
            if(ctx.url == '/home/1'){
                ctx.redirect('/home');
            } else {
                await next();
            }
        } else {
            if(ctx.url!='/home/1'){
                ctx.redirect('/home/1')
            } else {
                await next();
            }
        }
    } else {
        if(ctx.url =='/__webpack_hmr'){
            ctx.status = 200;
            ctx.body = {
                message:'no webpack'
            }
        } else {
            await next();
        }
    }
}