var mongoose = require('mongoose')
var Schema = mongoose.Schema

//主页配置
var AboutSchema = new Schema({
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
  },
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
