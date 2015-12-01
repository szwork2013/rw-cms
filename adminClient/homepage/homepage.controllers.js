var angular = require('angular')
var scss = require('./homepage.scss')

module.exports = angular.module('homepage.controllers', [])
  .controller('HomepageCtrl', function($scope,Homepage) {
    $scope.homepage = Homepage.get()
    $scope.update = function() {
      Homepage.update({
        id: $scope.homepage._id
      }, $scope.homepage, function(doc) {
        $scope.showToast(doc.message)
      }, function(err) {
        console.log(err)
      })
    }
  })
