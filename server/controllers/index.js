var Router = require('koa-router')
var article = require('./article')
var author = require('./author')
var category = require('./category')
var login = require('./login')
var home = require('./home')
var about = require('./about')
var layout = require('./layout')
var config = require('../config')
var send = require('koa-send')

var path = require('path')
var fs = require('fs')
var router = new Router()

//管理路由
var adminRouter = new Router({
  prefix: '/admin'
})

//普通路由
var commonRouter = new Router({
  prefix: '/'
})


adminRouter.get('/', function*(next) {
  yield send(this, path.resolve(config.staticPaths[0], config.getLayoutStaticFile().adminClient
    .html))
})

adminRouter.get('/dev', function*(next) {
  yield send(this, config.staticPaths[0]+ '/adminIndex-dev.html')
})


//如果加入''参数,会命中admin的所有网页,初始index.html读取也无法完成
// adminRouter.use('',login.authUser)
adminRouter.use(login.authUser)


adminRouter.get('/auth-user', login.authUser, function*(next) {
  this.body = 'auth is ok'
  yield next
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
adminRouter.get('/category-articles/:categoryId', category.getCategoryArticles, category.admin
  .getCategoryArticles)


//setting-------------------------
//layout
adminRouter.get('/layout', layout.getAll, layout.admin.getAll)
adminRouter.put('/layout/:id', layout.updateById, layout.admin.updateById)

//homepage
adminRouter.get('/home', home.getAll, home.admin.getAll)
adminRouter.put('/home/:id', home.updateById, home.admin.updateById)

//aboutpage
adminRouter.get('/about', about.getAll, about.admin.getAll)
adminRouter.put('/about/:id', about.updateById, about.admin.updateById)

//权限------------------------------------
//author
adminRouter.get('/author', author.getAll, author.admin.getAll)
adminRouter.get('/author/:id', author.getById, author.admin.getById)

//注册
adminRouter.post('/author', author.create, author.admin.create)
adminRouter.put('/author/:id', author.updateById, author.admin.updateById)
adminRouter.del('/author/:id', author.deleteById, author.admin.deleteById)


//更新自己设置
adminRouter.post('/upload-self-setting', author.uploadSelfSetting)
adminRouter.get('/get-self-setting', author.getSelfSetting)


//登陆
adminRouter.post('/login', login.login)
adminRouter.post('/logout', login.logout)


//上传
adminRouter.post('/upload', function*(next) {
  this.body = this.req.files.file
  this.status = 200
  yield next
})



//公开页面--------------------------------------------
commonRouter.get('/', layout.getAll, layout.common.get, home.getAll, home.common.render)
commonRouter.get('/about', layout.getAll, layout.common.get, about.getAll, about.common.render)
commonRouter.get('/article/:slug', layout.getAll, layout.common.get, article.common.render)
commonRouter.get('/:slug', function*(next) {
  //控制slug 未被捕获的情况
  var Category = require('../models').Category
  var result = yield Category.find({
    slug: this.params.slug
  }).exec()
  if(result && result.length !== 0) {
    console.log(result)
    yield next
  } else {
    this.response.status = 404
  }
}, layout.getAll, layout.common.get, category.common.render)


router.use('', commonRouter.routes())
router.use('', adminRouter.routes())

module.exports = router
