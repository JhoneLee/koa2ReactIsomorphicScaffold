/*
* @Author: liyunjiao2048@163.com
* @Date:   2018-07-23 14:17:38
* @Last Modified by:   liyunjiao2048@163.com
* @Last Modified time: 2018-07-23 16:42:00
*/

import Router from 'koa-router';
import task from '../sql/task';
import ut from '../utils/md5';
const router = new Router();
let {getUserInfo} = task;
router.post('/login',async (ctx,next)=>{
    let {body} = ctx.request;
    let {username,sign} = body;
    let result = await getUserInfo({
        user_name:username
    });
    ctx.status = 200;
    if(result.status == 1){
        ctx.body = {
            status:1,
            statusInfo:'数据库查找失败'
        }
    } else {
        let {token,user_name,openid,name,user_type} = result.data;
        let str = `username=${username}&password=${token}`;
        let mySign = ut.md5(str);
        if(mySign == sign){
            // 将登录情况写入session
            ctx.session = {token,user_name,openid,name,user_type};
            ctx.body = {
                status:0,
                data:{
                    username:'test'
                },
                statusInfo:'success'
            }
        } else {
            ctx.body = {
                status:0,
                data:{
                    errMsg:'用户名密码不正确'
                },
                statusInfo:'success'
            }
        }
    }
    
}).post('/logout',async (ctx,next)=>{
    ctx.status = 200;
    try{
        ctx.session = null;
        ctx.body = {
            status:0,
            statusInfo:'success'
        }
    } catch(e){
        console.log('logout error',e);
        ctx.body = {
            status:1,
            statusInfo:'success'
        }
    }
});

export default router;