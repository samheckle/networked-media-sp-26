// npm install express multer @seald-io/nedb cookie-parser express-session nedb-promises-session-store bcrypt ejs
// old libraries
const express = require('express');
const multer = require('multer');
const nedb = require('@seald-io/nedb');
const cookieParser = require('cookie-parser');

// new libraries
const expressSession = require('express-session');
const nedbSession = require('nedb-promises-session-store');
const bcrypt = require('bcrypt');

// old configurations
const app = express();
const upload = multer({
	dest: 'public/uploads',
});
let database = new nedb({
	filename: 'database.txt',
	autoload: true,
});

// new configurations
const nedbSessionInit = nedbSession({
	connect: expressSession,
	filename: 'sessions.txt',
});
const userdb = new nedb({
	filename: 'userdb.txt',
	autoload: true,
});

// old middleware
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(cookieParser());
// new middleware
app.use(
	expressSession({
		store: nedbSessionInit,
		cookie: {
			maxAge: 1000 * 60 * 60 * 24 * 365, // arbitrary amount of time in future
		},
		secret: 'supersecret12345',
	}),
);

// new routes for our pages that contain our forms
app.get('/login-page', (request, response) => {
	response.render('login.ejs');
});

app.get('/signup-page', (request, response) => {
	response.render('signup.ejs');
});
// routes to handle whether or not we have logged in or create account
app.post('/register', (request, response) => {
	// encrypts the password so we don't store a plain password in db
	let encryptedPassword = bcrypt.hashSync(request.body.pass, 10);

	let userToBeAdded = {
		username: request.body.username,
		password: encryptedPassword,
	};

	userdb.insert(userToBeAdded, (err, insertedUser) => {
		console.log(insertedUser);
		response.redirect('/login-page');
	});
});

app.post('/authenticate', (request, response) => {
	// create our search query
	let searchedUser = {
		username: request.body.username,
	};
	userdb.findOne(searchedUser, (err, foundUser) => {
		if (foundUser == null || err) {
			console.log('username not found');
			response.redirect('/login-page?user=null');
		} else {
			if (bcrypt.compareSync(request.body.pass, foundUser.password)) {
				let session = request.session;
				session.loggedInUser = foundUser.username;
				response.redirect('/');
			} else {
				response.redirect('/login-page?password=invalid');
			}
		}
	});
});

app.listen(4001, () => {
	console.log('server has started');
});
