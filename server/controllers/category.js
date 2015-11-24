var models = require('../models')
var Article = models.Article
var Category = models.Category
var Author = models.Author
var base = require('./base')

var category = base.init(Category)
category.admin = base.boundAdmin()
category.getCategoryArticles = function*(next) {
  var query = this.query
  var keys = query.keys.split(',')
  var pageAgr = {
    pageNum: query.pageAgr.split(',')[0],
    singleNum: query.pageAgr.split(',')[1]
  }
  var range = [(pageAgr.pageNum - 1) * pageAgr.singleNum, pageAgr.pageNum * pageAgr.singleNum]
  this.state.docs = [yield Article.find({
      category: this.params.categoryId
    }, keys[0] + ' ' + keys[1], {
      limit: pageAgr.singleNum,
      skip: range[0]
    }).exec(),
    yield Article.find({
      category: this.params.categoryId
    }).count().exec()
  ]
  yield next
}
category.admin.getCategoryArticles = function*(next) {
  this.body = this.state.docs
}

category.common = {
  render: function*(next) {
    var categoryResult = yield Category.find({
      slug: this.params.slug
    }).exec()
    this.state.articles = yield Article.find({
      category: categoryResult[0]._id
    }).sort({
      _id: -1
    }).exec()
    var template = this.params.slug === 'news' ? 'news' : 'services'
    yield this.render(template, {
      layoutData: this.state.layoutData,
      articles: this.state.articles
    })
  }
}

module.exports = category
