const asyncHandler = require('express-async-handler');
const Contact = require('../models/contactModel');
const { response } = require('express');

// Controller Functions or Route Handlers for handling various API requests:

// @desc Get all contacts
// @route GET /api/contacts
// @access private
const getContacts = asyncHandler (async (req, res) => {
  const contacts = await Contact.find({user_id: req.user.id}); // In Mongoose, the .find() method is used to query documents from a MongoDB collection based on specified conditions. It returns an array of documents that match the query criteria.
  res.status(200).json(contacts);
});

// @desc Create New contact
// @route POST /api/contacts
// @access private
const createContact = asyncHandler (async (req, res) => {
  console.log("The request body is: ", req.body);
  const { name, email, phone } = req.body;

  // if any of the field is empty, then it will throw an error.
  if (!name || !email || !phone) {
    res.status(400);
    throw new Error("Some Contact fields are empty!!");
  }

  const contact = await Contact.create({
    name,
    email,
    phone,
    user_id: req.user.id
  })
  res.status(201).json(contact);
});

// @desc Get the contact
// @route GET /api/contacts/:id
// @access private
const getContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found. Please enter the correct ContactID.");
  }
  res.status(200).json(contact);
});

// @desc Update the contact
// @route PUT /api/contacts/:id
// @access private
const updateContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found. Please enter the correct ContactID.");
  }

  // Verifying whether the contact that the logged-in user is trying to access was created by them only.
  if (contact.user_id.toString() !== req.user.id) {
    res.status(403);
    throw new Error("User don't have permission to update other user contacts.");
  }

  const updatedContact = await Contact.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
    },
    {
      new: true,
    }
  );

  res.status(200).json(updatedContact); // returns the updated information of the particular contact.
});

// @desc Delete the contact
// @route DELETE /api/contacts/:id
// @access private
const deleteContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found. Please enter the correct ContactID.");
  }

  // Verifying whether the contact that the logged-in user is trying to access was created by them only.
  if (contact.user_id.toString() !== req.user.id) {
    res.status(403);
    throw new Error("User don't have permission to delete other user contacts.")
  }

  await Contact.findByIdAndDelete(req.params.id);

  res.status(200).json(contact); // will return the deleted contact information.
});

module.exports = {
  getContacts,
  createContact,
  getContact,
  updateContact,
  deleteContact,
};