require('./index.scss')

var angular = require('angular')
var ngResource = require('angular-resource')
var ngMaterial = require('angular-material')
var ngMessages = require('angular-messages')
var uiRouter = require('angular-ui-router')
var ngCookies = require('angular-cookies')
var ngFileUpload = require('ng-file-upload')

//controller
var article = require('./article')
var category = require('./category')
var login = require('./login')
var frame = require('./frame')
var layout = require('./layout')
var homepage = require('./homepage')
var aboutpage = require('./aboutpage')
var author = require('./author')


var models = require('./models/models')
var router = require('./router')
//directives
var selfUploadImage = require('./directives/selfUploadImage/selfUploadImage.js')

var angularMaterialCss = require('angular-material/angular-material.css')

//富文本
window.rangy = require('rangy')
window.rangy.saveSelection = require('rangy/lib/rangy-selectionsaverestore')
// require('./directives/textangular/dist/textAngular-sanitize.min')
// require('./directives/textangular/dist/textAngular.css')
// require('./directives/textAngular/dist/textAngular.min.js')
require('textangular/dist/textAngular-sanitize.min')
require('textangular/dist/textAngular.css')
var textAngular = require('textAngular')
require('font-awesome/css/font-awesome.css')


var app = angular.module('admin', ['ngSanitize', 'textAngular', ngFileUpload,
  uiRouter, ngCookies,
  ngMaterial, ngMessages, ngResource, article.name, login.name, frame.name,
  category.name,
  homepage.name, aboutpage.name, layout.name,author.name, models.name, router.name,selfUploadImage.name
])

.config(function($httpProvider, $locationProvider, $stateProvider,
  $urlRouterProvider,
  $mdThemingProvider) {

  //设置主题
  $mdThemingProvider.theme('default')

  $httpProvider.interceptors.push('LoginInterceptor')

})

.run(function($rootScope, $cookies, $state, Login, $mdToast) {
  //认证
  $rootScope.isLogin = false
  Login.authUser(undefined, undefined, function(res) {
    if(res.status !== 401) {
      $rootScope.isLogin = true
    }
  })

  //登陆重定向
  $rootScope.$on('$stateChangeStart',
    function(event, toState, toParams, fromState, fromParams) {
      if($rootScope.isLogin || toState.name === 'login') {
        $rootScope.isLogin = false
      } else {
        //先验证再进行页面跳转
        event.preventDefault()
        Login.authUser(toState, toParams, function(res) {
          if(res.status !== 401) {
            $rootScope.isLogin = true
            $state.go(toState.name, toParams)
          }
        })
      }
    })

  //包装state.go
  $rootScope.toUrl = function(url, params, options) {
    $state.go(url, params, options)
  }

  //显示消息
  $rootScope.showToast = function(message) {
    $mdToast.show(
      $mdToast.simple()
      .content(message)
      .position('top right')
      .hideDelay(3000)
    )
  }
})

.controller('Ctrl', function($scope,$log, $http, $state) {


})

module.exports = app
