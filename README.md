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

