// how do we know this is a npm project?
// A:

// what command do we run to start an npm project?
// A:

// how do we create the node_modules folder if it doesn't exist?
// A:

// what does the below chunk of code do?
// A:
const express = require('express');
const multer = require('multer');

// what is app?
// A:
const app = express();

// what is this configuring?
// A:
const upload = multer({
	dest: 'public/uploads',
});

// what do each of these statements do?
// write the answer next to the line of code
app.use(express.static('public')); // A:
app.use(express.urlencoded({ extended: true })); // A:
app.set('view engine', 'ejs'); // A:

// what type of variable is this?
// A:
let posts = [];

// what type of request is this? what does it do?
// A:
app.get('/', (request, response) => {
	// how many different responses can we write? list them.
	// A:
	// how many parameters does response.render use? list them.
	// A:
	// write out the render for index.ejs using the global variable
});

// what are the three parameters in this function?
// A:
app.post('/upload', upload.single('theimage'), (req, res) => {
	let currentDate = new Date();

	// what type of data structure is this?
	// A:
	let data = {
		text: req.body.text,
		date: currentDate.toLocaleString(),
		timestamp: currentDate.getTime(),
	};

	// why do we write this if statement?
	// A:
	if (req.file) {
		data.image = '/uploads/' + req.file.filename;
	}

	// what does the push function do?
	// A:
	posts.push(data);

	resopnse.redirect('/');
});

// what does the number signify?
// A:
// how do we access this on the web?
// A:
app.listen(6001, () => {
	console.log('server started on port 6001');
});

// continue answering the questions in the index.ejs
