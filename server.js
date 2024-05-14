// console.log("The server is started!!!");

// Setting up the Backend Express Server:

const express = require("express");
const dotenv = require("dotenv").config();

// API Routes:
const contactRoutes = require("./routes/contactRoutes");
const userRoutes = require("./routes/userRoutes")
const errorHandler = require("./middleware/errorHandler");
const connectDB = require('./config/dbConnections')

connectDB();

const app = express();

const port = process.env.PORT || 5000;

app.use(express.json()); // Built-in Middleware to parse the POST Request Body.

app.use("/api/contacts/", contactRoutes); // Here contactRoutes is a Router-middleware binded to our express-app using the ".use()" method for routing requests.

app.use("/api/users/", userRoutes); // Here userRoutes is a Router-middleware binded to our express-app using the ".use()" method for routing requests.

app.use(errorHandler); // Here errorHandler is the middleware, binded to our express-app using the ".use()" method for handling errors during API request-response cycle.

app.get('/', (req, res) => {
    res.send('Hello World!!!');
})

app.listen(port, () => {
  // This will listen on the specified port.
  console.log(`Server is running on port ${port}`);
});