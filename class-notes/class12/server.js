// these are two of the three libraries we have installed that we need to make adjustments for
const express = require('express');
const multer = require('multer');

// set up our applications that use our libraries
const app = express(); // using the express library to start an express application
const uploadProcessor = multer({ dest: 'public/uploads/' }); // uses the multer library to upload files

// middleware settings for our server
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs'); // enable the ability to render ejs files

// global array to store all the posts
let posts = [];

// routes
app.get('/', (request, response) => {
	// just like class 11, we are sending the server data (the global posts array) to the client
	// the variable we are creating and sending to the client is "allPosts", which we access on client-side ejs
	response.render('index.ejs', { allPosts: posts });
});

// adding a second parameter to the post handler to process the file that is uploaded
// multer can accept most file types (png, jpg, gif) but cannot accept svg which was my issue in class :)
app.post(
	'/makePost',
	uploadProcessor.single('myImage'),
	(request, response) => {
		// just like class 11, we add an object parsing the body from the client form
		let individualPost = {
			caption: request.body.caption,
		};
		// NEW request.file is automatically populated from multer/uploadProcessor
		// checking if file exists, then add it
		if (request.file) {
			individualPost.file = request.file.filename;
		}
		// printing out the post to the server console
		console.log(individualPost);
		// adding the post to the post array
		posts.push(individualPost);
		// redirect the client back to the / route
		response.redirect('/');
	},
);

// LAST STEP: LISTEN FOR REQUESTS
app.listen(5001, () => {
	console.log('server is running on 5001');
});
