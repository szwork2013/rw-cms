require('./sass/style.scss')

var $ = require('jquery')

if(!document.addEventListener) {
  /**
   * ie8 fallback
   */
  // $('.area-title').css('top', '-40px')
}


$(document).ready(function() {
  var headerNav = $('header nav')
  $('.burger-btn').click(function() {
    headerNav.toggle(500)
  })
})
