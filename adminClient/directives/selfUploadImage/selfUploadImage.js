var angular = require('angular')
var templateUrl = require('./selfUploadImage.html')
require('./selfUploadImage.scss')

module.exports = angular.module('selfUploadImage', [])
  .directive('selfUploadImage', function($timeout, Upload) {
    return {
      restrict: 'E',
      scope: {
        text: '=',
        imageUrl: '='
      },
      // templateUrl: './directives/selfUploadImage/selfUploadImage.html',
      templateUrl: templateUrl,
      link: function(scope, element, attrs) {
        if(typeof(attrs.text) === 'undefined')
          scope.text = '上传图片'

        scope.$watch('imageUrl', function(newValue, oldValue) {
          scope.imagePlaceholderStyle = {
            'background-image': 'url(' + scope.imageUrl + ')'
          }
        })

        scope.uploadImage = function(file) {
          upload(file, function(response) {
            $timeout(function() {
              file.result = response.data;
              scope.imageUrl = '/upload/img/' + file.result.name
            })
          }, function(response) {
            if(response.status > 0)
              $log.log(response.status + ': ' + response.data)
          })
        }

        function upload(file, success, fail) {
          if(file && !file.$error) {
            file.upload = Upload.upload({
              url: '/admin/upload',
              file: file
            })
            file.upload.then(success, fail)
          }
        }

      }
    }
  })
