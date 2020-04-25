const express = require('express');
const app = express();

const Joi = require('@hapi/joi');
const mongoose = require('mongoose'); //Do not have to import mongoose for API functions of every sheet
const config = require('config');
const cors = require('cors');
const path = require('path');
const mime = require('mime-types');

if (!config.get('jwtPrivateKey')) {
	console.error('FATAL ERROR: jwtPrivateKey is not defined');
	process.exit(1);
}

const db = config.get('db');
console.log(db);
mongoose.connect(db)
	.then(() => console.log('Connected to MongoDB...'))
	.catch(() => console.error('Could not connect to MongoDB...'));

const authorize = require('./middleware/authorize');

const signup = require('./routes/signup');
const login = require('./routes/login');

const loggedIn = require('./routes/post-login');
const content = require('./routes/content');
const likes = require('./routes/likes');
const feedback = require('./routes/feedback');
require('./startup/prod')(app);

console.log(mime.lookup('json'));
console.log(mime.lookup('./index.js'));
console.log(mime.lookup('./dist/polyfills-es2015.js'));

app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname + '/dist//n/index.html'));
});

app.use(express.json());
app.use(cors());
app.use('/api/signup', signup);
app.use('/api/login', login);

app.use('/api/loggedIn', authorize);
app.use('/api/loggedIn/me', loggedIn);
app.use('/api/loggedIn/content', content);
app.use('/api/loggedIn/likes', likes);
app.use('/api/loggedIn/feedback', feedback);

const port = process.env.PORT || 3000;

const server = app.listen(port, () => console.log(`Listening on port ${port}...`)); //Change this to winston

module.exports = server; //where is server used