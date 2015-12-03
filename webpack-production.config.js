var webpack = require('webpack')
var path = require('path')

var ExtractTextPlugin = require("extract-text-webpack-plugin")


// PATHS
var commomClientPath = path.join(__dirname, 'commonClient')
var adminClientPath = path.join(__dirname, 'adminClient')
module.exports = {
  entry: {
    adminClient: [path.join(adminClientPath, './app.js')],
    commonClient: [path.join(commomClientPath, './app.js')]
  },
  output: {
    path: __dirname + '/public/dist',
    // filename: '[name].[hash].js',
    filename: '[name].js',
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
      // loader: "url-loader?limit=10000&minetype=application/font-woff"
    }, {
      test: /\.(png|jpg|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      loader: "file-loader"
    }],
  },
  node: {
    console: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty'
  },
  plugins: [
    new ExtractTextPlugin("[name].css"),
    // new ExtractTextPlugin("[name].[contenthash].css"),
    // new webpack.optimize.UglifyJsPlugin(),
    // new webpack.optimize.OccurenceOrderPlugin(),
  ]
}
