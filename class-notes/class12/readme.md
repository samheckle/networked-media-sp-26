# Week 06: 3/3/26

## Agenda

1. Reading Discussion #4 (25 min)
2. Tutorial: Uploading Images
3. Tutorial: Dynamic Pages using Express Route Parameters

---

## Tutorial: Uploading Images

In order to process images, we need to use another library to figure out where the images need to be stored in our file hierarchy. If we want the images to be accessible to the client, we need to store them inside the _public_ folder. To do this, we will create a new node project and install our previous libraries.

### Starting New Project

```sh
npm init
```

```sh
npm install express ejs multer
```

### Multer

Via the [multer docs](https://github.com/expressjs/multer?tab=readme-ov-file#installation):

> Multer adds a body object and a file or files object to the request object. The body object contains the values of the text fields of the form, the file or files object contains the files uploaded via the form.

In order to use multer, we need to add inside our client the `enctype` attribute to our form.

CLIENT

```html
<form action="/upload" method="post" enctype="multipart/form-data">
	<input type="file" name="myImage" />
</form>
```

SERVER

```js
// import our libraries
const multer = require('multer');
// this adds the files into the public folder
const uploadProcessor = multer({ dest: 'public/uploads/' });
```

```js
// add an additional parameter
app.post('/upload', uploadProcessor.single('myImage'), (request, response) => {
	// request.file is our file data coming through the name 'myImage'
	console.log(request.file);
	// request.body is the body of our request, with any text fields
	console.log(request.body);
	// handle the response in some way......
});
```

## Tutorial: Dynamic Pages using Express Route Parameters

We can add special parameters in each route to create unique pages, known as route parameters. They utilize the `:` to signify what the parameter might be. We can retrieve the unique url using `req.params`, just like we would do with `req.query` or `req.body`.

```js
app.get('/users/:userId', (req, res) => {
	res.send(req.params);
});
```

We might want to use this information to display unique profile data, which we can dynamically create with front-end javascript.
