/**
* @file: 生产环境webpack配置文件
* @Author: liyunjiao
* @Date:   2018-05-14 15:45:20
* @Last Modified by:   liyunjiao
* @Last Modified time: 2018-06-05 15:52:10
*/

var path = require('path');
var os = require('os');
var webpack = require('webpack');
var htmlWebpackPlugin = require('html-webpack-plugin');
var ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
module.exports = {
    entry: {
        main: path.join(__dirname, '../client/entry.js'),
        vendorReact: ['react','react-dom'],
        vendorRedux:['redux','react-router-redux','react-redux','redux-thunk','redux-promise'],
        vendorRouter:['react-router','react-router-dom']
    },
    output: {
        path: path.resolve(__dirname, '../server/dist/'),
        filename: 'js/[name].[chunkhash:8].js',
        publicPath: '/'
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            names: ['vendorReact','vendorRedux','vendorRouter','main'],
            filename:'js/[name].[chunkhash:8].js'
        }),
        new ParallelUglifyPlugin({
            cacheDir: '.cache/',
            workers:os.cpus().length,
            uglifyJS:{
                output: {
                    comments: false
                },
                compress: {
                    warnings: false
                }
            }
        }),
        new htmlWebpackPlugin({
            title: 'hehe',
            filename: path.resolve(__dirname,'../views/dev/index.html'),
            template: path.resolve(__dirname,'../views/tpl/index.tpl.html'),
            minify: {
                removeComments: true,
                collapseWhitespace: false
            }
        }),
        new webpack.DefinePlugin({
            'process.env': {
              'NODE_ENV': JSON.stringify('production')
            }
        }),
        new ExtractTextPlugin("css/styles.css"),
        new ExtractTextPlugin("css/less.css")
    ],
    resolve: {
        extensions: ['.js', '.less','.jsx', '.react']
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
            },
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: [{
                    loader: 'babel-loader'
                }]
            }, {
                test: /\.html?$/,
                exclude: /node_modules/,
                use: ['html-loader']
            },
            {
                test: /\.react$/,
                exclude: /node_modules/,
                use: ['single-react-loader']
            }, {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback:'style-loader',
                    use:'css-loader'
                })
            }, {
                test: /\.less$/,
                use:ExtractTextPlugin.extract({
                    fallback:'style-loader',
                    use:[
                        {
                            loader:'css-loader'
                        },{
                            loader:'less-loader'
                        }
                    ]
                })
            }
        ]
    }
};