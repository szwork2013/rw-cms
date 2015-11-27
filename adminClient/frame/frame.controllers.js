var angular = require('angular')
var scss = require('./frame.scss')

module.exports = angular.module('frame.controllers', [])
  .controller('frameCtrl', function($scope,$http) {
    $scope.openMenu = function($mdOpenMenu, ev) {
      originatorEv = ev
      $mdOpenMenu(ev)
    }
    $scope.logout = function() {
      $http.post('/admin/logout', null, function(err, doc) {
        console.log(err, doc)
      })
    }
  })
