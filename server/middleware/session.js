/*
* @Author: liyunjiao2048@163.com
* @Date:   2018-07-19 16:09:11
* @Last Modified by:   liyunjiao2048@163.com
* @Last Modified time: 2018-07-20 11:42:57
*/

//session中间件配置

// cookie配置
const CONFIG = {
    maxAge: 60*60*1000,
    httpOnly: true,
    overwrite: false
}

export default {
    key:'kris_sess',
    maxAge: 60*60*1000, // session 过期时间 单位ms
    httpOnly:true,
    overwrite:true, // 能否被覆写
    signed:true,
    // renew 是否在即将过期时续签
    // rolling    
}

export async function verify(ctx,next){
    console.log(ctx.url);
    if(ctx.url!='/__webpack_hmr'){
        let {session,cookies} = ctx;
        // let n = session.views || 0;
        // session.views = ++ n;
        session.sessionId = 'jhoneLee' + new Date().getTime();
        console.log(ctx.url,session.sessionId);
        await next();
    } else {
        ctx.status = 200;
        ctx.body = {
            message:'no webpack'
        }
    }
}