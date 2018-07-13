/**
* @file: 详情页api
* @Author: liyunjiao
* @Date:   2018-05-17 16:38:03
* @Last Modified by:   liyunjiao2048@163.com
* @Last Modified time: 2018-07-13 17:00:08
*/

import Router from 'koa-router';
import request from '../utils/request';
import domain from '../utils/domain';
import task from '../sql/task';
let route = new Router();

route.get('/detail/:id',async (ctx,next)=>{
    let {id} = ctx.params;
    let result = await task.getMovieDetail({id});
    ctx.status = 200;
    ctx.body = result;
});

export default route;