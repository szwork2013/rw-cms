var angular = require('angular')
var scss = require('./layout.scss')
var _ = require('lodash')

module.exports = angular.module('layout.controllers', [])
  .controller('LayoutCtrl', function($scope, Category, Layout, Upload) {
    $scope.layout = Layout.get()

    Category.query(function(categorys) {

      //绑定分类
      $scope.categorys = _.toArray(categorys)

      //check关联文章
      $scope.layout.nav.forEach(function(category) {
        var checkItem = _.find($scope.categorys, function(n) {
          return n._id == category._id
        })
        if(checkItem != undefined)
          checkItem.checked = true
      })
    })

    //关联文章
    $scope.changeNavCategory = function(category) {
      if(category.checked) {
        $scope.layout.nav.push(category)
      } else {
        _.remove($scope.layout.nav, function(n) {
          return n == category
        })
      }
    }

    $scope.update = function() {
      Layout.update({
        id: $scope.layout._id
      }, $scope.layout, function(data) {}, function(err) {
        console.log(err)
      })
    }


    //图片上传---------------------------
    $scope.$watch('layout.slideHeader.bigImgUrl', function(newValue, oldValue) {
      $scope.imageBackPlaceholderStyle = {
        'background-image': 'url(' + $scope.layout.slideHeader.bigImgUrl + ')'
      }
    })

    $scope.$watch('layout.slideHeader.smallImgUrl', function(newValue, oldValue) {
      $scope.imageRightPlaceholderStyle = {
        'background-image': 'url(' + $scope.layout.slideHeader.smallImgUrl + ')'
      }
    })

    $scope.$watch('layout.logoImg', function(newValue, oldValue) {
      $scope.imageLogoPlaceholderStyle = {
        'background-image': 'url(' + $scope.layout.logoImg + ')'
      }
    })

    $scope.uploadLogoImage = function(file) {
      upload(file, function(response) {
        $timeout(function() {
          file.result = response.data;
          $scope.layout.logoImg = '/upload/img/' + file.result.name
        })
      }, function(response) {
        if(response.status > 0)
          $scope.errorMsg = response.status + ': ' + response.data;
      })
    }

    $scope.uploadBgcImage = function(file) {
      upload(file, function(response) {
        $timeout(function() {
          file.result = response.data;
          $scope.layout.slideHeader.bigImgUrl = '/upload/img/' + file.result.name
        })
      }, function(response) {
        if(response.status > 0)
          $scope.errorMsg = response.status + ': ' + response.data;
      })
    }

    $scope.uploadRightImage = function(file) {
      upload(file, function(response) {
        $timeout(function() {
          file.result = response.data;
          $scope.layout.slideHeader.smallImgUrl = '/upload/img/' + file.result
            .name
        })
      }, function(response) {
        if(response.status > 0)
          $scope.errorMsg = response.status + ': ' + response.data;
      })
    }


    function upload(file, success, fail) {
      if(file && !file.$error) {
        file.upload = Upload.upload({
          url: '/admin/upload',
          file: file
        })
        file.upload.then(success, fail)

        file.upload.progress(function(evt) {
          file.progress = Math.min(100, parseInt(100.0 *
            evt.loaded / evt.total));
        })
      }
    }
  })
