var path = require('path')
module.exports = {
  mongoStr: 'mongodb://localhost/Koa-Cms',

  //public,admin
  staticPaths: [path.join(__dirname, '..','public'), path.join(__dirname,'..' ,'adminClient')]
}
