var angular = require('angular')
var scss = require('./category.scss')
var _ = require('lodash')

module.exports = angular.module('category.controllers', [])
  .controller('CategoryCtrl', function($scope, Category) {
    $scope.categorys = Category.query()

    $scope.deleteCategory = function(category) {
      Category.delete({
        id: category._id
      }, function(doc) {
        _.remove($scope.categorys, function(n) {
          return n._id == doc._id
        })
        $scope.showToast(doc.message)
      }, function(err) {
        console.log(err)
      })
    }
    $scope.isSetting = false
    $scope.titleTarget = 'home.category.articles'
    $scope.toggleSetting = function() {
      $scope.isSetting = $scope.isSetting ? false : true
      $scope.titleTarget = $scope.isSetting ?
        'home.category.setting.edit' :
        'home.category.articles'
    }
  })

.controller('CategoryArticlesCtrl', function($sce, $scope, $mdUtil, $timeout, $mdSidenav,
  $log, $stateParams, CategoryAtrticles, Article, $mdDialog) {
  $scope.getData = function(pageNum) {
    var defaultListNum = 10
    CategoryAtrticles.get({
      categoryId: $stateParams.id,
      keys: ['titles.default', 'createDate'],
      pageAgr: [pageNum, defaultListNum],
    }, function(data) {
      $scope.articles = _.toArray(data[0])

      $scope.articleCount = data[1]
      $scope.pageNum = Math.floor($scope.articleCount / defaultListNum) + 1
      if($scope.articleCount % defaultListNum == 0 && $scope.pageNum != 1) {
        $scope.pageNum--
      }
      $scope.range = function(num) {
        return new Array(num)
      }
    })
  }

  $scope.getData(1)

  $scope.del = function(article) {
    Article.delete({
      id: article._id
    }, function(doc) {
      $scope.close()
      _.remove($scope.articles, function(n) {
        return n._id == doc._id
      })
      $scope.showToast(doc.message)
    }, function(err) {
      console.log(err)
    })
  }


  $scope.preview = function(article) {
    $scope.previewArticle = Article.get({
      id: article._id
    })
    $sce.trustAsHtml($scope.previewArticle.content)
    buildToggler('right')()
  }


  $scope.deliberatelyTrustDangerousSnippet = function() {
    if($scope.previewArticle !== undefined)
      return $sce.trustAsHtml($scope.previewArticle.content)
  }
  $scope.close = function() {
      $mdSidenav('right').close()
    }
    /**
     * Build handler to open/close a SideNav; when animation finishes
     * report completion in console
     */
  function buildToggler(navID) {
    var debounceFn = $mdUtil.debounce(function() {
      $mdSidenav(navID)
        .toggle()
        .then(function() {
          $log.debug("toggle " + navID + " is done");
        });
    }, 200);
    return debounceFn;
  }
})

.controller('CategorySettingEditCtrl', function($scope, Category, $stateParams) {
  $scope.submitButtonText = '更新'
  $scope.category = Category.get({
    id: $stateParams.id
  })
  $scope.update = function() {
    Category.update({
      id: $scope.category._id
    }, $scope.category, function(doc) {
      $scope.showToast(doc.message)
    }, function(err) {
      console.log(err)
    })
  }


})


.controller('CategorySettingCreateCtrl', function($scope, Category, $stateParams, $state) {
  $scope.submitButtonText = '新建'
  $scope.category = new Category()
  $scope.update = function() {
    $scope.category.$save(function(doc) {
      $scope.showToast(doc.message)
      $state.go('home.category.setting.edit',{id:doc._id})
    }, function(err) {
      console.log(err)
    })
  }
})
