var koa = require('koa')
var mongoose = require('mongoose')
var views = require('koa-views')
var static = require('koa-static')
var path = require('path')
var bodyParser = require('koa-bodyparser')
var qs = require('koa-qs')
var multer = require('koa-multer')

var router = require('./controllers')
var model = require('./models')
var config = require('./config')

//初始化
var app = koa();

//登陆
var session = require('koa-generic-session')
app.use(session())
app.keys = require('./secretConfig').appKeys


//查询字符串解析
qs(app)

//静态资源
config.staticPaths.forEach(function(staticPath) {
  app.use(static(staticPath, {
    index: 'aa'
  }))
})



app.use(multer({
  dest: config.staticPaths[0] + '/upload/img/'
}))

//链接数据库
mongoose.connect(config.mongoStr)
  //初始化模板引擎
app.use(views('../commonClient/jade', {
  default: 'jade',
  map: {
    html: 'jade'
  }
}))


app.use(bodyParser())

//挂载路由
app.use(router.routes())


app.on('error', function(err) {
  console.log('server error', err)
})


app.listen(3000)
