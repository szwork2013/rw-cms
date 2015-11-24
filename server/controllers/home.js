var models = require('../models')
var Home = models.Home
var base = require('./base')


var home = base.init(Home)


home.common = {
  render: function*(next) {
    yield this.render('index', {
      layoutData: this.state.layoutData,
      homeData: this.state.docs[0]
    })
  },
}
module.exports = home
