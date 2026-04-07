// imports the dotenv library
// and allows us to access variables inside .env file
// by using process.env.VARIABLE_NAME
require('dotenv').config();
// importing the masto api that we will use
const m = require('masto');
const jsdom = require('jsdom');

// setup the ability to use the masto library
// this is very similar to making app
// const app = express()
const masto = m.createRestAPIClient({
	url: 'https://networked-media.itp.io',
	accessToken: process.env.TOKEN,
});

const stream = m.createStreamingAPIClient({
	accessToken: process.env.TOKEN,
	streamingApiUrl: 'wss://networked-media.itp.io',
});

const reply = async () => {
	// waiting for account to receive notifications
	const notifications = await stream.user.notification.subscribe();

	for await (let notif of notifications) {
		// console.log(notif.payload);
		// notif.payload.status.content
		let type = notif.payload.type;
		// only filtering for mention notifications
		if (type == 'mention') {
			// allows us to parse the html content as if we were using front-end js
			const input = new jsdom.JSDOM(notif.payload.status.content);
			const text = input.window.document.querySelector('p').textContent;
			console.log(notif.payload.status.content);
			console.log('parsed text: ');
			console.log(text);

			// make a request to store info to my server
			// http://www.omdbapi.com/?apikey=[yourkey]&s=[movie search]
			await fetch('http://localhost:6001/api/add', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ content: text }),
			});
		}
	}
};

reply();
