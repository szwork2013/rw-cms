var crypto = require('crypto')

module.exports = {
  buildPassword: function (key, password) {
    var hmac = crypto.createHmac('sha1', key)
    hmac.update(password)
    return hmac.digest('base64')
  }
}



