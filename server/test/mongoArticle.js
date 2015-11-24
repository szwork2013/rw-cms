var articleData = {
  type: 'Article',
  docs: [{
    //标题
    titles: {
      default: '电子政务',
      zhLong: '瑞高电子政务解决方案',
      en: ' The electronic government solution',
      enLong: 'E-government solution'
    },
    //自定义路由
    slug: 'The-electronic-government-solution',
    //描述
    description: '电子政务将政务工作更有效、更精简',
    //内容
    content: `<p>电子政务的4个突出的特点：</p>
<p>1。电子政务将政务工作更有效、更精简</p>
<p>2。电子政务将政府工作更公开、更透明</p>
<p>3。电子政务将为企业和居民提供更好的服务</p>
<p>4。电子政务将重新构造政府、企业、居民之间的关系，使之比以前更加协调，使企业和居民能够更好的参与政府的管理。</p>
<p>
  电子政务是国家实施政府职能转变，提高政府管理、公共服务和应急能力的重要举措，有利于带动整个国民经济和社会信息化的发展。电子政务市场规模初显。 在国家的大力支持和推动下，我国电子政务取得了较大进展，市场规模持续扩大，据《中国电子政务行业发展前景与投资战略规划分析报告前瞻》数据显示，2006年， 我国的电子政务市场规模为550亿元，同比增长16.4%，2010年，其市场规模突破1000亿元，2012年，其市场规模达到1390亿元，同比增长17.3%。电子政务软件与 服务市场的规模有望突破1080亿元。在现代计算机、网络通信等技术支撑下，政府机构日常办公、信息收集与发布、公共管理等事务在数字化、网络化的环境下进行的国家行政管理形式。它包含多方面的 内容，如政府办公自动化、政府部门间的信息共建共享、政府实时信息发布、各级政府间的远程视频会议、公民网上查询政府信息、电子化民意调查和社会经济统计等。
</p>`,

    //标签
    tags: ['solution'],
    //类别
    category: '',
    //关联文章
    relationArticle: [],
    background: '#444',
  }]
}


var mongoose = require('mongoose')
var config = require('./config')
var data = require('./mongoInitData')
var models = require('./models')
var Article = models.Article
var Category = models.Category
var co = require('co')

mongoose.connect(config.mongoStr)

co(function*() {
  var cate = yield Category.find({name:'服务与方案'}).exec()
  articleData.docs[0].category = cate._id
  yield Article.create(articleData.docs[0])
  console.log('finish')
})
