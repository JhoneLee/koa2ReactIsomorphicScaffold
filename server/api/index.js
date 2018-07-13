/**
* @file: api汇总
* @Author: liyunjiao
* @Date:   2018-05-16 17:36:15
* @Last Modified by:   liyunjiao2048@163.com
* @Last Modified time: 2018-07-12 18:50:52
*/

import Router from 'koa-router';
import fs from 'fs';
import path from 'path';
let router = new Router({
    prefix: '/api'
});

router.all('/',async (ctx,next)=>{
    ctx.set('Content-Type','text/json; charset=UTF-8');
    ctx.set('Access-Control-Allow-Origin',ctx.request.origin);
    ctx.set('Access-Control-Allow-Credentials',true);
    ctx.set('Access-Control-Allow-Headers','Content-Type');
    await next();
});

fs.readdirSync(__dirname).filter(filename =>{
    return filename !== path.basename(__filename);
}).forEach((e)=>{
    let sub = require(`./${e}`);
    router.use(sub.routes());
    router.use(sub.allowedMethods());
});

export default router;