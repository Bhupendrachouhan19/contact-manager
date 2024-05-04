## Basic Backend Folder Structure:
- .env
- package.json
- package-lock.json
- extras: (Readme.md, .git, lint, prettier, etc)

/src
  - index.js (db connects)
  - App.js (config, cookie, url_encode)
  - constants.js (enums, db_name)

/db (contains db_calls)
/models (contains db_schema_structure)
/controllers (contains functions)
/routes (contains url_paths)
/middlewares
/utils (contains code/functions which can be used in many places throughout the project)
/more (depends)


## Step to setup backend server using ExpressJS and NodeJS:
1. Initialise package.json using command : ```npm init```

```
// package.json

{
  "name": "mycontacts-backend-api",
  "version": "1.0.0",
  "description": "This is a express project for my contacts backend api",
  "main": "server.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "repository": {
    "type": "git",
    "url": "git+https://github.com/Bhupendrachouhan19/contact-manager.git"
  },
  "keywords": [
    "contact-manager"
  ],
  "author": "Bhupendra Chouhan",
  "license": "MIT",
  "bugs": {
    "url": "https://github.com/Bhupendrachouhan19/contact-manager/issues"
  },
  "homepage": "https://github.com/Bhupendrachouhan19/contact-manager#readme"
}
```

2. Create .gitignore, server.js, README.md files in the root directory.

3. Install ExpressJS package using command: ```npm install express```

4. Install Nodemon package as a Dev-dependency(It restarts the server whenever we make any changes to our application) using command: ```npm install -D nodemon```

5. Create an Express Server:

```
// server.js

const express = require("express");

const app = express();

const port = 5000;

app.get('/', (req, res)=>{
    res.send('Hello World!!!');
})

app.listen(port, ()=> {
    console.log(`Server is running on port ${port}`);
})
```

6. Set up the environmental variables inside the .env file:
    - Install the donenv package using command:  npm install dotenv
    - As we have installed dotenv, this will allow us to fetch the value of the port from the .env file, with the help of a module name 'process' (It's a core module of node.js).


```
// .env

PORT=5001
```

7. Serperate the API routes on NodeJS and Express
8. Setting up the Controller which contains the logic all to our CRUD request connection to our database.


---

## What are Middlewares in the backend?
- It is those methods/functions/operations that are called BETWEEN processing the Request and sending the Response in your application method.
- Express provides you with middleware to deal with the (incoming) data (object) in the body of the request.
- Every middleware(declared as ```app.use()```) gets executed sequentially, top-to-bottom as mentioned in the ```server.js``` file.

### What are a Schema Diagrams?
- Database schema is the logical:
  - View of the entire database.
  - These schema are obviously going to represent
