// import express to use the library
const express = require('express');

// initialize the express application
const app = express();

// set up middleware -- settings for my server
// public is the folder that will hold all of my front-end files
// all html, css, and front-end js will live there
app.use(express.static('public'));
// set my templating software
app.set('view engine', 'ejs');

// storing all my guests inside of a global server array
// this array will exist until my server restarts
let guestNames = [];

// route handlers
// server when you get a request at a location (url), do some action for it

// GET
// 1st param: location, route
// 2nd param: action to happen when the client makes this request
app.get('/', (request, response) => {
	response.send('<h1>hi</h1>');
});
app.get('/helloworld', (request, response) => {
	response.send('<h1>wow my first server!!!!!!</h1>');
});
app.get('/hi', (request, response) => {
	// allows the server to redirect to another route
	response.redirect('/helloworld');
});

app.get('/guestbook', (request, response) => {
	// allows our server to send and render our ejs as html to the client
	let dataToBeSent = {
		blah: 'hihihihih',
        firstGuest: guestNames[0]
	};
	// 1st param: name of the ejs file
	// 2nd param: object to be sent to the client
	response.render('guestbook.ejs', dataToBeSent);
});

// this route handles the request that is coming from the html form
app.get('/sign', (request, response) => {
	let name = request.query.guestName;
	// storing the names on my server side
	guestNames.push(name);
	console.log(guestNames);

	// response.send('thanks, ' + name);
	response.redirect('/guestbook');
});

// ALWAYS BE AT THE END OF OUR FILE
// express application please listen for requests coming in
// 1st param: port number we are using
// 2nd param: callback function, action to happen when the server is started
app.listen(8080, () => {
	// when we use our console.log inside of a server file, it will show up in the terminal NOT the browser console
	console.log('server has started!');
});
