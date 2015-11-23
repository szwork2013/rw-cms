var models = require('../models')
var base = require('./base')
var Article = models.Article

var article = base.init(Article)

article.admin = base.boundAdmin()

article.common = {
  getAll: function*(next) {
    yield this.render('article', {data: this.state.docs})
  },
  getById: function*(next) {
    yield this.render('article', {data: this.state.doc})
  },
}

module.exports = article
