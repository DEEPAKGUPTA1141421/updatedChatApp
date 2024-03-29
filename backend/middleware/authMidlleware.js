const jwt = require("jsonwebtoken");
const User=require('../models/userSchema');
const asyncHandler = require("express-async-handler");

module.exports.protect = asyncHandler(async (req, res, next) => {
  let token;
  const secret_key="deepakgupta";
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      //decodes token id
      const decoded = jwt.verify(token, secret_key);

      req.user = await User.findById(decoded.id).select("-password");
      next();
    } catch (error) {
      res.status(401);
      throw new Error("Not authorized, token failed");
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});