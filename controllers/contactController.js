// @desc Get all contacts
// @route GET /api/contacts
// @access public
const getContacts = (req, res) => {
  res.status(200).json({ message: "Get all Contacts" });
};

// @desc Create New contact
// @route POST /api/contacts
// @access public
const createContact = (req, res) => {
  res.status(201).json({ message: "Create Contact" });
};

// @desc Get the contact
// @route GET /api/contacts/:id
// @access public
const getContact = (req, res) => {
  res.status(200).json({ message: `Get the Contact for ${req.params.id}` });
};

// @desc Update the contact
// @route PUT /api/contacts/:id
// @access public
const updateContact = (req, res) => {
  res.status(200).json({ message: `Update Contact for ${req.params.id}` });
};

// @desc Delete the contact
// @route DELETE /api/contacts/:id
// @access public
const deleteContact = (req, res) => {
  res.status(200).json({ message: `Contact Deleted for ${req.params.id}` });
};

module.exports = {
  getContacts,
  createContact,
  getContact,
  updateContact,
  deleteContact,
};