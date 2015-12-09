var models = require('../models')
var Home = models.Home
var base = require('./base')
var Article = models.Article
var Category = models.Category

var home = base.init(Home)
home.admin = base.boundAdmin()

home.admin.getAll = function*(next) {
  this.body = this.state.docs[0]
  yield next
}

home.common = {
  render: function*(next) {
    this.state.homeData = this.state.docs[0]

    yield next

    yield this.render('index', {
      area1Data: this.state.area1Data,
      area2Data: this.state.area2Data,
      area3Data: this.state.area3Data,
      layoutData: this.state.layoutData,
      homeData: this.state.homeData
    })
  },

  getData: function*(next) {
    var resultList = yield [
      Article.find({
        category: this.state.homeData.area1.category
      }).exec(),
      Article.find({
        category: this.state.homeData.area2.category
      }).exec(),
      Article.find({
        category: this.state.homeData.area3.category
      }).exec()
    ]
    this.state.area1Data = resultList[0]
    this.state.area2Data = resultList[1]
    this.state.area3Data = resultList[2]

    yield next
  }
}


module.exports = home
