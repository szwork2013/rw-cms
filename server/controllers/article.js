var models = require('../models')
var base = require('./base')
var Article = models.Article

var article = base.init(Article)

article.admin = base.boundAdmin()


article.common = {
  render: function*(next) {
    var result = yield Article.find({
      slug: this.params.slug
    }).exec()
    this.state.articleData = result[0]
    yield this.render('article',{
      layoutData:this.state.layoutData,
      articleData:this.state.articleData
    })
  },
  getAll: function*(next) {
    yield this.render('article', {
      data: this.state.docs
    })
  },
  getById: function*(next) {
    yield this.render('article', {
      data: this.state.doc
    })
  },
}

module.exports = article
