// library imports
const express = require('express');
const multer = require('multer');
const nedb = require('@seald-io/nedb');
const cookieParser = require('cookie-parser');
const expressSession = require('express-session');
const nedbSession = require('nedb-promises-session-store');
const bcrypt = require('bcrypt');

// configurations which use the variables that store the libraries to set up the application
const app = express();
const upload = multer({
	dest: 'public/uploads',
});
// sets up normal database
let database = new nedb({
	filename: 'database.txt',
	autoload: true,
});
// sets up user database
const userdb = new nedb({
	filename: 'userdb.txt',
	autoload: true,
});
// sets up sessions database
const nedbSessionInit = nedbSession({
	connect: expressSession,
	filename: 'sessions.txt',
});

// middleware: what happens in between the initializations and the routes
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(cookieParser());
app.use(
	expressSession({
		store: nedbSessionInit,
		cookie: {
			maxAge: 1000 * 60 * 60 * 24 * 365, // arbitrary amount of time in future
		},
		secret: 'supersecret12345',
	}),
);

// routes
// i've moved these around so that the get requests are first
// GET means we are going to actually display the page
// for every page we want to display, we need a GET with a render
app.get('/', (req, res) => {
	res.render('index.ejs');
});
app.get('/make-post', (req, res) => {
	res.render('makepost.ejs');
});
app.get('/login-page', (request, response) => {
	response.render('login.ejs');
});
app.get('/signup-page', (request, response) => {
	response.render('signup.ejs');
});

// POST requests do not correspond to a page, but they are the handlers for the data that is sent via the forms (login form, signup form, and new post form)
// oftentimes they will redirect the user back to a page instead of rendering an ejs

// handler for login form
app.post('/authenticate', (request, response) => {
	// create our search query
	let searchedUser = {
		username: request.body.username,
	};
	// find a sigular user in the database (not accounting for users with the same username)
	userdb.findOne(searchedUser, (err, foundUser) => {
		// if the user is not found, redirect
		if (foundUser == null || err) {
			console.log('username not found');
			response.redirect('/login-page?user=null');
		} else {
			// if the user is found, check if the passwords match
			if (bcrypt.compareSync(request.body.pass, foundUser.password)) {
				// if the password matches, then store the user in the session and log them in
				let session = request.session;
				session.loggedInUser = foundUser.username;
				response.redirect('/');
			} else {
				// if the password does not match, redirect them to login again
				response.redirect('/login-page?password=invalid');
			}
		}
	});
});

// handler for signup form
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

// handler for making a new post
app.post('/new-post', upload.single('myupload'), (req, res) => {
	console.log(req.body);
	console.log(req.file);
	res.redirect('/');
});

// listen always goes at the end and starts the server running
app.listen(4001, () => {
	console.log('server has started');
});
