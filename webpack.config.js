/*
* @Author: liyue
* @Date:   2017-11-06 20:40:27
* @Last Modified by:   EWL
* @Last Modified time: 2017-11-07 10:50:33
*/
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin');

var WEBPACK_ENV = process.env.WEBPACK_ENV || 'dev';
// 获取html-plugin的参数
var getHtmlConfig = function(name, title){
    return {
            template: './src/view/' + name + '.html',
            filename: 'view/'+ name +'.html',
            inject  : true,
            hash    : true,
            chunks  : ['common', name],
            title   : title
        };
};
var config =  {
    entry: {
        'common': ['./src/page/common/index.js'],
        'index' : ['./src/page/index/index.js'],
        'login' : ['./src/page/login/index.js']
    },
    output: {
        path: './dist/',
        publicPath:'/dist/',
        filename: 'js/[name].js'
    },
    module: {
        loaders: [
            { test: /\.css$/, loader: ExtractTextPlugin.extract("style-loader","css-loader") },
            { test: /\.(gif|png|jpg|woff|svg|eot|ttf)\??.*$/, loader: "url-loader?limit=100&name=resource/[name].[ext]" }
        ]
    },
    externals: {
        'jquery' : 'window.jQuery'
    },
    plugins: [
        // 独立通用模块
        new webpack.optimize.CommonsChunkPlugin({
            name : 'common',
            filename : 'js/base.js'
        }),
        // 单独打包css 文件
        new ExtractTextPlugin("css/[name].css"),
        // html 模板的处理
        new HtmlWebpackPlugin(getHtmlConfig('index','首页')),
        new HtmlWebpackPlugin(getHtmlConfig('login','登录')),
    ]
};
if('dev' === WEBPACK_ENV){
    config.entry.common.push('webpack-dev-server/client?http://localhost:8080/');
}
module.exports = config;