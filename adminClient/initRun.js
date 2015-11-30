var angular = require('angular')

module.exports = angular.module('initRun', [])
  .run(function($rootScope, $cookies, $state, Login) {
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

    $rootScope.toUrl = function(url, params, options) {
      $state.go(url, params, options)
    }
  })
