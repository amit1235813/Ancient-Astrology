const express = require('express');
const router = express.Router();
const _ = require('lodash');

const {User} = require('../models/user');
const {Feedback, validate} = require('../models/feedback');

router.post('/', async(req, res) => {
  //user should appear in the req object beng passed by the authorize api
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);
  //console.log('Req body', req.body);
  //console.log('Req user', req.user);
  //req.user.userID = req.user._id;
  //_id should be assinged by mongodb for the object
  //feedbackText = _.pick(req.body, 'feedbackText');
  feedback = new Feedback({
  	"feedbackText": req.body.feedbackText,
    "feedbackType": req.body.feedbackType,
  	"userID": req.user._id
  });
  //feedback = new Feedback(req.user, _.pick(req.user, ['feedbackText','userID', 'firstname'])); //get the email of user too
  //console.log(feedback);
  //should not pick _id from here
  await feedback.save();

  res.send(_.pick(feedback, ['feedbackText', 'feedbackType', '_id', 'userID', 'username'])); //Can this code be shortened by using select
  //Do we need so many items in response
});

//Function to display all feedback to a user
//Need to send user ID in request which comes from the authorise api
router.get('/', async(req, res) => {
  console.log('Get request', req.user._id);
  const feedback = await Feedback.find({ userID: req.user._id}); //.select('__id firstname'); 
  console.log('Feedback', feedback);
  res.send(_.map(feedback, _.partialRight(_.pick, ['feedbackText', 'feedbackType', '_id'])));
  //Learn what is ahppening here
});
//Lodash is dealign with an array of objects

//Function to display all feedback to a user - for an admin - will need user id

module.exports = router;