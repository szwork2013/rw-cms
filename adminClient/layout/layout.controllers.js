var angular = require('angular')
var scss = require('./layout.scss')
var _ = require('lodash')

module.exports = angular.module('layout.controllers', [])
  .controller('LayoutCtrl', function($scope, Category, Layout, Upload) {
    Layout.get(function(data) {
      $scope.layout = data

      Category.query(function(categorys) {

        //绑定分类
        $scope.categorys = _.toArray(categorys)

        $scope.layout.nav.forEach(function(category) {
          var checkItem = _.find($scope.categorys, function(n) {
            return n._id == category._id
          })
          if(checkItem != undefined)
            checkItem.checked = true
          else
            checkItem.checked = false
        })
      })
    })

    //关联文章
    $scope.changeNavCategory = function(category) {
      if(category.checked) {
        $scope.layout.nav.push(category)
      } else {
        _.remove($scope.layout.nav, function(n) {
          return n._id == category._id
        })
      }
    }

    $scope.update = function() {
      Layout.update({
        id: $scope.layout._id
      }, $scope.layout, function(doc) {
        $scope.showToast(doc.message)
      }, function(err) {
        console.log(err)
      })
    }
  })
