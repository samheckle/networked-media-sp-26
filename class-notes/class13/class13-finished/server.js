// how do we know this is a npm project?
// A: package.json

// what command do we run to start an npm project?
// A: npm init

// how do we create the node_modules folder if it doesn't exist?
// A: npm install
// we don't need to list all the libraries that are required because they already exist in the dependencies obj in the package.json

// what does the below chunk of code do?
// A: imports the libraries -- allows us to use the functionality of the libraries when we reference the variables express and multer
const express = require('express');
const multer = require('multer');

// what is app?
// A: creates an instance of express to use the server functionality
// similar to creating new Date(), just no "new" keyword
const app = express();

// what is this configuring?
// A: sets up where the images will be stored on my server at the location that is specified
// addendum: if uploads folder doesn't exist, create it
const upload = multer({ dest: 'public/uploads' });

// what do each of these statements do?
// write the answer next to the line of code
app.use(express.static('public')); // A: exposes and allows us to use the static files
app.use(express.urlencoded({ extended: true })); // A: allows us to use request.body, allows us to use request.file
app.set('view engine', 'ejs'); // A: enables use of ejs, response.render

// what type of variable is this?
// A: global array
let serverStoredPosts = [];

// what type of request is this? what does it do?
// A: GET request -- when the client makes a request at the "/" route, handle the request
app.get('/', (request, response) => {
	// how many different responses can we write? list them.
	// A: each request can only send one response: response.send(), response.render(), response.json(), response.redirect(), response.sendFile()
	// how many parameters does response.render use? list them.
	// A: 2: template.ejs and the data {} to be sent
	// write out the render for index.ejs using the global variable
	response.render('index.ejs', { clientPosts: serverStoredPosts });
});

// what are the three parameters in this function?
// A: 1st: route, 2nd: multer send the data from theimage to the folder destination, 3rd: callback function/action that happens when the route is hit
app.post('/upload', upload.single('theimage'), (req, res) => {
	let currentDate = new Date();

	// what type of data structure is this?
	// A: object {}, key: value
	// data.text, data["text"]
	let data = {
		text: req.body.text,
		date: currentDate.toLocaleString(),
		timestamp: currentDate.getTime(),
	};

	// why do we write this if statement?
	// A: checking if a file exists in the first place
	if (req.file) {
		data.image = '/uploads/' + req.file.filename;
	}

	// what does the push function do?
	// A: adds an item to the end of the array
	serverStoredPosts.push(data);

	res.redirect('/');
});

// what does the number signify?
// A: PORT -- where the website is "docked"
// how do we access this on the web?
// A: localhost:PORT
app.listen(6001, () => {
	console.log('server started on port 6001');
});

// continue answering the questions in the index.ejs
