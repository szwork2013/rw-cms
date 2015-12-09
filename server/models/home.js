var mongoose = require('mongoose')
var Schema = mongoose.Schema
var ObjectId = Schema.ObjectId

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
  area1: {
    category: {
      type: ObjectId
    }
  },
  area2: {
    category: {
      type: ObjectId
    }
  },
  area3: {
    category: {
      type: ObjectId
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
