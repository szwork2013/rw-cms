var _ = require('lodash')
var staticContent = require('../common/message').staticContent

module.exports = {
  boundAdmin: function() {
    return {
      getAll: function*(next) {
        this.body = this.state.docs
        yield next
      },
      getById: function*(next) {
        this.body = this.state.doc
        yield next
      },
      create: function*(next) {
        this.body = this.state.doc
        this.state.message = staticContent.CREATE_SUCCESS
        yield next
      },
      updateById: function*(next) {
        this.body = this.state.doc
        this.state.message = staticContent.UPDATE_SUCCESS
        yield next
      },
      deleteById: function*(next) {
        this.body = this.state.doc
        this.state.message = staticContent.DELETE_SUCCESS
        yield next
      }
    }
  },

  //base crud
  init: function(model) {
    return {
      getAll: function*(next) {
        this.state.docs = yield model.find().sort({
          _id: -1
        }).exec()
        yield next
      },
      getById: function*(next) {
        this.state.doc = yield model.findById(this.params.id).exec()
        yield next
      },
      updateById: function*(next) {
        //this.state.doc = yield model.findByIdAndUpdate(this.params.id, this.request.body).exec()
        this.state.doc = yield model.findById(this.params.id).exec()
        var that = this
        _.forEach(this.request.body, function(n, key) {
          that.state.doc[key] = n
        })
        try {
          this.state.doc = yield this.state.doc.save()
          yield next
        } catch(err) {
          console.log(err)
          yield next
        }


      },
      create: function*(next) {
        try {
          this.state.doc = yield model.create(this.request.body)
        } catch(err) {
          console.log(err)
        }
        yield next
      },
      deleteById: function*(next) {
        this.state.doc = yield model.findByIdAndRemove(this.params.id).exec()
        yield next
      }
    }
  }
}
