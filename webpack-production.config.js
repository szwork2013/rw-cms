var webpack = require('webpack')
var path = require('path')
var fs = require('fs')

var ExtractTextPlugin = require("extract-text-webpack-plugin")
var HtmlWebpackPlugin = require('html-webpack-plugin')
var AssetsPlugin = require('assets-webpack-plugin')
var Clean = require('clean-webpack-plugin')



// PATHS
var commomClientPath = path.join(__dirname, 'commonClient')
var adminClientPath = path.join(__dirname, 'adminClient')
module.exports = {
  entry: {
    adminClient: [path.join(adminClientPath, './app.js')],
    commonClient: [path.join(commomClientPath, './app.js')]
  },
  output: {
    path: __dirname + '/public',
    filename: '/dist/[name].[hash].js',
  },
  module: {
    loaders: [{
      test: /\.html$/,
      exclude: /(node_modules|bower_components)/,
      loader: 'ngtemplate?relativeTo=' + (path.resolve(__dirname, './adminClient')) +
        '/!html'
    }, {
      test: /\.js$/,
      exclude: /(node_modules|bower_components)/,
      loader: 'ng-annotate'
    }, {
      test: /\.css$/,
      loader: 'style-loader!css-loader'
    }, {
      test: /\.scss$/,
      loader: ExtractTextPlugin.extract('style-loader', 'css-loader!sass-loader')
    }, {
      test: /\.(ttf|woff2|woff)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      loader: 'url-loader'
    }, {
      test: /\.(png|jpg|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      //默认初始路径'/'=='./public'
      //设置'/dist' == './public/dist'
      loader: 'file-loader?name=/dist/image/[name].[hash].[ext]',
    }],
  },
  node: {
    console: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty'
  },
  plugins: [
    new ExtractTextPlugin("/dist/[name].[contenthash].css"),
    new HtmlWebpackPlugin({
      filename: './adminIndex.html',
      template: './adminClient/index.html', // Load a custom template
      inject: 'body', // Inject all scripts into the body
      chunks: ['adminClient']
    }),
    new AssetsPlugin(),
    new Clean(['public/dist']),
    new ServerConfigReplace()
    // new webpack.optimize.UglifyJsPlugin(),
    // new webpack.optimize.OccurenceOrderPlugin(),
  ]
}


function ServerConfigReplace(path) {
  this.path = path
}

ServerConfigReplace.prototype.apply = function(compiler) {
  //done 是在所有文件压缩完触发
  compiler.plugin('done', function(compilation, callback) {
    var configJsonPath = path.resolve('./server/config.json')
    var newFileAsset = JSON.parse(fs.readFileSync('webpack-assets.json'))
    var configJson = JSON.parse(fs.readFileSync(configJsonPath))
    configJson.commonClient.js = newFileAsset.commonClient.js
    configJson.commonClient.css = newFileAsset.commonClient.css


    fs.writeFile(configJsonPath, JSON.stringify(configJson))
  })
}
