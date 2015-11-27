var fs = require('fs')
var path = require('path')
var process = require('process')

var finder = path.join(__dirname,'..',`adminClient/${process.env.templateName}`)

fs.mkdirSync(finder)
fs.mkdirSync(finder+'/templates')
fs.openSync(finder+`/templates/${process.env.templateName}.html`,'a+')
fs.openSync(finder+`/${process.env.templateName}.scss`,'a+')
fs.openSync(finder+`/${process.env.templateName}.controllers.js`,'a+')
fs.openSync(finder+'/index.js','a+')
