angular.module('admin.controllers', [])


  //类别
  .controller('CategoryCtrl', function ($scope, Category) {
    $scope.categorys = Category.query()
  })

  //类别文章
  .controller('CategoryArticlesCtrl', function ($scope, $mdUtil, $timeout, $mdSidenav, $log, $stateParams, CategoryAtrticles, $mdDialog) {
    $scope.articles = CategoryAtrticles.get({
      categoryId: $stateParams.id,
      keys:['title','createDate']
    })

    $scope.preview = buildToggler('right');
    $scope.close = function () {
      $mdSidenav('right').close()
    }
    /**
     * Build handler to open/close a SideNav; when animation finishes
     * report completion in console
     */
    function buildToggler(navID) {
      var debounceFn = $mdUtil.debounce(function () {
        $mdSidenav(navID)
          .toggle()
          .then(function () {
            $log.debug("toggle " + navID + " is done");
          });
      }, 200);
      return debounceFn;
    }

  })

//新建文章
  .controller('ArticleCreateCtrl', function ($scope,$state, Article, Category, $window) {
    $scope.article = new Article()
    $scope.article.content= ''
    $scope.article.tags = []
    $scope.categorys = Category.query()
    $scope.querySearch = function (searchText) {
      var result = searchText !== '' ? $scope.categorys.filter(function (category) {
        return category.name.indexOf(searchText) === 0
      }) : $scope.categorys
      return result
    }

    $scope.$watch
    $scope.create = function () {
      $scope.article.category = $scope.selectedItem._id
      $scope.article.$save(function (data) {
        //$state.go('news.edit', {id: data._id})
        $state.go('category.articles',{id:$scope.article.category})
      },function(err){
        $log.log(err)
      })
    }

    $scope.cancel = function () {
      $window.history.back()
    }
  })


//弹窗设置注释
//$scope.status = '  ';
//$scope.showAdvanced = function (ev,data) {
//  $mdDialog.show({
//    controller: DialogController,
//    templateUrl: 'templates/article.preview.html',
//    parent: angular.element(document.body),
//    targetEvent: ev,
//    clickOutsideToClose: true,
//    locals:{
//      data:data
//    }
//  }).then(function (answer) {
//    $scope.status = 'You said the information was "' + answer + '".';
//  }, function () {
//    $scope.status = 'You cancelled the dialog.';
//  })
//}
//  function DialogController($scope, $mdDialog,data) {
//    $scope.article = data
//    $scope.hide = function () {
//      $mdDialog.hide()
//    }
//    $scope.cancel = function () {
//      $mdDialog.cancel()
//    }
//    $scope.answer = function (answer) {
//      $mdDialog.hide(answer)
//    }
//  }

