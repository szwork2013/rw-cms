var mongoose = require('mongoose')
var Schema = mongoose.Schema

//主页配置
var HomeSchema = new Schema({
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
  about: {
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
    imgUrl: {
      type: String
    }
  },
  contect: {
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
    imgUrl: {
      type: String
    }
  },
})

module.exports = mongoose.model('Home', HomeSchema)
