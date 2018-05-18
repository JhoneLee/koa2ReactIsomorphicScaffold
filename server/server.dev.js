/**
* @file: dev 开发环境文件
* @Author: liyunjiao
* @Date:   2018-05-16 14:59:31
* @Last Modified by:   liyunjiao
* @Last Modified time: 2018-05-17 17:53:55
*/

import Koa from 'koa';
import webpack from 'webpack';
import koaWebpackMiddleware from 'koa-webpack-middleware';
import views from 'koa-views';
import config from '../config/webpack.dev.config.js';
import convert from 'koa-convert';
import bodyParser from 'koa-bodyparser';
import path from 'path';
import router from './api';
import rootM from './middleware/root';
import fs from 'fs';
import koastatic from 'koa-static';
import logger from 'koa-logger';
import livereload from 'koa-livereload';
import catchErr from './middleware/catchErr';
import page404 from './middleware/page404';
const PORT = 4444;
const {devMiddleware,hotMiddleware} = koaWebpackMiddleware;
let compiler = webpack(config);
compiler.plugin('emit', (compilation, callback) => {
    const assets = compilation.assets;
    let file, data;
    Object.keys(assets).forEach(key => {
        if (key.match(/\.html$/)) {
            file = path.resolve(__dirname, key)
            data = assets[key].source()
            fs.writeFileSync(file, data)
        } else {
            file = path.resolve(__dirname,'./dist',key);
            data = assets[key].source();
            fs.writeFileSync(file,data);
        }
    });
    callback();
});

const wdm = devMiddleware(compiler, {
    watchOptions: {
        aggregateTimeout: 300,
        poll: true
    },
    reload: true,
    publicPath: config.output.publicPath,
    stats: {
        colors: true
    }
});

let app = new Koa();

app.use(koastatic(__dirname + '/dist'));
app.use(views(path.resolve(__dirname, '../views/dev'), {
    map: {html: 'ejs'}
}));
app.use(convert(wdm));
app.use(convert(hotMiddleware(compiler)));
// post body参数序列化
app.use(bodyParser());
app.use(catchErr);

// 加载路由
app.use(router.routes());
app.use(router.allowedMethods());
// 打 log
app.use(logger());
app.use(rootM);
app.use(page404);
app.listen(PORT);
console.log('koa server opening');
process.on('SIGTERM', () => {
    console.log('Stopping dev server')
    wdm.close();
    server.close(() => {
        process.exit(0)
    });
});