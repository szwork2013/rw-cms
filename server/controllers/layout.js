var models = require('../models')
var Layout = models.Layout
var Category = models.Category
var base = require('./base')

var layout = base.init(Layout)

layout.common = {
  get: function*(next) {
    var layoutData = this.state.docs[0]
    var promiseList = layoutData.nav.map(cateId =>
      Category.findById(cateId).exec()
    )
//     layoutData.nav = yield promiseList
    var categoryResult = yield promiseList
    categoryResult.forEach((r,i)=> layoutData.nav[i] =r)

    this.state.layoutData =layoutData
    yield next
  }
}
module.exports = layout
