const express = require('express');
const router = express.Router();
const _ = require('lodash');

const {User} = require('../models/user');
const {Content} = require('../models/content');
const {Like} = require('../models/like');


//Same click will also initiate delete
//Check whether to run post or delete - how?
//identify if like row exists based on user and content
//can delete code be run within post? - lets see

router.post('/', async(req, res) => {

  //Expects a user id which authorise api gives
  //Expects a content id which can be get on click - how - lets assume it so for now
  await Like.find().and([{ userID: req.user.userID}, {content: req.body.contentID }]).deleteOne(); 

  //reduce like count - if block?
  //get contents like count
  const likeCount = await Content.where({content: req.body.contentID}).findOneAndUpdate({$inc: {likeCount: 1}});

  like = new Like(_.pick(req.body, ['userID', 'contentID']));

  await like.save();

  //send new likeCount as reponse with user and content id

  res.send(likeCount);
});

module.exports = router;