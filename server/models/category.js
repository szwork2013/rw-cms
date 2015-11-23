var mongoose = require('mongoose')
var Schema = mongoose.Schema
var ObjectId = Schema.ObjectId


//服务
//解决方案
//新闻
var CategorySchema = new Schema({
  name:{
    type:String
  }
})

module.exports = mongoose.model('Category',CategorySchema)
