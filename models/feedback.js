const Joi = require('@hapi/joi');
const mongoose = require('mongoose');
const {User} = require('./user');

//One row for each feedback
const Feedback = mongoose.model('Feedback', new mongoose.Schema({
  feedbackText : {
    type: String,
    required: true,
    minlength: 15,
    maxlength: 1500
  },
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  feedbackType: {
    type: String, //fix values in fronted like in SurveyCTO app
    //Value can either be a Compliment or an Improvement
    required: true
  },
  username: {
    type: mongoose.Schema.Types.String,
    ref: 'User'
  }
  //Don't need content ID as ffedback ro compliment is generic on teh website
}));

//validate for tags and script injection, for length
function validateFeedback(feedback) {
  const schema = Joi.object({
    feedbackText: Joi.string().min(15).max(1500).required(),
    feedbackType: Joi.string()
    //do we need to add joi validaiton for feedback type
  });

  return schema.validate(feedback);
}


exports.Feedback = Feedback; 
exports.validate = validateFeedback;