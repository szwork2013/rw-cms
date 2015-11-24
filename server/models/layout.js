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
  nav:[{
    type:ObjectId
  }]
})

module.exports = mongoose.model('Layout', LayoutSchema)
