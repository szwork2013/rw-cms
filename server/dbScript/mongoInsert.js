var mongoose = require('mongoose')
var config = require('./config')
var data = require('./mongoInitData')
var models = require('./models')
var co = require('co')

mongoose.connect(config.mongoStr)
co(function*() {
  for(var i in data) {
    var type = data[i].type
    yield models[type].remove().exec()
    for(var j in data[i].docs) {
      var d = yield models[type].create(data[i].docs[j])
      if(type ==='Category')
        data.layoutData.docs[0].nav.push(d._id)
    }
    console.log('finish')
  }
})
