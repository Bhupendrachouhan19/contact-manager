const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");

// @desc Register a user
// @route POST /api/users/register
// @access public
const registerUser = asyncHandler(async (req, res) => {
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
    res.status(404);
    throw new Error("User data is not valid!!");
  }
  
  res.json({message: "Register the user"})
});

// @desc Login the user
// @route POST /api/users/login
// @access public
const loginUser = asyncHandler(async (req, res) => {
  res.json({ message: "Login the user!" });
});

// @desc Current user information
// @route GET api/users/current
// @access private
const currentUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    user.status(404);
    throw new Error ("User not found. Please enter the correct UserId.")
  }
  res.status(201).json(user);
});

module.exports = { registerUser, loginUser, currentUser };
