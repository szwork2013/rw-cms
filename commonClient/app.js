require('./sass/style.scss')


var $ = require('jquery')

$(document).ready(function() {
  var headerNav = $('header nav')
  $('.burger-btn').click(function() {
    headerNav.toggle(500)
  })
})
