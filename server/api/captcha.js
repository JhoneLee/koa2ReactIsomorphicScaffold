/*
* @Author: liyunjiao2048@163.com
* @Date:   2018-07-20 15:19:27
* @Last Modified by:   liyunjiao2048@163.com
* @Last Modified time: 2018-07-20 15:44:04
*/

import captchapng from 'captchapng';
import Router from 'koa-router';

const router = new Router();

// 低端验证码，只能生成数字
router.get('/captcha',async (ctx,next)=>{
    let p = new captchapng(80,30,1234);
    p.color(0,0,0,0);
    p.color(80,80,80,255);
    let img = p.getBase64();
    let src = new Buffer(img,'base64');
    ctx.status = 200;
    ctx.set('Content-Type','image/png');
    ctx.body = src;
});

export default router;