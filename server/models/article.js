var mongoose = require('mongoose')
var Schema = mongoose.Schema
var ObjectId = Schema.ObjectId

var ArticleSchema = new Schema({
  //标题
  titles: {
    default: {
      type: String,
    },
    zhLong: {
      type: String,
    },
    en: {
      type: String,
    },
    enLong: {
      type: String,
    },
  },
  //自定义路由
  slug: {
    type: String,
  },
  //作者
  author: {
    type: ObjectId
  },
  //描述
  description: {
    type: String
  },
  //内容
  content: {
    type: String
  },
  //回复
  comments: [{
    author: {
      type: ObjectId
    },
    content: {
      type: String
    }
  }],
  //标签
  tags: {
    type: [String]
  },
  //类别
  category: {
    type: [ObjectId]
  },
  //关联文章
  relationArticle: {
    type: [ObjectId]
  },
  backgroundColor: {
    type: String
  },
  backgroundImage: {
    type: String
  },
  publishDate: {
    type: Date,
    default: Date.now
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

//默认标题
var titleVir = ArticleSchema.virtual('title')

titleVir.get(function() {
  return this.title = this.titles.default
})

titleVir.set(function(val) {
  return this.titles.default = val
})

var backgroundVir = ArticleSchema.virtual('background')

backgroundVir.get(function() {
  return this.backgroundImage ? 'url(' + this.backgroundImage + ')' : this.backgroundColor
})

ArticleSchema.set('toJSON', {
  getters: true,
  virtuals: true
})
ArticleSchema.set('toObject', {
  getters: true,
  virtuals: true
})


ArticleSchema.post('save', function(doc) {
  if(doc.slug === undefined || doc.slug === '') {
    doc.slug = doc._id.toString()
    doc.save()
  }
})


module.exports = mongoose.model('Article', ArticleSchema)
