/**
* @file: 详情页api
* @Author: liyunjiao
* @Date:   2018-05-17 16:38:03
* @Last Modified by:   liyunjiao
* @Last Modified time: 2018-05-17 16:56:27
*/

import Router from 'koa-router';
import request from '../utils/request';
import domain from '../utils/domain';
let route = new Router();

route.get('/detail/:id',async (ctx,next)=>{
    let {id} = ctx.params;
    let data = await request({
        uri:`${domain.BASE}movie/subject/${id}`
    });
    ctx.status = 200;
    ctx.body = data;
});

export default route;