var angular = require('angular')
var scss = require('./aboutpage.scss')

module.exports = angular.module('aboutpage.controllers', [])
  .controller('AboutpageCtrl', function($scope, Aboutpage) {
    $scope.aboutpage = Aboutpage.get()
    $scope.update = function() {
      Aboutpage.update({
        id: $scope.aboutpage._id
      }, $scope.aboutpage, function(data) {}, function(err) {
        console.log(err)
      })
    }
  })
