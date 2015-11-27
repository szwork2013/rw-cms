var models = require('../models')
var Layout = models.Layout
var Category = models.Category
var base = require('./base')

var layout = base.init(Layout)
layout.admin = base.boundAdmin()

function* setCategoryObjToLayout(layoutData) {
  var promiseList = layoutData.nav.map(cateId =>
    Category.findById(cateId).exec()
  )
  var categoryResult = yield promiseList
  categoryResult.forEach((r, i) => layoutData.nav[i] = r)
}

layout.admin.getAll = function*(next) {
  var layoutData = this.state.docs[0]
  yield setCategoryObjToLayout(layoutData)
  this.body = layoutData

  yield next
}


layout.common = {
  get: function*(next) {
    var layoutData = this.state.docs[0]
    yield setCategoryObjToLayout(layoutData)

    this.state.layoutData = layoutData
    yield next
  }
}
module.exports = layout
