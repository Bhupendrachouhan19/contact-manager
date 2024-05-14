const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Controller Functions or Route Handlers for handling various API requests:

// @desc Register a user
// @route POST /api/users/register
// @access public
const registerUser = asyncHandler(async (req, res) => {
  console.log("User Registered")

  const { username, email, password } = req.body;
  console.log("The Register User request body is: ", username, email, password);

  // if any of the field is empty, then it will throw an error.
  if (!username || !email || !password) {
    res.status(400);
    throw new Error("Some User field are empty!!");
  }

  // checking whether the user is already exists or not:
  const userAvailable = await User.findOne({email}) // returns a Promise that can be resolves to either 'NULL' or 'first document that matches the query criteria i.e. {email: email}'
  if (userAvailable) {
    res.status(400);
    throw new Error('User already exists!');
  }

  // Encrypting the raw password using 'bcrypt' library into a Hash,then storing that hash in the database.
  const encryptedPassword = await bcrypt.hash(password, 10); // 10 is f or the number of salt-rounds we want for the hashing of the raw password
  console.log("Encrypted Pass: ", encryptedPassword);

  // Creating New User:
  const user = await User.create({ username, email, password: encryptedPassword });
  console.log('User Created ', user);

  
  if (user) {
    res.status(201).json({_id : user._id, email: user.email, password: user.password});
  } else {
    res.status(400);
    throw new Error("User data is not valid!!");
  }
  
  res.json({message: "Register the user"})
});


// @desc Login the user
// @route POST /api/users/login
// @access public
const loginUser = asyncHandler(async (req, res) => {
  console.log("User LoggedIn")

  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }

  const user = await User.findOne({ email }); // .findOne() : It finds the single document that matches the specified criteria and returns a Mongoose Model Instance, or if no matching document is found, it return 'null'.

  // compare the plain-text-password with the hashed-password:
  if (user && (await bcrypt.compare(password, user.password))) {
    /*
    Every jwt token has 3 parts: 1. The Header, 2. The Payload, 3. The Secret Key. 
    
    The Header of the JWT token typically remains the same regardless of when the token is issued or regenerated. The header of a JWT token contains metadata about the token itself, such as the algorithm used to sign the token and the token type. This information is static and does not change between different JWT tokens issued by the same system.
    
    So below we are creating an accessToken by passing the Payload data and the Secret Key with the expiration-time of the accessToken.
    */
    const accessToken = jwt.sign(
      {
        user: {
          username: user.username,
          email: user.email,
          id: user._id,
        },
      },
      process.env.ACCESS_TOKEN_SECERET,
      { expiresIn: "15m" }
    );
    res.status(200).json({ accessToken });
  } else {
    res.status(400);
    throw new Error("Invalid Email or Password")
  }
});


// @desc Current user information
// @route GET api/users/current
// @access private
const currentUser = asyncHandler(async (req, res) => {
  console.log("Current User");

  // const user = await User.findById(req.user.id); // This method retrieves the entire user document from the database, including all fields stored in the document (e.g., _id, username, email, password, createdAt, updatedAt, __v)

  // req.user : Here Request object have the 'user' property because we have appended the decoded payload data (i.e. 'user') as a property to the Request object after the successfull verification of JWT token. (Refer validateTokenHandler.js file)

  if (!req.user) {
    res.status(404);
    throw new Error("User not found. Please enter the correct UserId.");
  }
  res.status(201).json(req.user);
});

module.exports = { registerUser, loginUser, currentUser };