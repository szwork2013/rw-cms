var mongoose = require('mongoose')
var Schema = mongoose.Schema
var ObjectId = Schema.ObjectId


//服务
//解决方案
//新闻
var CategorySchema = new Schema({
  name: {
    type: String
  },
  nameEn: {
    type: String
  },
  slug: {
    type: String,
  },
  description: {
    type: String
  },
  createDate: {
    type: Date,
    default: Date.now
  },
  updateDate: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('Category', CategorySchema)
