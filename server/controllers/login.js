var models = require('../models')
var Author = models.Author
var sign = require('../common/sign')
var staticContent = require('../common/message').staticContent

var key = require('../secretConfig').passwordKey

var login = {
  login: function*(next) {
    this.request.body.password = sign.buildPassword(key, this.request.body.password)
    var user = yield Author.findOne({
      name: this.request.body.name
    }).exec()

    if(user !== null && user.password == this.request.body.password) {
      this.session.isLogin = true
      this.state.message = staticContent.LOGIN_SUCCESS
    } else {
      this.session.isLogin = false
      this.state.message = staticContent.LOGIN_FAIL
    }
    yield next
  },

  logout: function*(next) {
    this.session = null
    this.state.message = staticContent.LOGOUT_SUCCESS
    yield next
  },

  //判断是否登陆
  authUser: function*(next) {
    //已登陆直接进入下一中间件
    if(this.session.isLogin) {
      yield next
    } else {
      //筛选出登陆页面,可进入下一中间件
      var u = this.request.originalUrl.split('/')
      if(u[1] == 'login' || u[2] == 'login') {
        yield next
      } else {
        this.response.status = 401
      }
    }
  }
}

module.exports = login
