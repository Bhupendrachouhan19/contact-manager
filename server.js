// console.log("The server is started!!!");

// Setting up the Backend Express Server:

const express = require("express");
const dotenv = require("dotenv").config();

// API Routes:
const contactRoutes = require("./routes/contactRoutes");
const errorHandler = require("./middleware/errorHandler");

const app = express();

const port = process.env.PORT || 5000;

app.use(express.json()); // Built-in Middleware to parse the POST Request Body.

app.use("/api/contacts/", contactRoutes); // Here app.use() works as a middleware routing requests.

app.use(errorHandler);

app.get('/', (req, res) => {
    res.send('Hello World!!!');
})

app.listen(port, ()=> {
  // This will listen on the specified port.
  console.log(`Server is running on port ${port}`);
})