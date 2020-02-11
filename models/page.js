var mongoose = require('mongoose') ;

var pageSchema = mongoose.Schema({

  title: {
    type: String,
    required: true
  },

  slug: {
    type: String
  },

  content: {
    type: String,
    required: true
  },

  sorting: {
    type: Number
  }
}) ;


var Page = mongoose.model('page',pageSchema) ;
module.exports = Page ;
