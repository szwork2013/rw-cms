var angular = require('angular')
var _ = require('lodash')
require('./article.edit.scss')


module.exports = angular.module('article.controllers', [])
  .controller('ArticleCreateCtrl', function($scope, $timeout, $state, Article, Category, $window, $mdSidenav,Upload) {
    $scope.toogleSetting = function() {
      $mdSidenav('setting').toggle()

    }


    $scope.uploadFiles = function(file) {
      $scope.f = file;
      if(file && !file.$error) {
        file.upload = Upload.upload({
          url: '/admin/upload',
          file: file
        })

        file.upload.then(function(response) {
          $timeout(function() {
            file.result = response.data;
            $scope.path = '/images/' + file.result.name
              //$scope.news.content += '<img src="' + $scope.path + '">'
          })
        }, function(response) {
          if(response.status > 0)
            $scope.errorMsg = response.status + ': ' + response.data;
        })

        file.upload.progress(function(evt) {
          file.progress = Math.min(100, parseInt(100.0 *
            evt.loaded / evt.total));
        })
      }
    }


    $scope.article = new Article()
    $scope.article.content = ''
    $scope.article.tags = []
    $scope.article.relationArticle = []
    Category.query(function(categorys) {
      $scope.categorys = _.toArray(categorys)
      Article.query(function(articles) {
        $scope.articles = _.toArray(articles)

        $scope.categorys.forEach(function(category) {
          category.showArticle = true
          var categoryArticles = _.filter($scope.articles, function(n) {
            return n.category == category._id
          })
          category.categoryArticles = _.isArray(categoryArticles) ? categoryArticles : [categoryArticles]

        })
      })
    })

    $scope.openList = function(category) {
      category.showArticle = !category.showArticle
    }

    $scope.changeRelationArticl = function(article) {
      if(article.checked) {
        $scope.article.relationArticle.push(article._id)
      } else {
        _.remove($scope.article.relationArticle, function(n) {
          return n == article._id
        })
      }
    }

    $scope.querySearch = function(searchText) {
      var result = searchText !== '' ? $scope.categorys.filter(function(category) {
        return category.name.indexOf(searchText) === 0
      }) : $scope.categorys
      $scope.items = result
    }

    $scope.create = function() {
      $scope.article.category = $scope.selectedItem._id
      $scope.article.$save(function(data) {
        $state.go('category.articles', {
          id: $scope.article.category
        })
      }, function(err) {
        console.log(err)
      })
    }

    $scope.cancel = function() {
      $window.history.back()
    }

    $scope.showAll = function(){
      $scope.items =  $scope.categorys
    }
  })


//---------------------
.controller('ArticleEditCtrl', function($scope, $timeout, Upload, $stateParams, Article, Category, $state, $window) {

  $scope.uploadFiles = function(file) {
    $scope.f = file;
    if(file && !file.$error) {
      file.upload = Upload.upload({
        url: '/admin/upload',
        file: file
      })

      file.upload.then(function(response) {
        $timeout(function() {
          file.result = response.data;
          $scope.path = '/upload/img/' + file.result.name
            //$scope.news.content += '<img src="' + $scope.path + '">'
        })
      }, function(response) {
        if(response.status > 0)
          $scope.errorMsg = response.status + ': ' + response.data;
      })

      file.upload.progress(function(evt) {
        file.progress = Math.min(100, parseInt(100.0 *
          evt.loaded / evt.total));
      })
    }
  }
  Category.query(function(categorys) {
    $scope.categorys = _.toArray(categorys)
    Article.query(function(articles) {
      $scope.articles = _.toArray(articles)

      //绑定类别及关联文章
      $scope.categorys.forEach(function(category) {
        category.showArticle = true
        var categoryArticles = _.filter($scope.articles, function(n) {
          return n.category == category._id
        })
        category.categoryArticles = _.isArray(categoryArticles) ? categoryArticles : [categoryArticles]

        $scope.article = Article.get({
          id: $stateParams.id
        }, function() {
          $scope.selectedItem = _.find($scope.categorys, function(category) {
            return category._id == $scope.article.category
          })
          $scope.article.relationArticle.forEach(function(_id) {
            var checkItem = _.find($scope.articles, function(n) {
              return n._id == _id
            })
            if(checkItem != undefined)
              checkItem.checked = true
          })
        })
      })
    })
  })

  $scope.create = function() {
    $scope.article.category = $scope.selectedItem._id
    Article.update({
      id: $scope.article._id
    }, $scope.article, function(data) {
      $state.go('category.articles', {
        id: $scope.article.category
      })
    }, function(err) {
      console.log(err)
    })
  }

  $scope.querySearch = function(searchText) {
    var result = searchText !== '' ? $scope.categorys.filter(function(category) {
      return category.name.indexOf(searchText) === 0
    }) : $scope.categorys
    return result
  }

  $scope.cancel = function() {
    $window.history.back()
  }

  $scope.openList = function(category) {
    category.showArticle = !category.showArticle
  }

  $scope.changeRelationArticl = function(article) {
    if(article.checked) {
      $scope.article.relationArticle.push(article._id)
    } else {
      _.remove($scope.article.relationArticle, function(n) {
        return n == article._id
      })
    }
  }
})
