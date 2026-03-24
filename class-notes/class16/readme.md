# Week 08: 3/24/26

## Agenda

1. Reading Discussion #5 (25 min)
2. Lecture: Intro to API
3. Tutorial: Setting up API on our server

---

## Intro to API

Application Programming Interfaces (API) are ways for us to connect to servers that send data on the web.

We already know now that the internet is made up of clients and servers. Oftentimes we might want to set up a server that just sends information, rather than running an entire front-end.

### Review

When we request information from a server, it can be broken down into one of 8 different types of requests. We will pretty much only work with 4:

| Request  | Info                                                   | Example                    |
| -------- | ------------------------------------------------------ | -------------------------- |
| `GET`    | retrieving information, usually a webpage or file      | visiting a webpage via url |
| `POST`   | sending information, usually via a form                | creating an account        |
| `PUT`    | updating information on the server, usually via a form | updating a password        |
| `DELETE` | deleting information on the server, usually via a form | deleting an account        |

See WizardZines for an explanation on all the requests:

- [Part 1](https://wizardzines.com/comics/request-methods-1/)
- [Part 2](https://wizardzines.com/comics/request-methods-2/)

Specifically, a lot of servers use Representational State Transfer (REST) as the core schematic for constructing a request.

### Adding a new type of response

We can only use _one_ of these responses at the end of each request handler.

- `response.send()` → send one line of html
- `response.redirect()` → redirect to a different route
- `response.sendFile()` → redirect to a different page
- `response.render()` → render a template

Now we are adding a fifth option:

- `response.json()` → send json data

### Sending Data From Server → Client

In `server.js`, create a new route:

```js
// This is an endpoint we can access to view all messages.
app.get('/api/messages', (request, response) => {
	if (receivedData.length == 0) {
		// If we don't have any data, we send an appropriate message
		response.send('No messages yet...');
	} else {
		// This will send a JSON response, populated with our data array.
		response.json({ messages: receivedData });
	}
});
```

This could be accessed on our client by going to the `/api/messages` route in the URL, but we can also retrieve and use the json data with our client-side javascript.

### Using `fetch()`, `async` and `await`

Something else we will continuously look at are `asynchronous functions`.
[Asynchronous](https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Async_JS/Introducing) allows us to simultaneously run different lines of code, as opposed to running them sequentially. This is because making a request to another server will take a little longer than rendering something on our own webpage. But, if we want to modify our own data on our client we need to be able to wait for the request to complete.

- [`fetch()`](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch) allows us to make a request to a URL with javascript
- [`async`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function) goes in the function header to declare a function as `asynchronous`, or enabling multiple actions at once
- [`await`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/await) tells the asynchronous function to wait for a specific response before continuing

`async`/`await` always work in tandem -- you shouldn't really use one without the other.

In our client javascript (`main.js`):

```js
const getMessages = async () => {
	let response = await fetch('/api/messages');
	let json = await response.json();
};
```

### Sending Data From Client → Server

Right now our JSON response is empty, so we should populate it with front-end javascript. Essentially what we are doing is contructing a request using _just_ javascript. Instead of using a form, we will use this method.

In our client javascript (`main.js`):

```js
const sendMessage = async () => {
	let params = new URLSearchParams({
		clientData: 'some-data',
	});

	let url = '/api/new-message?' + params;

	let response = await fetch(url);
};
```

In `server.js`, create a new route:

```js
app.get('/api/new-message', (request, response) => {
	// the data is coming over the url
	// we access this via the query
	// request.query
	receivedData.push(request.query);
	response.send("data added! <a href='/api/messages/'> see json </a>");
});
```

I typically do not use [status codes](https://en.wikipedia.org/wiki/List_of_HTTP_status_codes) in [express](https://expressjs.com/en/5x/api.html#res.status), but APIs are good practice to use them!

### Related Coding Train Videos

- [`fetch()`](https://thecodingtrain.com/tracks/data-and-apis-in-javascript/data/1-client-side/1-fetch)
- [`async`/`await` 1](https://thecodingtrain.com/tracks/topics-in-native-javascript/js/async-await-part-1)
- [`async`/`await` 2](https://thecodingtrain.com/tracks/topics-in-native-javascript/js/async-await-part-2)
