var angular = require('angular')
var scss = require('./frame.scss')

module.exports = angular.module('frame.controllers', [])
  .controller('frameCtrl', function($scope, $http, Login) {
    $scope.openMenu = function($mdOpenMenu, ev) {
      originatorEv = ev
      $mdOpenMenu(ev)
    }
    $scope.logout = function() {
      Login.logout()
    }
  })
