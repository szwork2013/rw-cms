var models = require('../models')
var About = models.About
var Home = models.Home
var base = require('./base')

var about = base.init(About)

about.common = {
  get: function*(next) {
    var data = yield [About.find().sort({
        _id: -1
      }).exec(),
      Home.find().sort({
        _id: -1
      }).exec()
    ]
    yield this.render('about', {
      aboutData: data[0][0],
      homeData: data[1][0]
    })
  },
}
module.exports = about
