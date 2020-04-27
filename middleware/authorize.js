const jwt = require('jsonwebtoken');
const config = require('config');

function authorize(req, res, next) {
	console.log('Auth API - Request body received at Express end via Angular', req.body, req.headers);
	const token = req.headers['x-auth-token']; //Not the right way, change later
	//const token = req.header('x-auth-token');
	if(!token) return res.status(401).send('Access denied. No token provided.');

	try {
		const decodedToken = jwt.verify(token, config.get('jwtPrivateKey'));	
		req.user = decodedToken;
		console.log('User logged by Express authorize API', req.user);
		next();
	}
	catch (error) {
		res.status(400).send('Invalid token.');
	}
	
}

module.exports = authorize;