# Week 10: 4/7/26

## Agenda

1. Reading Discussion #7
2. Tutorial: Integrating Databases with our Mastodon Bot

---

## Tutorial: Integrating Databases with our Mastodon Bot

[Download](https://download-directory.github.io/?url=https%3A%2F%2Fgithub.com%2Fsamheckle%2Fnetworked-media-sp-26%2Ftree%2Fmain%2Fclass-notes%2Fclass18) or duplicate the class 18 demo.

1. We will need to create the `.env` file.
2. We will also need to run `npm install`

We will make a `server.js` that the bot will make requests to, and will do all of our normal library and server imports.

Install our dependencies:

```sh
npm install express @seald-io/nedb jsdom
```

And set up our `server.js`

```js
const express = require('express');
const nedb = require('@seald-io/nedb');

const app = express();
const database = new nedb({ filename: 'mydatabase.txt', autoload: true });

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

app.listen(4005, () => {
	console.log('app is running on http://localhost:4005');
});
```

We want our bot to talk to our server, so let's set up a route that will send all the database data:

```js
app.get('/api/retrieve', (req, res) => {
	database.find({}, (err, foundData) => {
		response.json(foundData);
	});
});
```

But we don't have a way right now to add data.
What we have covered so far:

1. adding data with an html/ejs form
2. retrieving data using ejs
3. retrieving data with javascript

What is new to us today is _adding_ data with javascript. So let's modify our `bot.js` so that we can add data whenever we receive a mention.

We do need to import a library to parse HTML:

```js
const jsdom = require('jsdom');
```

Instead of a REST api, we need to use a socket API that will always listen for requests.

```js
const stream = m.createStreamingAPIClient({
	accessToken: process.env.TOKEN,
	streamingApiUrl: 'wss://networked-media.itp.io', // special url we use for sockets
});
```

Then we need to read the data from the notification:

```js
// async function to wait for the notification and reply to it
const reply = () => {
	// finding the specific route to watch for notifications
	// based off the stream client and the notification path
	const notificationSubscription = await stream.user.notification.subscribe();

	// makes sure objects exist in the returned obj before going through array
	for await (let notif of notificationSubscription) {
		// printing the structure to the console to see how to access data
		console.log(notif.payload.status.content);

		// local variables for each piece of data i want
		let type = notif.payload.type;
		let acct = notif.payload.account.acct;
		let replyId = notif.payload.status.id;
	}
}
// we need to call the reply function as a "listener", similar to app.listen
reply();
```

Then we check for "mentions"

```js
// if the type of notification is a mention
if (notif.payload.type == 'mention') {

    // parsing the html status content, otherwise we would send full html (which might be what you want!)
    const input = new jsdom.JSDOM(notif.payload.status.content);
	const text = input.window.document.querySelector('p').textContent;

	// send the data to the server using javascript and a fetch request
	await fetch('/api/add', {
	    method: "POST",
	    body: JSON.stringify(text),
        headers: {
            "Content-Type": "application/json"
        }
	})

	// create a status
	const status = await masto.v1.statuses.create({
		status: `@${acct} i've stored some data!`, // reply to user that originally mentioned
		visibility: 'public',
		in_reply_to_id: replyId, // id # of the mention post so that you reply in the thread
	});
}
```
