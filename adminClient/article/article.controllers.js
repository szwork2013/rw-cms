var angular = require('angular')
var _ = require('lodash')
require('./article.edit.scss')
var colorpicker = require('angular-bootstrap-colorpicker')
require('angular-bootstrap-colorpicker/css/colorpicker.css')


module.exports = angular.module('article.controllers', ['colorpicker.module'])
  .controller('ArticleBaseCtrl', function($scope, $log, $timeout, $state, Article,
    Category, $window, $mdSidenav, Upload) {

    $scope.init = function() {
      $scope.article = new Article()
      $scope.article.content = ''
      $scope.article.tags = []
      $scope.article.relationArticle = []
      $scope.article.category = $state.params.category ? $state.params.category._id :
        null
      $scope.selectedItem = $state.params.category
    }
    $scope.init()


    //显示隐藏选项菜单
    $scope.toogleSetting = function() {
      $mdSidenav('setting').toggle()
    }

    $scope.uploadFiles = function(file) {
      // $scope.f = file;
      upload(file, function(response) {
        $timeout(function() {
          file.result = response.data;
          $scope.uploadImgPath = '/upload/img/' + file.result.name
          $scope.article.content += '<img src="' + $scope.uploadImgPath +
            '" />'
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

    $scope.searchTextChange = function(searchText) {
      $log.log(searchText)
      var result = searchText ? $scope.categorys.filter(function(category) {
        return category.name.indexOf(searchText) === 0
      }) : $scope.categorys
      $scope.items = result.length === 0 ? $scope.categorys : result
      $log.log($scope.items)
    }

    $scope.selectedItemChange = function(item) {
      $scope.article.category = item === undefined ? undefined : item._id
    }

    $scope.showAll = function() {
      $scope.items = $scope.categorys
    }


    //关联文章
    $scope.changeRelationArticl = function(article) {
      if(article.checked) {
        $scope.article.relationArticle.push(article._id)
      } else {
        _.remove($scope.article.relationArticle, function(n) {
          return n == article._id
        })
      }
    }

    $scope.toogleList = function(category) {
      category.showArticle = !category.showArticle
    }




    $scope.cancel = function() {
      $window.history.back()
    }
  })


//新建
.controller('ArticleCreateCtrl', function($scope, $log, $controller, $timeout, Upload,
  $stateParams, Article, Category, $state, $window) {
  //继承
  angular.extend(this, $controller('ArticleBaseCtrl', {
    $scope: $scope
  }))

  //初始化
  $scope.publishButtonText = '发布'
  $scope.boundCategory = function() {
    //拿出分类及填充combobox
    Category.query(function(categorys) {
      $scope.categorys = _.toArray(categorys)

      Article.query(function(articles) {
        $scope.articles = _.toArray(articles)
        $scope.categorys.forEach(function(category) {
          category.showArticle = true
          var categoryArticles = _.filter($scope.articles, function(n) {
            return n.category == category._id
          })
          category.categoryArticles = _.isArray(categoryArticles) ?
            categoryArticles : [categoryArticles]
        })
      })

    })
  }

  $scope.boundCategory()

  $scope.create = function() {
    $scope.article.category = $scope.selectedItem._id
    $scope.article.$save(function(doc) {
      $log.log(doc)
      $scope.showToast(doc.message)
      $state.go('home.article.edit', {
        id: doc._id
      })
    })
  }

})

//编辑
.controller('ArticleEditCtrl', function($scope, $log, $controller, $timeout, Upload,
  $stateParams, Article, Category, $state, $window) {
  //继承
  angular.extend(this, $controller('ArticleBaseCtrl', {
    $scope: $scope
  }))

  $scope.boundCategory = function() {
    $scope.publishButtonText = "更新"

    //获取category
    Category.query(function(categorys) {
      //绑定分类
      $scope.categorys = _.toArray(categorys)
        //绑定文章
      Article.query(function(articles) {
        //获取所有文章
        $scope.articles = _.toArray(articles)


        //获取 article
        $scope.article = Article.get({
          id: $stateParams.id
        }, function() {
          $scope.article.publishDate = new Date($scope.article.publishDate)
            //查找类别combox初始项
          $scope.selectedItem = _.find($scope.categorys, function(
              category) {
              return category._id == $scope.article.category
            })
            //check关联文章
          $scope.article.relationArticle.forEach(function(_id) {
            var checkItem = _.find($scope.articles, function(
              n) {
              return n._id == _id
            })
            if(checkItem != undefined)
              checkItem.checked = true
          })
        })

        //绑定类别及关联文章
        $scope.categorys.forEach(function(category) {
          category.showArticle = true
          var categoryArticles = _.filter($scope.articles, function(n) {
            return n.category == category._id
          })
          category.categoryArticles = _.isArray(categoryArticles) ?
            categoryArticles : [categoryArticles]
        })
      })
    })
  }
  $scope.boundCategory()


  $scope.create = function() {
    $scope.article.category = $scope.selectedItem._id
    Article.update({
      id: $scope.article._id
    }, $scope.article, function(doc) {
      $log.log(doc)
      $scope.showToast(doc.message)
    }, function(err) {
      $log.log(err)
    })
  }
})
