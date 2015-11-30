var angular = require('angular')

module.exports = angular.module('router', [])
  .config(function($stateProvider, $urlRouterProvider) {

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
