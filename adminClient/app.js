var angular = require('angular')
var ngResource = require('angular-resource')
var ngMaterial = require('angular-material')
var ngMessages = require('angular-messages')
var uiRouter = require('angular-ui-router')
var ngCookies = require('angular-cookies')
var ngFileUpload = require('ng-file-upload')
var article = require('./article')
var category = require('./category')
var login = require('./login')
var models = require('./models/models')

var angularMaterialCss= require('angular-material/angular-material.min.css')

//markdown
//var ngSanitize = require('angular-sanitize')
//showdown = require('showdown')
//require('ng-showdown')

//富文本
window.rangy = require('rangy')
window.rangy.saveSelection = require('rangy/lib/rangy-selectionsaverestore')
require('../util/textangular/dist/textAngular-sanitize.min')
require('../util/textangular/dist/textAngular.css')
require('../util/textAngular')
require('font-awesome/css/font-awesome.css')


var app = angular.module('admin', ['ngSanitize','textAngular',ngFileUpload, uiRouter, ngCookies, ngMaterial, ngMessages, ngResource, article.name, login.name, category.name, models.name])

  .config(function ($httpProvider, $locationProvider, $stateProvider, $urlRouterProvider) {

    $httpProvider.interceptors.push('myInterceptor')

    $stateProvider
      .state('home', {
        url: '/',
        views: {}
      })

      .state('login', {
        url: '/login',
        views: {
          'main': {
            templateUrl: 'login/templates/login.html',
            controller: 'LoginCtrl'
          }
        }
      })
      .state('register', {
        url: '/register',
        views: {
          'main': {
            templateUrl: 'login/templates/register.html',
            controller: 'RegisterCtrl'
          }
        }
      })

      .state('category', {
        url: '/category',
        views: {
          'main': {
            templateUrl: 'category/templates/category.html',
            controller: 'CategoryCtrl'
          }
        }
      })

      .state('category.articles', {
        url: '/:id',
        views: {
          'submain': {
            templateUrl: 'category/templates/category.articles.html',
            controller: 'CategoryArticlesCtrl'
          }
        }
      })

      .state('article', {
        url: '/article',
      })

      .state('article.create', {
        url: '/create',
        views: {
          'main@': {
            templateUrl: 'article/templates/article.edit.html',
            controller: 'ArticleCreateCtrl'
          }
        }
      })

      .state('article.edit', {
        url: '/:id',
        views: {
          'main@': {
            templateUrl: 'article/templates/article.edit.html',
            controller: 'ArticleEditCtrl'
          }
        }
      })


    $urlRouterProvider.otherwise('/')
  })

  .run(function ($rootScope, $cookies, $state) {
    //TODO:登陆重定向
    $rootScope.$on('$stateChangeStart',
      function (event, toState, toParams, fromState, fromParams) {
        if (!$cookies.get('isLogin') && toState.name !== 'login') {
          event.preventDefault();
          $state.go('login')
        }
      })
  })

  .controller('ctrl', function ($scope, $http) {
    $scope.logout = function () {
      $http.post('/admin/logout', null, function (err, doc) {
        console.log(err, doc)
      })
    }
  })

module.exports = app
