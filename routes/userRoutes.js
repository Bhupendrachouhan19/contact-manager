const express = require('express');
const router = express.Router();
const { registerUser, loginUser, currentUser } = require('../controllers/userController');
const validateToken = require('../middleware/validateTokenHandler');

router.route("/register/").post(registerUser);

router.route("/login/").post(loginUser);

router.route("/current/").get(validateToken, currentUser); // ABWA router.get("/current/", validateToken, currentUser); 
// Here validateToken and currentUser are acting as a middleware and when validateToken middleware completes its execution, then the next middleware i.e. currentUser middleware gets executed, because of the "next()" method used inside the validationToken middleware.

module.exports = router;