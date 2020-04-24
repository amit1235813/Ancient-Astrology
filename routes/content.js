const express = require('express');
const router = express.Router();
const Joi = require('@hapi/joi');
const _ = require('lodash');

const {Content} = require('../models/content');

router.post('/', async(req, res) => {
	//admin users can create new header levels
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  //How to identify if content headers already exist
  //Not checking it, can create duplicates though - figure out later
  //let content = await Content.findOne({ email: req.body.email});
  //if (content) return res.status(400).send('Content headers already created');

  content = new Content(_.pick(req.body, ['headerLevelOne', 'headerLevelTwo', 'headerLevelThree']));

  await content.save();

  res.send(_.pick(content, ['headerLevelOne', 'headerLevelTwo', 'headerLevelThree']));
});

router.get('/', async(req, res) => {
	//display all content
	//in what order
  const contentHeaders = await Content.find().select('-__v'); 
  res.send(contentHeaders);
});

function validate(content) {
  const schema = Joi.object({
    headerLevelOne: Joi.string().min(1).max(50).required(),
    headerLevelTwo: Joi.string().min(1).max(50),
    headerLevelThree: Joi.string().min(1).max(50), //ensure that three is not entered if two is blank
    //do this later - try the with or when function
  });

  return schema.validate(content);
}

module.exports = router;