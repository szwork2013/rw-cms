var HtmlWebpackPlugin = require('html-webpack-plugin')
var makeConfig = require('./make-webpack.config')


module.exports = makeConfig({
  devServerScript: 'webpack/hot/dev-server',
  other: {
    profile: true,
    debug: true,
    devtool: 'source-map',
  },
  output: {
    sourceMapFilename: '[file].map',
    pathinfo: true
  }
})
