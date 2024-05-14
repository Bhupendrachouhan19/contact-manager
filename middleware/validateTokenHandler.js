const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const validateToken = asyncHandler(async (req, res, next) => {
  let token;
  let authHeader = req.headers.Authorization || req.headers.authorization;

  if (authHeader && authHeader.startsWith("Bearer", 0)) {
    token = authHeader.split(" ")[1];

    // Verifying whether the JWT token sent in the Request is valid or not
    jwt.verify(token, process.env.ACCESS_TOKEN_SECERET, (err, decoded) => {
      if (err) {
        // err: An error object, which will be 'null' if the token is successfully verified.
        res.status(401);
        throw new Error("User is not authorized");
      }

      console.log("Inside ValidateToken");

      //  console.log(decoded); // prints decoded payload of JWT Token.

      req.user = decoded.user; // appending the JWT property (name 'user') from the payload of JWT data, to the 'req' object represents the HTTP request that is received by the server from the client.

        // console.log(req);

      next(); // Its a middleware which rather than returning Response back to the client, passes the control to the next middleware function in the middleware stack.
    });

    if (!token) {
      res.status(401);
      throw new Error(
        "User is not authorized or token is missing in the request."
      );
    }
  }
});

module.exports = validateToken;
