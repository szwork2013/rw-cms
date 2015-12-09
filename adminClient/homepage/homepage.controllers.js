var angular = require('angular')
var scss = require('./homepage.scss')
var _ = require('lodash')

module.exports = angular.module('homepage.controllers', [])
  .controller('HomepageCtrl', function($scope, $log, Homepage, Category) {
    Category.query(function(categorys) {
      $scope.categorys = _.toArray(categorys)

      Homepage.get(function(homepage) {
        $scope.homepage = homepage
        $scope.homepage.area1 = $scope.homepage.area1 || {}
        $scope.homepage.area2 = $scope.homepage.area2 || {}
        $scope.homepage.area3 = $scope.homepage.area3 || {}

        //--------------
        $scope.selectedItem1 = _.find($scope.categorys, function(category) {
          return category._id == $scope.homepage.area1.category
        })
        $scope.selectedItem2 = _.find($scope.categorys, function(category) {
          return category._id == $scope.homepage.area2.category
        })
        $scope.selectedItem3 = _.find($scope.categorys, function(category) {
          return category._id == $scope.homepage.area3.category
        })
        $scope.searchTextChange1 = function(searchText) {
          var result = searchText ? $scope.categorys.filter(function(category) {
            return category.name.indexOf(searchText) === 0
          }) : $scope.categorys
          $scope.items1 = result.length === 0 ? $scope.categorys : result
        }

        $scope.selectedItemChange1 = function(item) {
          $scope.homepage.area1.category = item === undefined ? undefined :
            item._id
        }

        $scope.searchTextChange2 = function(searchText) {
          var result = searchText ? $scope.categorys.filter(function(category) {
            return category.name.indexOf(searchText) === 0
          }) : $scope.categorys
          $scope.items2 = result.length === 0 ? $scope.categorys : result
        }

        $scope.selectedItemChange2 = function(item) {
          $scope.homepage.area2.category = item === undefined ? undefined :
            item._id
        }

        $scope.searchTextChange3 = function(searchText) {
          var result = searchText ? $scope.categorys.filter(function(category) {
            return category.name.indexOf(searchText) === 0
          }) : $scope.categorys
          $scope.items3 = result.length === 0 ? $scope.categorys : result
        }

        $scope.selectedItemChange3 = function(item) {
            $scope.homepage.area3.category = item === undefined ? undefined :
              item._id
          }
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
