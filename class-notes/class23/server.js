// npm install express multer @seald-io/nedb cookie-parser ejs

// 1. import libraries
const express = require('express');
const multer = require('multer');
const nedb = require('@seald-io/nedb');
// new library
const cookieParser = require('cookie-parser');

// 2. variables / initializing using libraries
const app = express();
const upload = multer({
	dest: 'public/uploads',
});
const database = new nedb({
	filename: 'database.txt',
	autoload: true,
});

// 3. middleware
app.use(express.static('public')); // allows for front-end assets
app.use(express.urlencoded({ extended: true })); // allows for request.body
app.use(cookieParser()); // allows for request.cookies
app.set('view engine', 'ejs');

// 4. routes
app.get('/', (req, res) => {
	let totalVisits = 1;
	if (req.cookies.visits) {
		console.log(req.cookies.visits);
		console.log(typeof req.cookies.visits);
		totalVisits = parseInt(req.cookies.visits) + 1;
	}
	// response.cookie creates a cookie
	// it has 3 parameters:
	// 1: key name of the cookie in a string
	// 2: the initial starting value
	// 3: object of the attributes
	let hundredYears = Date.now() + 100 * 365 * 24 * 60 * 60 * 1000;
	res.cookie('visits', totalVisits, { expires: new Date(hundredYears) });
	res.render('index.ejs', {serverVisitCount: totalVisits});
});

// 5. serve the data using app.listen
app.listen(8080, () => {
	console.log('server is running');
});
