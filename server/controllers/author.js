var models = require('../models')
var Author = models.Author
var base = require('./base')
var sign = require('../common/sign')

var author = base.init(Author)
author.admin = base.boundAdmin()

author.create = function*(next) {
  this.request.body.password = sign.buildPassword('tiantianquan', this.request.body.password)
  try {
    this.state.doc = yield Author.create(this.request.body).exec()
  }
  catch (error) {
    console.log(error)
  }
  yield next
}


module.exports = author


