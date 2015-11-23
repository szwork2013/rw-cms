var mongoose = require('mongoose')
var Schema = mongoose.Schema
var ObjectId = Schema.ObjectId

var AuthorSchema = new Schema({
  name:{
    type:String
  },
  password:{
    type:String
  }
})

module.exports = mongoose.model('Author',AuthorSchema)
