var models = require('../models')
var Home = models.Home
var base = require('./base')


var home =  base.init(Home)


home.common = {
  get: function*(next) {
    yield this.render('index', {homeData: this.state.docs[0]})
  },
}
module.exports = home
