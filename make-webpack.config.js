var webpack = require('webpack')
var path = require('path')
  // PATHS
module.exports = function(opt) {
  var commomClientPath = path.join(__dirname, 'commonClient')
  var adminClientPath = path.join(__dirname, 'adminClient')


  var config = {}

  /**
   * entry
   */
  var entry = {
    adminClient: [path.join(adminClientPath, './app.js')],
    commonClient: [path.join(commomClientPath, './app.js')]
  }

  if(opt.devServer) {
    entry.adminClient.unshift(opt.devServer)
    entry.commonClient.unshift(opt.devServer)
  }

  /**
   * loaders
   */
  var loaders = {
    ngtemplate: {
      test: /\.html$/,
      exclude: /(node_modules|bower_components)/,
      loader: 'ngtemplate?relativeTo=' + (path.resolve(__dirname, './adminClient')) +
        '/!html'
    },
    ngAnnotate: {
      test: /\.js$/,
      loader: 'ng-annotate'
    },
    css: {
      test: /\.css$/,
      loader: 'style-loader!css-loader'
    },
    scss: {
      test: /\.scss$/,
      loader: 'style-loader!css-loader!sass-loader'
    },
    // urlLoader: {
    //   test: /\.(ttf|woff2|woff)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
    //   loader: 'url-loader'
    // },
    fileLoader: {
      test: /\.(png|jpg|eot|svg|ttf|woff2|woff)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      loader: 'file-loader?name=/dist/image/[name].[hash].[ext]'
    }
  }
  if(opt.scssExtract) {
    loaders.scss.loader = opt.scssExtract
  }

  var loaderList = []
  for(var i in loaders) {
    loaderList.push(loaders[i])
  }



  /**
   * output
   */

  var output = {
    path: __dirname + '/public',
    filename: '[name].js',
  }
  if(opt.output) {
    Object.assign(output, opt.output)
  }

  /**
   * other
   */
  var other = {}
  if(opt.other) {
    Object.assign(other, opt.other)
  }

  /**
   * plugins
   */

  var plugins = []
  if(opt.plugins) {
    plugins = opt.plugins
  }

  /**
   * return
   */

  config = {
    entry,
    output,
    plugins,
    module: {
      loaders: loaderList
    },
  }
  Object.assign(config, other)

  return config
}
