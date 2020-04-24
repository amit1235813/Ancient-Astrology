const Joi = require('@hapi/joi');
const mongoose = require('mongoose');

const Content = mongoose.model('Content', new mongoose.Schema({
  //content will have multi level of headers
  //clickable property - should this be on frontend - yes
  //how do we sequence all data - in frontend i suppose
  headerLevelOne: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 50
  },
  headerLevelTwo: {
    type: String,
    minlength: 1,
    maxlength: 50,
    //required: function() { return this.headerLevelThree != null; },
    //Ensure this is there, if three is filled - do this later
  },
  //create Header three only if Header two exists
  headerLevelThree: {
    type: String,
    minlength: 1,
    maxlength: 50
  },
  likeCount: {
    type: Number
  }
}));

exports.Content = Content; 
