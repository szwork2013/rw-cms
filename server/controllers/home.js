var models = require('../models')
var Home = models.Home
var base = require('./base')
var Article = models.Article


var home = base.init(Home)


home.common = {
  render: function*(next) {
    this.state.homeData = this.state.docs[0]
    this.state.articles = yield Article.find().exec()
    yield this.render('index', {
      articles:this.state.articles,
      layoutData: this.state.layoutData,
      homeData: this.state.homeData
    })
  },
}
module.exports = home
