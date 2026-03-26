# Week 08: 3/26/26

## Agenda

1. Review Worksheet
2. Introduction to Databases
3. Tutorial: Setting up a database on our server

---

With Node.js we can use a variety of database engines such as MySQL, Postgres, MongoDB, and so on. At a very high level, most databases offer the following four types of operations:

- `find`, for looking up data in the database (e.g. for seeing all tweets sent by a user, on their profile page.)
- `insert`, for adding new data to the database (e.g. a Twitter user sending a new tweet)
- `update`, for updating existing data in the database (e.g. a Twitter user editing a tweet they’d already published), and
- `remove`, for deleting existing data from the database (e.g. a Twitter user removing their tweet)

Note: this looks _very similar_ to a structure we have seen before:

| Request  | Database Action | Info                                                   | Example                    |
| -------- | --------------- | ------------------------------------------------------ | -------------------------- |
| `GET`    | `find`          | retrieving information, usually a webpage or file      | visiting a webpage via url |
| `POST`   | `insert`        | sending information, usually via a form                | creating an account        |
| `PUT`    | `update`        | updating information on the server, usually via a form | updating a password        |
| `DELETE` | `remove`        | deleting information on the server, usually via a form | deleting an account        |

For ease-of-use purposes, we will be using a simple database called _nedb._ [nedb](https://www.npmjs.com/package/nedb) is a MongoDB compatible in-memory or on disk datastore that is quick and easy for us to work with without going through a big setup process. However, `nedb` is no longer maintained, so we are using a forked version called [`seald-io/nedb`](https://www.npmjs.com/package/@seald-io/nedb) that continues to be updated with the latest Node and updated dependencies.

In order to use it, we have to install it as we would any normal server side node module:

```
npm install @seald-io/nedb
```

Below is a quick reference to show you how to create a new database, as well as how the four types of operations mentioned above work. See the [**documentation**](https://github.com/seald/nedb?tab=readme-ov-file#documentation) for more.

### Creating a database

The code below imports the `nedb` library into our server-side code, and creates a file on disk which will store our data (the file is called `data.db` in this example. You can use any extension you like, `.db` isn’t mandatory.)

```jsx
// Importing the nedb library, and telling it to create a new datastore for us.
const nedb = require('@seald-io/nedb');
const db = new nedb({ filename: 'data.db', autoload: true });
```

Once you’ve created a database, you are ready to perform operations on it.

### Insert

Since the database operates by accessing the hard drive (and the hard drive is slow compared to the computer’s memory,) all operations are performed asynchronously, and results are delivered to us using a callback. The `insert` operation takes two arguments:

- the data we want inserted into the database
- a callback, which tells us whether the database encountered any errors, and confirms the data that was added.

```jsx
// Importing the nedb library, and telling it to create a new datastore for us.
const nedb = require('@seald-io/nedb');
const db = new nedb({ filename: 'data.db', autoload: true });

// Create a JavaScript Object with data to store
const datatosave = {
	name: 'sam',
	message: 'Hello world',
};

// Insert the data into the database
db.insert(datatosave, (err, newDocs) => {
	console.log('err: ', err);
	console.log('newDocs: ', newDocs);
});
```

If the operation completes successfully, the returned object (`newDocs` in the example above) should be identical to the data we passed for insertion, with one addition: an `_id` field, which the database uniquely assigns to all objects. The `_id` is useful in being able to uniquely identify each element in the database.

### Find

Finding data in a database requires us translating what we’re looking for into a _query_. Different databases use different formats for their queries. In `nedb`, a query is formatted as a regular Javascript object, with a few special fields which take different roles. Think of a query as a _filter_, which tells the database which objects to return. If the filter is empty, the database will return everything. The more specific the filter gets, the fewer elements will be returned.

Below are a few examples of queries.

```jsx
/*
...
Inserting four items into the database
...
*/
db.insert({ planet: 'earth', material: 'solid' } , (err, newDocs) => {});
db.insert({ planet: 'mars', material: 'solid' } , (err, newDocs) => {});
db.insert({ planet: 'venus', material: 'solid' } , (err, newDocs)=>{});
db.insert({ planet: 'jupiter', material: 'gas' } , (err, newDocs) => {});

// .. potentially other code

// Getting **all of the data** currently saved in the DB;
// We do that by passing an empty object as the query.
let query = {}
db.**find**(query, (err, results) => {
	console.log("results: ", results);
	// This will return all objects in the database
});

let marsQuery = { planet: 'mars' }
db.**find**(marsQuery, (err, results) => {
	console.log("results: ", results);
	// This will return one object, the { planet: 'mars', material: 'solid' } one.
})

let solidQuery = { material: 'solid' }
db.**find**(solidQuery, (err, results) => {
	console.log("results: ", results);
	// This will return three objects, ones which have. thesolid material attribute.
})

db.**findOne**(solidQuery, (err, result) => {
	console.log("result: ", result);
	// This will return **one** single object, arbitrary one among the solid material ones.
})
```
