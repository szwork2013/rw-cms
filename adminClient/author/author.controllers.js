var angular = require('angular')
var style = require('./author.scss')

module.exports = angular.module('author.controllers', [])
  .controller('AuthorCtrl', function($scope,$log, $state, $cookies, Author) {


    Author.getSelfSetting(function(res) {
      $scope.author = {
        name: Author.localName
      }
    })
    $scope.submit = function() {
      Author.uploadSelfSetting($scope.author, function(res) {
        $scope.showToast(res.data.message)
      })
    }
  })
