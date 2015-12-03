var path = require('path')
var fs = require('fs')
var webpack = require('webpack')


var ExtractTextPlugin = require("extract-text-webpack-plugin")
var HtmlWebpackPlugin = require('html-webpack-plugin')
var AssetsPlugin = require('assets-webpack-plugin')
var Clean = require('clean-webpack-plugin')

var makeConfig = require('./make-webpack.config')

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

module.exports = makeConfig({
  scssExtract: ExtractTextPlugin.extract('style-loader', 'css-loader!sass-loader'),
  output: {
    filename: '/dist/[name].[hash].js'
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
    new ServerConfigReplace(),
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
  ]
})
