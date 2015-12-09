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
      serviceData: this.state.serviceData,
      newsData:this.state.newsData,
      caseData:this.state.caseData,
      layoutData: this.state.layoutData,
      homeData: this.state.homeData
    })
  },

  getData: function*(next) {
    var serviceDataCategory = yield Category.findOne({
      name: '服务与方案'
    }).exec()
    this.state.serviceData = yield Article.find({
      category: serviceDataCategory._id
    }).exec()
    var newsCategory = yield Category.findOne({
      name: '瑞高资讯'
    }).exec()
    this.state.newsData = yield Article.find({
      category: newsCategory._id
    }).exec()
    var caseCategory = yield Category.findOne({
      name: '项目案例'
    }).exec()
    this.state.caseData = yield Article.find({
      category: caseCategory._id
    }).exec()
    yield next
  }
}


module.exports = home
