var models = require('../models')
var base = require('./base')
var Article = models.Article
var _ = require('lodash')

var article = base.init(Article)

article.admin = base.boundAdmin()

article.admin.updateById = function*(next) {
  this.state.doc = yield Article.findById(this.params.id).exec()
  var that = this
  _.forEach(this.request.body, function(n, key) {
    that.state.doc[key] = n
  })
  that.state.doc.updateDate = new Date()
  try {
    this.state.doc = yield this.state.doc.save().exec()
    this.state.message = staticContent.UPDATE_SUCCESS
    yield next
  } catch(err) {
    console.log(err)
    yield next
  }
}


article.common = {
  render: function*(next) {
    var result = yield Article.find({
      slug: this.params.slug
    }).exec()
    this.state.articleData = result[0]
    yield this.render('article', {
      layoutData: this.state.layoutData,
      articleData: this.state.articleData
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
