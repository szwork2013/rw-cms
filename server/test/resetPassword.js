var buildPassword = require('../common/sign').buildPassword

var mongoose = require('mongoose')
var config = require('../config')
var secretConfig = require('../secretConfig')
var models = require('../models')
var Author = models.Author
var co = require('co')

mongoose.connect(config.mongoStr)

co(function*() {
  var paw = buildPassword(secretConfig.passwordKey, secretConfig.app.password)
  var result= yield Author.create({
    name: secretConfig.app.name,
    password: paw
  })
  console.log(result)
})
