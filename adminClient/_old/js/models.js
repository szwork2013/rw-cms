angular.module('admin.models', [])

// .factory('Common', function($http) {
//   var common = {}
//   var list = ['get', 'put', 'delete', 'post']

//   common.get = function(url, callback) {
//     $http.get(url).then(function(res) {
//       callback(res.data)
//     })
//   }

//   common.create = function(url, data, callback) {
//     $http.post(url, data).then(function(res) {
//       callback(res.data)
//     })
//   }

//   common.update = function(url, data, callback) {
//     $http.put(url, data).then(function(res) {
//       callback(res.data)
//     })
//   }

//   common.delete = function(url, callback) {
//     $http.delete(url).then(function(res) {
//       callback(res.data)
//     })
//   }

//   return common
// })

// .factory('News', function($http, Common) {
//   var url = '/admin/news';
//   return {
//     getAll: function(callback) {
//       Common.get(url, callback)
//     },
//     get: function(id, callback) {
//       Common.get(url + '/' + id, callback)
//     },
//     update: function(id, data, callback) {
//       Common.update(url + '/' + id, data, callback)
//     },
//     delete: function(id, callback) {
//       Common.delete(url + '/' + id, callback)
//     },
//     create: function(data, callback) {
//       Common.create(url, data, callback)
//     }
//   }
// })

  .factory('ModelUtil', function () {
    return {
      commonOpt: {
        param: {
          id: '@_id'
        },
        method: {
          update: {
            method: 'PUT'
          }
        }
      },
    }
  })

  .factory('Article', function ($resource, ModelUtil) {
    return $resource('/admin/article/:id', ModelUtil.commonOpt.param, ModelUtil.commonOpt.method)
  })

  .factory('Category', function ($resource, ModelUtil) {
    return $resource('/admin/category/:id', ModelUtil.commonOpt.param, ModelUtil.commonOpt.method)
  })

  .factory('CategoryAtrticles', function ($resource, ModelUtil) {
    return $resource('/admin/category-articles/:categoryId?keys=:keys',null,{
      get:{
        method:'GET',
        isArray:true
      }
    })
  })

  .factory('Author', function ($resource, ModelUtil) {
    return $resource('/admin/author/:id', ModelUtil.commonOpt.param, ModelUtil.commonOpt.method)
  })