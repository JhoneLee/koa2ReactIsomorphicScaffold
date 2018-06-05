/**
* @file: 服务端入口文件
* @Author: liyunjiao
* @Date:   2018-05-16 15:02:08
* @Last Modified by:   liyunjiao
* @Last Modified time: 2018-05-28 19:35:03
*/

// 根据es-checker 的检测结果选择适当的babel插件
require('babel-polyfill'); 
const lessParser = require('postcss-less').parse;
var br = require('babel-register');
delete Object.assign;
Object.assign = require('object.assign').shim();
require('css-modules-require-hook')({
    extensions: ['.less','.css'],
    processorOpts: {
        parser:lessParser
    }
});

require('asset-require-hook')({
    extensions: ['ttf','woff','svg','eot','woff2'],
    limit: 10000
});

require('asset-require-hook')({
    extensions: ['jpg', 'png', 'gif', 'webp'],
    limit: 8000
});



var fs = require('fs');
var path = require('path');
var babelConfig = JSON.parse(fs.readFileSync(path.join(__dirname , '../.babelrc')));
br(babelConfig);
require('source-map-support').install();
let pathname = './server.dev';
if(process.env.NODE_ENV == 'production'){
    pathname = './server.prod';
}
require(pathname);