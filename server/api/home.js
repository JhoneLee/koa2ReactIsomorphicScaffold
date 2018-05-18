/**
* @file: 首页api
* @Author: liyunjiao
* @Date:   2018-05-16 18:00:48
* @Last Modified by:   liyunjiao
* @Last Modified time: 2018-05-17 16:56:31
*/

import Router from 'koa-router';
import request from '../utils/request';
import domain from '../utils/domain';
let route = new Router();

route.get('/datalist',async (ctx,next)=>{
    let data = await request({
        uri:`${domain.BASE}movie/in_theaters`
    });
    ctx.status = 200;
    ctx.body = data;
});

export default route;