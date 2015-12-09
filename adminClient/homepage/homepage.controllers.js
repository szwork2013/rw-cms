var angular = require('angular')
var scss = require('./homepage.scss')
var _ = require('lodash')

module.exports = angular.module('homepage.controllers', [])
  .controller('HomepageCtrl', function($scope, $log, Homepage, Category) {
    $scope.init = function() {
      $scope.homepage.area1 = $scope.homepage.area1 || {}
      $scope.homepage.area2 = $scope.homepage.area2 || {}
      $scope.homepage.area3 = $scope.homepage.area3 || {}

      $scope.homepage.area1.items = []
      $scope.homepage.area2.items2 = []
      $scope.homepage.area3.items3 = []

      $scope.selectedItem1 = _.find($scope.categorys, function(category) {
        return category._id == $scope.homepage.area1.category
      })
      $scope.selectedItem2 = _.find($scope.categorys, function(category) {
        return category._id == $scope.homepage.area2.category
      })
      $scope.selectedItem3 = _.find($scope.categorys, function(category) {
        return category._id == $scope.homepage.area3.category
      })
    }

    //构造函数
    function searchTextChangeFn(area) {
      return function(searchText) {
        var result = searchText ? $scope.categorys.filter(function(
          category) {
          return category.name.indexOf(searchText) === 0
        }) : $scope.categorys
        area.items = result.length === 0 ? $scope.categorys : result
      }
    }

    function selectedItemChangeFn(area) {
      return function(item) {
        area.category = item === undefined ? undefined :
          item._id
      }
    }

    Category.query(function(categorys) {
      $scope.categorys = _.toArray(categorys)

      Homepage.get(function(homepage) {
        $scope.homepage = homepage
        $scope.init()

        //--------------
        $scope.searchTextChange1 = searchTextChangeFn($scope.homepage.area1)
        $scope.selectedItemChange1 = selectedItemChangeFn($scope.homepage.area1)
        $scope.searchTextChange2 = searchTextChangeFn($scope.homepage.area2)
        $scope.selectedItemChange2 = selectedItemChangeFn($scope.homepage.area2)
        $scope.searchTextChange3 = searchTextChangeFn($scope.homepage.area3)
        $scope.selectedItemChange3 = selectedItemChangeFn($scope.homepage.area3)

        //----------------
        $scope.update = function() {
          Homepage.update({
            id: $scope.homepage._id
          }, $scope.homepage, function(doc) {
            $scope.showToast(doc.message)
          }, function(err) {
            $log.log(err)
          })
        }

      })
    })
  })
