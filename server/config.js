var path = require('path')
var secretConfig = require('./secretConfig')
var fs = require('fs')

module.exports = {
  mongoStr: `mongodb://${secretConfig.mongo.name}:${secretConfig.mongo.password}@localhost/Koa-Cms`,

  //public,admin
  staticPaths: [path.resolve(__dirname, '..', 'public')],
  //获得最新脚本文件内容
  getLayoutStaticFile: function() {
    return JSON.parse(fs.readFileSync(path.resolve(__dirname, './config.json'),
      'utf8'))
  }
}
