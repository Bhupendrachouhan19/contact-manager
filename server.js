// console.log("The server is started!!!");

// Setting up the Backend Express Server:

const express = require("express");
const dotenv = require("dotenv").config();

const app = express();

const port = process.env.PORT || 5000;

app.get('/api/contacts/', (req, res) => {
    // Differnt types of response:

    // 1. Regular Message Response:
    // res.send('Get all contacts.')
    
    // 2. Regular JSON Response:
    // res.json({message: "This is the .json response for api/contacts"})
    
    // 3. JSON Response with custom status code:
    res.status(230).json({message: "OK"}); // json response with custom status code '230'
})

app.get('/', (req, res) => {
    res.send('Hello World!!!');
})

app.listen(port, ()=> {
    console.log(`Server is running on port ${port}`);
})