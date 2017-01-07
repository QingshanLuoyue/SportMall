var ExtractTextPlugin = require('extract-text-webpack-plugin');
var main = new ExtractTextPlugin('css/main.css');
var mainjs = new ExtractTextPlugin('js/main.js');
var webpack = require('webpack');
var path = require('path');
var _distSrc = './build/';
var _entrySrc = 'src/';
module.exports = {
    entry: './src/index.js',
    output: {
        // 打包输出的路径
        path: path.join(_distSrc,''),
        // 打包后的名字
        filename: 'bundle.js',
        // html引用路径，在这里是本地地址
        publicPath: "./"
    },
    module: {
        loaders: [ 
            // { test: /\.js$/, loader: "babel" },
            // { test: /\.css$/, loader: "style!css" },
            // 写进html的style标签
            // { test: /\.scss$/, loader: "style!css!sass" },
            // 小于等于8kb的图片将会转成base64
            { test: /\.(gif|jpg|png)$/, loader: "url?limit=8192" },
            { test: /\.(woff2|woff|svg|eot|ttf)\??.*$/, loader: 'url-loader?limit=50000&name=[path][name].[ext]'},
            // { test: /\.(woff2|woff|svg|eot|ttf)\??.*$/, loader: 'url-loader?limit=10'},
            // 导出独立的文件
            { test: /\.scss$/, loader: main.extract("css!sass")}
        ] 
    },
    plugins: [
        main,
        mainjs
        // new ExtractTextPlugin("communicate.css")
    ] 
};

// webpack 命令行的几种基本命令

// $ webpack // 最基本的启动webpack方法
// $ webpack -w // 提供watch方法，实时进行打包更新
// $ webpack -p // 对打包后的文件进行压缩，提供production
// $ webpack -d // 提供source map，方便调试。