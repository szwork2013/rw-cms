require('./sass/style.scss')

var $ = require('jquery')

if(!document.addEventListener) {
  /**
   * ie8 fallback
   */
  $('.slide-header .title').css({
    top: '-30%',
    left: '-35%'
  })

  $('.slide-header .content-img').css({
    top: '-50%',
    right: '55%'
  })

  $('.area-title h3:first-child,.area-title h2:first-child').css({
    'padding-top': '50px'
  })

  $('.area-title').css({
    'margin-bottom': '50px'
  })

  $('.area').css({
    'padding-top': '20px'
  })

  $('.area-5 .description').css({
    top: '0%',
    left: '20%'
  })
}


$(document).ready(function() {
  var headerNav = $('header nav')
  $('.burger-btn').click(function() {
    headerNav.toggle(500)
  })

  $.get('http://127.0.0.1:8080',function(res){
    console.log(res)
  })
})
