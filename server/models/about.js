var mongoose = require('mongoose')
var Schema = mongoose.Schema

//主页配置
var AboutSchema = new Schema({
  area1: {
    title: {
      cn: {
        type: String
      },
      en: {
        type: String
      }
    },
    content: {
      type: String
    },
  },
  area2: {
    title: {
      cn: {
        type: String
      },
      en: {
        type: String
      }
    },
    content: {
      type: String
    },
  },
  area3: {
    title: {
      cn: {
        type: String
      },
      en: {
        type: String
      }
    },
    imgUrl: {
      type: String
    },
  }
})

module.exports = mongoose.model('About', AboutSchema)
