var webpack = require('webpack')
var path = require('path')

var ExtractTextPlugin = require("extract-text-webpack-plugin")


// PATHS
var commomClientPath = path.join(__dirname, 'commonClient')
var adminClientPath = path.join(__dirname, 'adminClient')
module.exports = {
  entry: {
    adminClient: ['webpack/hot/dev-server', path.join(adminClientPath, './app.js')],
    commonClient: ['webpack/hot/dev-server', path.join(commomClientPath, './app.js')]
  },
  profile: true,
  debug: true,
  devtool: 'source-map',
  output: {
    path: __dirname + '/public/dist',
    filename: '[name].js',
    sourceMapFilename: '[file].map',
    pathinfo: true
  },
  module: {
    loaders: [{
      test: /\.js$/,
      loader: 'ng-annotate'
    }, {
      test: /\.css$/,
      loader: 'style-loader!css-loader'
    }, {
      test: /\.scss$/,
      loader: 'style-loader!css-loader!sass-loader'
        //loader: ExtractTextPlugin.extract('style-loader', 'css-loader!sass-loader')
    }, {
      test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      loader: "url-loader?limit=10000&minetype=application/font-woff"
    }, {
      test: /\.(png|jpg|ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      // exclude: /(node_modules|bower_components)/,
      loader: "file-loader"
    }],
  },
  plugins: [
    new ExtractTextPlugin("[name].css")
  ]
}
