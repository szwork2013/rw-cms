var angular = require('angular')
var scss = require('./frame.scss')

module.exports = angular.module('frame.controllers', [])
  .controller('frameCtrl', function($scope, $http, Login, Author) {
    Author.getSelfSetting(function(res) {
      $scope.username = Author.localName
    })
    $scope.openMenu = function($mdOpenMenu, ev) {
      originatorEv = ev
      $mdOpenMenu(ev)
    }
    $scope.logout = function() {
      Login.logout(function(res) {
        $scope.showToast(res.data.message)
      })
    }
  })
