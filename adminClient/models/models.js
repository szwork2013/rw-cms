var angular = require('angular')

module.exports = angular.module('models', [])

.factory('LoginInterceptor', function($q, $injector, $location, $cookies) {
  var interceptor = {
    request: function(config) {
      if(config.url.split('/')[0] == 'login' || config.url.split('/')[2] == 'login') {
        $cookies.put('loginPage', true)
      } else {
        $cookies.put('loginPage', false)
      }
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
  return $resource('/admin/article/:id', ModelUtil.commonOpt.param, ModelUtil.commonOpt.method)
})

.factory('Category', function($resource, ModelUtil) {
  return $resource('/admin/category/:id', ModelUtil.commonOpt.param, ModelUtil.commonOpt.method)
})

.factory('CategoryAtrticles', function($resource, ModelUtil) {
  return $resource('/admin/category-articles/:categoryId?keys=:keys&&pageAgr=:pageAgr', null, {
    get: {
      method: 'GET',
      isArray: true
    }
  })
})

.factory('Author', function($resource, ModelUtil) {
  return $resource('/admin/author/:id', ModelUtil.commonOpt.param, ModelUtil.commonOpt.method)
})

.factory('Login', function($http) {
  return {
    post: function(doc, cb) {
      $http.post('/admin/login', doc, cb)
    }
  }
})
