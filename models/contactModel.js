const mongoose = require('mongoose');

const contactSchema = mongoose.Schema(
  {
    // Creating schema structure for our model('Contact') List the fields that we are going to have in our 'Contact' object.
    name: {
      type: String,
      required: [true, "Please add the contact name"],
    },
    email: {
      type: String,
      required: [true, "Please add the contact email address"],
    },
    phone: {
      type: String,
      required: [true, "Please add the contact phone number"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Contact", 'contactSchema'); // creating and exporting our Mongoose model named 'Contact'