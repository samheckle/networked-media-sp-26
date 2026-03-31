// imports the dotenv library
// and allows us to access variables inside .env file
// by using process.env.VARIABLE_NAME
require('dotenv').config();
// importing the masto api that we will use
const m = require('masto');

// setup the ability to use the masto library
// this is very similar to making app
// const app = express()
const masto = m.createRestAPIClient({
	url: 'https://networked-media.itp.io',
	accessToken: process.env.TOKEN,
});

// function makeStatus(){}
const makeStatus = async () => {
	// customize the text output to be random when we run the function
	let emojis = ['🫡', '💖', '🎉', '🤠'];
	// this grabs a random index between 0 - emoji.length
	// this number needs to be a whole number
	let randomSelection = Math.floor(Math.random() * emojis.length);

	const s = await masto.v1.statuses.create({
		status: emojis[randomSelection],
		visibility: 'private',
	});
	console.log(s.url);
};

// will post one status one time
// makeStatus();
// will post a status one time every 10 seconds
setInterval(makeStatus, 10000);
