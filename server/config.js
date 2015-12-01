var path = require('path')
var secretConfig = require('./secretConfig')
module.exports = {
  mongoStr: `mongodb://${secretConfig.mongo.name}:${secretConfig.mongo.password}@localhost/Koa-Cms`,

  //public,admin
  staticPaths: [path.join(__dirname, '..','public'), path.join(__dirname,'..' ,'adminClient')]
}
