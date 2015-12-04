var koa = require('koa')
var mongoose = require('mongoose')
var views = require('koa-views')
  // var static = require('koa-static')
var static= require('koa-static-cache')
var path = require('path')
var bodyParser = require('koa-bodyparser')
var qs = require('koa-qs')
var multer = require('koa-multer')
var gzip = require('koa-gzip')


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
    maxage: 60 * 60 * 24 * 365,
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


//返回响应信息
app.use(function*(next) {
  if(this.state.message !== undefined && this.body !== undefined) {
    if(this.body._doc !== undefined)
      this.body._doc.message = this.state.message
    else
      this.body.message = this.state.message
  }
  if(this.state.message !== undefined && this.body === undefined) {
    this.body = {
      message: this.state.message
    }
  }
  yield next

})

app.use(gzip())


app.on('error', function(err) {
  console.log('server error', err)
})


app.listen(3000)
