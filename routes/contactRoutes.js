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

const validateToken = require("../middleware/validateTokenHandler");

router.use(validateToken); // This is one of the way to apply a middleware in order validate the JWT token on all the routes(this technique is mostly use when we have all the routes as protected routes.)

// Handling Multiple HTTP Methods per Route:
router.route("/").get(getContacts).post(createContact);
router.route("/:id").get(getContact).put(updateContact).delete(deleteContact);

module.exports = router;