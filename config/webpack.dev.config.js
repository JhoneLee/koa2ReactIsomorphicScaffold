/**
* @file: webpack dev环境配置文件
* @Author: liyunjiao
* @Date:   2018-05-16 16:10:35
* @Last Modified by:   liyunjiao
* @Last Modified time: 2018-05-16 16:20:19
*/

var path = require('path');
var webpack = require('webpack');
var htmlWebpackPlugin = require('html-webpack-plugin');
var cleanWebpackPlugin = require('clean-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
const extractCSS = new ExtractTextPlugin('style1.css');
const extractLESS = new ExtractTextPlugin('style2.css');
module.exports = {
    devtool: '#eval-source-map',
    entry: {
        main: [
            'react-hot-loader/patch',
            'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=2000&reload=true',
            'babel-polyfill',
            path.join(__dirname, '../client/entry.js')
        ]
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: '[name].js',
        publicPath: '/'
    },
    plugins: [
        // new webpack.IgnorePlugin(/\/iconv-loader$/),
        new webpack.NormalModuleReplacementPlugin(/\/iconv-loader$/, 'node-noop'),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'bundle',
            filename: 'bundle.js'
        }),
        new htmlWebpackPlugin({
            title: 'hehe',
            // template: path.join(__dirname, '../index.html'),
            // filename: './index.html'
            filename: path.resolve(__dirname,'./views/dev/index.html'),
            template: path.resolve(__dirname,'../views/tpl/index.tpl.html')
        }),
        new webpack.HotModuleReplacementPlugin(),
        //new ExtractTextPlugin("styles.css"),
        extractCSS,
        extractLESS,
        // 清理打包目录
        new cleanWebpackPlugin([
            path.join(__dirname,'../server/dist/*.hot-update.js'),
            path.join(__dirname,'../server/dist/*.hot-update.json')
        ],{
            root:'/'
        })
    ],
    resolve: {
        extensions: ['.js', '.jsx', '.react']
    },
    module: {
        rules: [
            {
                test:/\.(png|jpg|gif|eot|svg|ttf|woff)$/,
                use:[
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192
                        }
                    }
                ]
            }, {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: [{
                    loader: 'babel-loader'
                }]
            }, {
                test:/\.json?$/,
                exclude: /node_modules/,
                use: [{
                    loader: 'json-loader'
                }]
            },{
                test: /\.html?$/,
                exclude: /node_modules/,
                use: ['html-loader']
            },{
                test: /\.css$/,
                use: extractCSS.extract([ 'css-loader', 'postcss-loader' ])
            }, {
                test: /\.less$/,
                use: extractLESS.extract(['css-loader','less-loader'])
            }
        ]
    }
};