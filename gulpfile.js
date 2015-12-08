var gulp = require('gulp');
var exec = require('child_process').exec
var livereload = require('gulp-livereload');
var gutil = require('gulp-util')
var argv = require('yargs').argv;
var ftp = require('vinyl-ftp')
var Client = require('ssh2').Client
var co = require('co')
var webpack = require('webpack')
var WebpackDevServer = require('webpack-dev-server')
var webpackConfig = require('./webpack-dev.config.js')
var secretConfig = require('./server/secretConfig')


var dir = './adminClient/'

/**
 * 观察html
 */
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

/**
 * webpack-dev-server(弃用)
 */
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

/**
 * 向服务器自动部署
 */
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
    var creatfn = function(obj, fn) {
      var bfn = fn.bind(obj)
      return function(path) {
        return new Promise(function(resolve) {
          bfn(path, function(err) {
            resolve(err)
          })
        })
      }
    }
    var rmdir = creatfn(conn, conn.rmdir)
    var rm = creatfn(conn, conn.delete)

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

gulp.task('ssh', function() {
  var conn = new Client()
  conn.on('ready', function() {
    conn.exec('pm2 restart app', function(err, stream) {
      if(err) throw err
      stream.on('close', function(code, signal) {
        console.log('Stream :: close :: code: ' + code +
          ', signal: ' +
          signal)
        conn.end()
      }).on('data', function(data) {
        console.log('STDOUT: ' + data)
      }).stderr.on('data', function(data) {
        console.log('STDERR: ' + data)
      })
    })
  }).connect({
    host: secretConfig.ssh.host,
    port: 22,
    username: secretConfig.ssh.user,
    password: secretConfig.ssh.password
  })
})


//default
gulp.task('default', ['serve'])
