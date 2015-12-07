var gulp = require('gulp');
var exec = require('child_process').exec
var livereload = require('gulp-livereload');
var gutil = require('gulp-util')
var argv = require('yargs').argv;
var ftp = require('vinyl-ftp')
var co = require('co')
var webpack = require('webpack')
var WebpackDevServer = require('webpack-dev-server')
var webpackConfig = require('./webpack-dev.config.js')
var secretConfig = require('./server/secretConfig')


var dir = './adminClient/'

gulp.task('html', function() {
  gulp.src(dir + '**/*.html')
    .pipe(livereload());
})

gulp.task('watch', function() {
  gulp.watch(dir + '*.html', function() {
    gulp.run('html')
  })
  gulp.watch(dir + '**/*.html', function() {
    gulp.run('html')
  })
  livereload.listen();
})

gulp.task("webpack-dev-server", function(callback) {
  // modify some webpack config options
  var myConfig = Object.create(webpackConfig);
  myConfig.devtool = "sourcemap";
  myConfig.debug = true;

  // Start a webpack-dev-server
  new WebpackDevServer(webpack(myConfig), {
    hot: true,
    inline: true,
    proxy: {
      '*': 'http://localhost:3000'
    },
    stats: {
      colors: true
    }
  }).listen(8080, "localhost", function(err) {
    if(err) throw new gutil.PluginError("webpack-dev-server", err);
    gutil.log("[webpack-dev-server]",
      "http://localhost:8080/webpack-dev-server/index.html");
  })

  gulp.run('watch')
})

gulp.task('serve', function() {
  exec('npm run admin-start')
  gulp.run('watch')
})

//向服务器自动部署
gulp.task('deploy', function() {

  var conn = ftp.create({
    host: secretConfig.ftp.host,
    user: secretConfig.ftp.user,
    password: secretConfig.ftp.password,
    parallel: 10,
    log: gutil.log
  })

  var globs = [
    //静态
    'public/dist/**/*',
    'public/fonts/**/*',
    'public/js/**/*',
    'public/adminIndex.html',
    'public/favicon.ico',
    'public/adminIndex-dev.html',

    //服务器端
    'server/**/*',
    'commonClient/jade/**/*'
  ]

  // using base = '.' will transfer everything to /public_html correctly
  // turn off buffering in gulp.src for best performance

  co(function*() {
    var creatfn = function(fn) {
      return function(path) {
        return new Promise(function(resolve) {
          fn.call(conn,path, function(err) {
            resolve(err)
          })
        })
      }
    }
    var rmdir = creatfn(conn.rmdir)
    var rm = creatfn(conn.delete)

    yield rmdir('rw-cms/public/dist')

    if(argv.clean) {
      var baseDir = 'rw-cms/'
      var cleanDir = ['public/fonts',
        'public/js',
        'server',
        'commonClient/jade'
      ]
      var cleanFile = [
        'public/adminIndex.html',
        'public/favicon.ico',
        'public/adminIndex-dev.html'
      ]
      for(var i in cleanDir) {
        yield rmdir(baseDir + cleanDir[i])
      }
      for(var j in cleanFile) {
        yield rm(baseDir + cleanFile[j])
      }
    }

    yield gulp.src(globs, {
        base: '.',
        buffer: false
      })
      .pipe(conn.newer('rw-cms')) // only upload newer files
      .pipe(conn.dest('rw-cms'))

  })

})

//default
gulp.task('default', ['serve'])
