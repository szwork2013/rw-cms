var models = require('../models')
var Author = models.Author
var sign = require('../common/sign')

var key = 'tiantianquan'

var login = {
  login: function*(next) {
    this.request.body.password = sign.buildPassword(key, this.request.body.password)
    var user = yield Author.findOne({name: this.request.body.name}).exec()

    if (user !== null && user.password == this.request.body.password) {
      this.session.isLogin = true
      this.cookies.set('isLogin', true, {sign: false, httpOnly: false})
      this.body = 'OK'
    }
    else {
      this.session.isLogin = false
      this.cookies.set('isLogin', false, {sign: false, httpOnly: false})
      this.body = 'Fail'
    }
    yield next
  }
}

module.exports = login


