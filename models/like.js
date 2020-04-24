const Joi = require('@hapi/joi');
const mongoose = require('mongoose');

//One row for each like
const Like = mongoose.model('Like', new mongoose.Schema({
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  contentID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Content'
  }
}));

exports.Like = Like; 
