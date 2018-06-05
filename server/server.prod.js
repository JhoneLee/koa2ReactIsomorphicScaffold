/**
* @file: 生产环境文件
* @Author: liyunjiao
* @Date:   2018-05-28 19:38:10
* @Last Modified by:   liyunjiao
* @Last Modified time: 2018-05-28 20:22:44
*/

import Koa from 'koa';
import webpack from 'webpack';
import views from 'koa-views';
import config from '../config/webpack.prod.config.js';
import convert from 'koa-convert';
import bodyParser from 'koa-bodyparser';
import path from 'path';
import router from './api';
import rootM from './middleware/root';
import fs from 'fs';
import koastatic from 'koa-static';
import catchErr from './middleware/catchErr';
import page404 from './middleware/page404';
const PORT = 4545;
let compiler = webpack(config,(err,state)=>{
    if(err){
        console.log(err);
    } else {
        console.log('webpack complete');
    }
});

let app = new Koa();

app.use(koastatic(__dirname + '/dist'));
app.use(views(path.resolve(__dirname, '../views/dev'), {
    map: {html: 'ejs'}
}));
// post body参数序列化
app.use(bodyParser());
app.use(catchErr);
// 加载路由
app.use(router.routes());
app.use(router.allowedMethods());

app.use(rootM);
app.use(page404);
app.listen(PORT);
console.log('koa server opening:4545');