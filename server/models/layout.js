var mongoose = require('mongoose')
var Schema = mongoose.Schema
var ObjectId = Schema.ObjectId

//框架配置
var LayoutSchema = new Schema({
  htmlTitle: {
    type: String
  },
  logoImg: {
    type: String
  },
  ICP: {
    type: String
  },
  nav: [{
    type: ObjectId
  }],
  slideHeader: {
    description: {
      type: String
    },
    bigImgUrl: {
      type: String
    },
    smallImgUrl: {
      type: String
    },
  },
  midBanner: {
    cn: {
      type: String
    },
    en: {
      type: String
    }
  }
})

module.exports = mongoose.model('Layout', LayoutSchema)
