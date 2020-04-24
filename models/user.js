const Joi = require('@hapi/joi');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const config = require('config');

const userSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 50,
  },
  lastname: {
    type: String,
    minlength: 1,
    maxlength: 50,
  },
  username: {
    type: String,
    required: true,
    minlength: 8,
    maxlength: 50,
    unique: true
  },
  email: { //add reg exp, clean validation
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
    unique: true
  },
  password: { //add length of hash password
    type: String,
    required: true,
    minlength: 8,
    maxlength: 1024
  },
  adminFlag: {
    type: Boolean,
    default: false
  }
});

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({_id: this._id, adminFlag: this.adminFlag, firstname: this.firstname}, config.get('jwtPrivateKey'));
  return token;
};

const User = mongoose.model('User', userSchema);

function validateUser(user) {
  const schema = Joi.object({
    firstname: Joi.string().min(1).max(50).required(),
    lastname: Joi.string().min(1).max(50),
    username: Joi.string().min(8).max(50).required(),
    email: Joi.string().min(5).max(255).required().email(), //email method validates email - read about it, clean validation
    password: Joi.string().min(8).max(24).required() //password cannot be more than 24 chars
  });

  return schema.validate(user);
}

exports.User = User; 
exports.validate = validateUser;