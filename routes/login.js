const express = require('express');
const router = express.Router();
//do we need mongoose
const _ = require('lodash');
const bcrypt = require('bcrypt');
const Joi = require('@hapi/joi');

const {User} = require('../models/user');

router.post('/', async (req, res) => {
  console.log('Request body,', req.body);

  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  //Finding email here - Change this to username
  let user = await User.findOne({ email: req.body.email});
  //If email not found, show error
  if (!user) return res.status(400).send('User does not exist');

  //bcrypt module is comparing stored password with user sent password - how?
  //Stored password is encrypted
  const passwordValidity = await bcrypt.compare(req.body.password, user.password);
  //console.log(req.body.password);
  //console.log(user.password);

  //If password doesnt match, show error
  if (!passwordValidity) return res.status(400).send('Invalid password');

  //Calling the function to generate transaction ID created in the user model
  //Sends a token for future use in the post login process
  const token = user.generateAuthToken();
  console.log('Response token created by login API', token);
  //user.token = token; //Pasing token as the object for now - bad idea - change it to headers later
  //Response is a token
  //res.set('x-auth-token', token).send(_.pick(user, ['firstname', '_id']));
  //res.send(_.pick(user, ['firstname', '_id', 'token']));
  res.send({'token': token});
  //Once loggedn in, frontend can send a get req to /me api, we dont have to do it here

});

function validate(user) {
  const schema = Joi.object({
    email: Joi.string().min(5).max(255).required().email(), //email method validates email - read about it, clean validation
    password: Joi.string().min(8).max(24).required() //password cannot be more than 24 chars
  });

  return schema.validate(user);
}

module.exports = router;