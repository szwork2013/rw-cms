var angular = require('angular')

module.exports = angular.module('models', [])
  //认证全局拦截
  .factory('LoginInterceptor', function($q, $injector, $location, $cookies) {
    var interceptor = {
      request: function(config) {
        return config; // 或者 $q.when(config);
      },
      response: function(response) { // 响应成功
        return response
      },
      requestError: function(rejection) {
        // 请求发生了错误,如果能从错误中恢复,可以返回一个新的请求或promise return response; // 或新的promise
        // 或者,可以通过返回一个rejection来阻止下一步
        // return $q.reject(rejection);
      },
      responseError: function(rejection) {
        //认证未通过转入登陆界面
        if(rejection.status == 401) {
          $injector.get('$state').go('login')
        }
        return rejection

        // 请求发生了错误,如果能从错误中恢复,可以返回一个新的响应或promise return rejection; // 或新的promise
        // 或者,可以通过返回一个rejection来阻止下一步
        // return $q.reject(rejection);
      }
    }
    return interceptor;
  })

.factory('ModelUtil', function() {
  return {
    commonOpt: {
      param: {
        id: '@_id'
      },
      method: {
        update: {
          method: 'PUT'
        }
      }
    },
  }
})

.factory('Article', function($resource, ModelUtil) {
  return $resource('/admin/article/:id', ModelUtil.commonOpt.param, ModelUtil.commonOpt
    .method)
})

.factory('Category', function($resource, ModelUtil) {
  return $resource('/admin/category/:id', ModelUtil.commonOpt.param, ModelUtil.commonOpt
    .method)
})

.factory('CategoryAtrticles', function($resource, ModelUtil) {
  return $resource(
    '/admin/category-articles/:categoryId?keys=:keys&&pageAgr=:pageAgr', null, {
      get: {
        method: 'GET',
        isArray: true
      }
    })
})

.factory('Layout', function($resource, ModelUtil) {
  return $resource('/admin/layout/:id', ModelUtil.commonOpt.param, ModelUtil.commonOpt
    .method)
})

.factory('Homepage', function($resource, ModelUtil) {
  return $resource('/admin/home/:id', ModelUtil.commonOpt.param, ModelUtil.commonOpt
    .method)
})

.factory('Aboutpage', function($resource, ModelUtil) {
  return $resource('/admin/about/:id', ModelUtil.commonOpt.param, ModelUtil.commonOpt
    .method)
})

.factory('Author', function($resource, ModelUtil) {
  return $resource('/admin/author/:id', ModelUtil.commonOpt.param, ModelUtil.commonOpt
    .method)
})

.factory('Login', function($http, $state) {
  return {
    toState: {
      name: 'home'
    },
    toParams: {},
    post: function(doc, cb) {
      var that = this
      $http.post('/admin/login', doc).then(function(res) {
        if(res.data === 'OK') {
          $state.go('home')
        }
      })
    },
    logout: function() {
      $http.post('/admin/logout', null).then(function(res) {
        if(res.data === 'OK') {
          $state.go('login')
        }
      })
    },
    authUser: function(toState, toParams, success, error) {
      if(toState !== undefined) {
        this.toState = toState
      }
      if(toParams !== undefined) {
        this.toParams = toParams
      }
      $http.get('/admin/auth-user').then(function(res) {
        if(res.status === 401) {
          $state.go('login')
        }
        success(res)
      })
    },
  }
})
