var angular = require('angular')
var style = require('./login.scss')

module.exports = angular.module('login.controllers', [])
  .controller('LoginCtrl', function($scope, $state, $cookies, Login) {
    $scope.login = function() {
      //写cookie

      Login.post($scope.author, function(state) {
        $state.go('/')
      }, function() {})
    }
  })

.controller('RegisterCtrl', function($scope, Author, $state) {
    $scope.author = new Author()
    $scope.submit = function() {
      $scope.author.$save(function(data) {
        $state.go('login', {})
      }, function(err) {
        console.log(err)
      })
    }
  })
  .directive('passwordSame', function() {
    return {
      restrict: 'A',
      //scope: ture,
      require: 'ngModel',
      link: function(scope, element, attributes, ngModel) {
        ngModel.$validators.passwordSame = function(modelValue) {
          if(scope.author != undefined)
            return modelValue == scope.author.password
        }
      }
    }
  })
