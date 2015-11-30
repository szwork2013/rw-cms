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
  ngMaterial, ngMessages, ngResource, article.name, login.name, frame.name,
  category.name,
  homepage.name, aboutpage.name, layout.name, models.name, selfUploadImage.name
])

.config(function($httpProvider, $locationProvider, $stateProvider,
  $urlRouterProvider,
  $mdThemingProvider) {

  //设置主题
  $mdThemingProvider.theme('default')

  $httpProvider.interceptors.push('LoginInterceptor')

  $stateProvider
    .state('home', {
      url: '',
      views: {
        'out-wrapper': {
          templateUrl: 'frame/templates/frame.html'
        }
      }
    })

  .state('login', {
      url: '/login',
      views: {
        'out-wrapper': {
          templateUrl: 'login/templates/login.html',
          controller: 'LoginCtrl'
        }
      }
    })
    .state('register', {
      url: '/register',
      views: {
        'out-wrapper': {
          templateUrl: 'login/templates/register.html',
          controller: 'RegisterCtrl'
        }
      }
    })

  .state('home.category', {
    url: '/category',
    views: {
      'main': {
        templateUrl: 'category/templates/category.html',
        controller: 'CategoryCtrl'
      }
    }
  })

  .state('home.category.setting', {
    url: '/setting'
  })


  .state('home.category.setting.create', {
    url: '/create',
    views: {
      'submain@home.category': {
        templateUrl: 'category/templates/category.setting.html',
        controller: 'CategorySettingCreateCtrl'
      }
    }

  })


  .state('home.category.setting.edit', {
    url: '/:id',
    views: {
      'submain@home.category': {
        templateUrl: 'category/templates/category.setting.html',
        controller: 'CategorySettingEditCtrl'
      }
    }
  })


  .state('home.category.articles', {
    url: '/:id',
    views: {
      'submain': {
        templateUrl: 'category/templates/category.articles.html',
        controller: 'CategoryArticlesCtrl'
      }
    }
  })



  .state('home.article', {
    url: '/article',
  })

  .state('home.article.create', {
    url: '/create',
    views: {
      'main@home': {
        templateUrl: 'article/templates/article.edit.html',
        controller: 'ArticleCreateCtrl'
      }
    },
    params: {
      category: null
    }
  })

  .state('home.article.edit', {
      url: '/:id',
      views: {
        'main@home': {
          templateUrl: 'article/templates/article.edit.html',
          controller: 'ArticleEditCtrl'
        }
      }
    })
    .state('home.layout', {
      url: '/layout',
      views: {
        'main': {
          templateUrl: 'layout/templates/layout.html',
          controller: 'LayoutCtrl'
        }
      }
    })

  .state('home.aboutpage', {
    url: '/aboutpage',
    views: {
      'main': {
        templateUrl: 'aboutpage/templates/aboutpage.html',
        controller: 'AboutpageCtrl'
      }
    }
  })

  .state('home.homepage', {
    url: '/homepage',
    views: {
      'main': {
        templateUrl: 'homepage/templates/homepage.html',
        controller: 'HomepageCtrl'
      }
    }
  })

  $urlRouterProvider.otherwise('/')
})

.run(function($rootScope, $cookies, $state, Login) {
  $rootScope.isLogin = false
  Login.authUser(undefined,undefined,function(res){
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

  $rootScope.toUrl = function(url, params, options) {
    $state.go(url, params, options)
  }
})

.controller('ctrl', function($scope, $http, $state) {


})

module.exports = app
