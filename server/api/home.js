/**
* @file: 首页api
* @Author: liyunjiao
* @Date:   2018-05-16 18:00:48
* @Last Modified by:   liyunjiao2048@163.com
* @Last Modified time: 2018-07-13 15:31:16
*/

import Router from 'koa-router';
import request from '../utils/request';
import domain from '../utils/domain';
import {getDataList} from '../sql/task'
let route = new Router();

route.get('/datalist',async (ctx,next)=>{
    // let data = await request({
    //     uri:`${domain.BASE}movie/in_theaters`
    // });
    ctx.status = 200;
    ctx.body = await getDataList();
});

export default route;