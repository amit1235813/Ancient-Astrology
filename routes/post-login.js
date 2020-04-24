const express = require('express');
const router = express.Router();

const {User} = require('../models/user');

router.get('/', async(req, res) => {
  const user = await User.findById(req.user._id).select('__id firstname'); 
  res.send(user);
});

module.exports = router;