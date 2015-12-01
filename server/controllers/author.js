var models = require('../models')
var Author = models.Author
var base = require('./base')
var sign = require('../common/sign')
var key = require('../secretConfig').passwordKey
var _ = require('lodash')
var staticContent = require('../common/message').staticContent

var author = base.init(Author)
author.admin = base.boundAdmin()

author.create = function*(next) {
  this.request.body.password = sign.buildPassword(key, this.request.body.password)
  try {
    this.state.doc = yield Author.create(this.request.body).exec()
  } catch(error) {
    console.log(error)
  }
  yield next
}

author.uploadSelfSetting = function*(next) {
  this.request.body.password = sign.buildPassword(key, this.request.body.password)

  var user = this.session.user
  user = yield Author.findById(user._id).exec()

  var that = this

  _.forEach(this.request.body, function(n, key) {
    user[key] = n
  })
  try {
    user = yield user.save()
    user.password = null
    this.state.message = staticContent.UPDATE_SUCCESS
    this.body = user
    yield next
  } catch(err) {
    console.log(err)
    yield next
  }
}


author.getSelfSetting = function*(next) {
  var user = this.session.user

  try {
    user.password = null
    this.body = user
    yield next
  } catch(err) {
    console.log(err)
    yield next
  }
}


module.exports = author
