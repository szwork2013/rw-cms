var angular = require('angular')

/**
 * 批量添加模板
 * #require不能放在函数中
 */
var _templatePath = {}
var _templates = ['frame', 'login', ['login', 'register'],
  'category', ['category', 'category.setting'],
  ['category', 'category.articles'],
  ['article', 'article.edit'], 'layout', 'aboutpage', 'homepage', 'author'
]
for(var i in _templates) {
  var _template = _templates[i]
  var _name
  if(typeof(_template) !== 'string') {
    _name = getTemplatePath(_template[0], _template[1])
    _templatePath[_template[1]] = require(_name)
  } else {
    _name = getTemplatePath(_template)
    _templatePath[_template] = require(_name)
  }
}

function getTemplatePath(templateName, other) {
  if(other) {
    return `./${templateName}/templates/${other}.html`
  } else {
    return `./${templateName}/templates/${templateName}.html`
  }
}



module.exports = angular.module('router', [])
  .config(function($stateProvider, $urlRouterProvider) {

    $stateProvider
      .state('home', {
        url: '',
        views: {
          'out-wrapper': {
            // templateUrl: 'frame/templates/frame.html'
            templateUrl: _templatePath.frame,
            controller: 'FrameCtrl'
          }
        }
      })

    .state('login', {
        url: '/login',
        views: {
          'out-wrapper': {
            templateUrl: _templatePath.login,
            controller: 'LoginCtrl'
          }
        }
      })
      .state('register', {
        url: '/register',
        views: {
          'out-wrapper': {
            templateUrl: _templatePath.register,
            controller: 'RegisterCtrl'
          }
        }
      })

    .state('home.category', {
      url: '/category',
      views: {
        'main': {
          templateUrl: _templatePath.category,
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
          templateUrl: _templatePath['category.setting'],
          controller: 'CategorySettingCreateCtrl'
        }
      }

    })


    .state('home.category.setting.edit', {
      url: '/:id',
      views: {
        'submain@home.category': {
          templateUrl: _templatePath['category.setting'],
          controller: 'CategorySettingEditCtrl'
        }
      }
    })


    .state('home.category.articles', {
      url: '/:id',
      views: {
        'submain': {
          templateUrl: _templatePath['category.articles'],
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
          templateUrl: _templatePath['article.edit'],
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
            templateUrl: _templatePath['article.edit'],
            controller: 'ArticleEditCtrl'
          }
        }
      })
      .state('home.layout', {
        url: '/layout',
        views: {
          'main': {
            templateUrl: _templatePath.layout,
            controller: 'LayoutCtrl'
          }
        }
      })

    .state('home.aboutpage', {
      url: '/aboutpage',
      views: {
        'main': {
          templateUrl: _templatePath.aboutpage,
          controller: 'AboutpageCtrl'
        }
      }
    })

    .state('home.homepage', {
      url: '/homepage',
      views: {
        'main': {
          templateUrl: _templatePath.homepage,
          controller: 'HomepageCtrl'
        }
      }
    })

    .state('home.author', {
      url: '/author',
      views: {
        'main': {
          templateUrl: _templatePath.author,
          controller: 'AuthorCtrl'
        }
      }
    })


    $urlRouterProvider.otherwise('/')
  })
