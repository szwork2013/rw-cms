var models = require('../models')
var base = require('./base')
var Article = models.Article
var _ = require('lodash')
var staticContent = require('../common/message')

var article = base.init(Article)

article.admin = base.boundAdmin()

article.updateById = function*(next) {
  this.state.doc = yield Article.findById(this.params.id).exec()
  var that = this
  _.forEach(this.request.body, function(n, key) {
    that.state.doc[key] = n
  })
  that.state.doc.updateDate = new Date()
  try {
    this.state.doc = yield this.state.doc.save()
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
    var relationList = this.state.articleData.relationArticle.map(function(id) {
      return Article.findById(id).exec()
    })
    var relationArticles = yield relationList
    relationArticles.forEach(function(relation){
      relation.background = relation.backgroundImage ? 'url('+relation.backgroundImage+')' :relation.backgroundColor
    })

    yield this.render('article', {
      layoutData: this.state.layoutData,
      articleData: this.state.articleData,
      relationArticles:relationArticles
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
