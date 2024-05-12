const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      require: [true, "Please add the usename"],
    },
    email: {
      type: String,
      require: [true, "Please add the user email address"],
      unique: [true, "Email address aleady taken!"],
    },
    password: {
      type: String,
      require: [true, "Please add the use password"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema); // creating and exporting our Mongoose model named 'User'