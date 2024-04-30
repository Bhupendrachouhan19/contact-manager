const express = require("express");
const router = express.Router();

// Importing from the contact-controller:
const {
  getContacts,
  createContact,
  getContact,
  updateContact,
  deleteContact,
} = require("../controllers/contactController");


// Handling Multiple HTTP Methods per Route:
router.route("/").get(getContacts).post(createContact);
router.route("/:id").get(getContact).put(updateContact).delete(deleteContact);

module.exports = router;