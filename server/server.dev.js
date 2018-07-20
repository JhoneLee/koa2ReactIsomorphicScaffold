/**
* @file: dev 开发环境文件
* @Author: liyunjiao
* @Date:   2018-05-16 14:59:31
* @Last Modified by:   liyunjiao2048@163.com
* @Last Modified time: 2018-07-20 15:46:09
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

import favicon from 'koa-favicon'; // 可要可不要
// 引入session
import session from 'koa-session';
import CONF,{verify} from './middleware/session';
// 引入redis 管理session
import store from './redis';

const PORT = 4444;
const {devMiddleware,hotMiddleware} = koaWebpackMiddleware;
// 使用webpack编译client代码
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
// devServer 配置 
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

// 创建app
let app = new Koa();
// 配置静态目录
app.use(koastatic(__dirname + '/dist'));
// 配置模板目录
app.use(views(path.resolve(__dirname, '../views/dev'), {
    map: {html: 'ejs'}
}));
// 加载webpack编译
app.use(convert(wdm));
app.use(convert(hotMiddleware(compiler)));
// 设置favicon
app.use(favicon(path.resolve(__dirname,'./assets/favicon.png')));
// 引入session
app.keys = ['jhonelee'];
let sessConf = Object.assign({},CONF,{store});
app.use(session(sessConf,app));
// post body参数序列化
app.use(bodyParser());
// session 校验
app.use(verify);

// 默认500错误捕捉
app.use(catchErr);

// 服务端渲染react router
app.use(rootM);
// 加载api路由
app.use(router.routes());
app.use(router.allowedMethods());
// 打 log
// app.use(logger());
// 引入默认404页面
app.use(page404);
// 监听4444端口
app.listen(PORT);
console.log('koa server opening');


// process.on('SIGTERM', () => {
//     console.log('Stopping dev server')
//     wdm.close();
//     app.close(() => {
//         process.exit(0)
//     });
// });