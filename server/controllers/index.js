var Router = require('koa-router')
var article = require('./article')
var author = require('./author')
var category = require('./category')
var login = require('./login')
var home = require('./home')
var about = require('./about')
var layout = require('./layout')
var send = require('koa-send')
var config = require('../config')

var fs = require('fs')
var router = new Router()
var adminRouter = new Router({
  prefix: '/admin'
})


adminRouter.get('/', function*(next) {
    if(this.cookies.get('isLogin') === undefined) {
      this.cookies.set('isLogin', false, {
        sign: false,
        httpOnly: false
      })
    }
    yield send(this, config.staticPaths[1] + '/index.html')
    yield next
  })
  //TODO:拦截静态资源
adminRouter.use(
  function*(next) {
    if(!this.session.isLogin) {
      var u = this.request.originalUrl.split('/')
      if(u[1] == 'login' || u[2] == 'login') {
        yield next
      } else {
        this.response.status = 401
      }
    } else {
      yield next
    }
  })

//article
adminRouter.get('/article', article.getAll, article.admin.getAll)
adminRouter.get('/article/:id', article.getById, article.admin.getById)
adminRouter.post('/article', article.create, article.admin.create)
adminRouter.put('/article/:id', article.updateById, article.admin.updateById)
adminRouter.del('/article/:id', article.deleteById, article.admin.deleteById)

//category
adminRouter.get('/category', category.getAll, category.admin.getAll)
adminRouter.get('/category/:id', category.getById, category.admin.getById)
adminRouter.post('/category', category.create, category.admin.create)
adminRouter.put('/category/:id', category.updateById, category.admin.updateById)
adminRouter.del('/category/:id', category.deleteById, category.admin.deleteById)
  //获取所属类别文章
adminRouter.get('/category-articles/:categoryId', category.getCategoryArticles, category.admin.getCategoryArticles)

//author
adminRouter.get('/author', author.getAll, author.admin.getAll)
adminRouter.get('/author/:id', author.getById, author.admin.getById)
  //注册
adminRouter.post('/author', author.create, author.admin.create)
adminRouter.put('/author/:id', author.updateById, author.admin.updateById)
adminRouter.del('/author/:id', author.deleteById, author.admin.deleteById)


//登陆
adminRouter.post('/login', login.login)
adminRouter.post('/logout', function*(next) {
  this.session = null
  this.body = 'logout'
  this.cookies.set('isLogin', false, {
    sign: false,
    httpOnly: false
  })
  yield next
})

//上传
adminRouter.post('/upload', function*(next) {
  this.body = this.req.files.file
  this.status = 200
  yield next
})


//公开页面--------------------------------------------
router.get('/', layout.getAll, layout.common.get, home.getAll, home.common.render)
router.get('/about', layout.getAll,layout.common.get, about.getAll, about.common.get)

router.use('', adminRouter.routes())

module.exports = router
