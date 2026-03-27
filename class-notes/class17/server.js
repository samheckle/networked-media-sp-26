const express = require('express');

// new library!
const nedb = require('@seald-io/nedb');

const app = express();

// new! initialize database
const database = new nedb({ filename: 'mydatabase.txt', autoload: true });

// old! middleware
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

app.get('/', (request, response) => {
	// .insert() has 2 parameters
	// 1: object to be added
	let dataToBeAdded = {
		text: 'hi',
	};
	// 2: callback function, action to happen once data has been added (optional)
	database.insert(dataToBeAdded);

	response.send('<h1>server is working!</h1>');
});

app.post('/makePost', (request, response) => {
	// retrieve client data from request
	// request.body is undefined without using app.use(express.urlencoded({ extended: true }));
	console.log(request.body);

	let dataToBeAdded = {
		note: request.body.note,
	};

	// using the database.insert() replaces the global array we used in the past
	database.insert(dataToBeAdded);

	response.redirect('/post.html');
});

app.get('/api/entire-database', (request, response) => {
	// database.find() has 2 parameters
	// 1. object we are looking for
	// if we pass in empty object, we will get the entire database
	let query = {};
	// 2. callback function
	database.find(query, (err, foundData) => {
		if (err) {
			response.send('error in retrieving data');
		} else {
			response.json(foundData);
			// response.render("index.ejs", {clientData: foundData})
		}
	});
});

app.get('/api/notes', (request, response) => {
	// if we want to find all instances of a matching value
	let query = {
		// nedb syntax to check if "note" property exists in database item
		note: { $exists: true },
	};

	database.find(query, (err, foundData) => {
		if (err) {
			response.send('error in retrieving data');
		} else {
			// database searches for all items that match "note"
			// creates an array that is sent back to the client
			response.json(foundData);
		}
	});
});

app.listen(4005, () => {
	console.log('app is running on http://localhost:4005');
});
