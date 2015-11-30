require('./index.scss')

var angular = require('angular')
var ngResource = require('angular-resource')
var ngMaterial = require('angular-material')
var ngMessages = require('angular-messages')
var uiRouter = require('angular-ui-router')
var ngCookies = require('angular-cookies')
var ngFileUpload = require('ng-file-upload')

//路由
var router = require('./router')
//初始化运行
var initRun = require('./initRun')
//controller
var article = require('./article')
var category = require('./category')
var login = require('./login')
var frame = require('./frame')
var layout = require('./layout')
var homepage = require('./homepage')
var aboutpage = require('./aboutpage')

var models = require('./models/models')

//directives
var selfUploadImage = require('./directives/selfUploadImage/selfUploadImage.js')

var angularMaterialCss = require('angular-material/angular-material.css')

//富文本
window.rangy = require('rangy')
window.rangy.saveSelection = require('rangy/lib/rangy-selectionsaverestore')
require('./directives/textangular/dist/textAngular-sanitize.min')
require('./directives/textangular/dist/textAngular.css')
require('./directives/textAngular')
require('font-awesome/css/font-awesome.css')


var app = angular.module('admin', ['ngSanitize', 'textAngular', ngFileUpload,
  uiRouter, ngCookies,
  ngMaterial, ngMessages, ngResource,router.name,initRun.name, article.name, login.name, frame.name,
  category.name,
  homepage.name, aboutpage.name, layout.name, models.name, selfUploadImage.name
])

.config(function($httpProvider, $locationProvider, $stateProvider,
  $urlRouterProvider,
  $mdThemingProvider) {

  //设置主题
  $mdThemingProvider.theme('default')
  //拦截http请求,进行验证
  $httpProvider.interceptors.push('LoginInterceptor')

})

.controller('ctrl', function($scope, $http, $state) {


})

module.exports = app
