const User = require("../models/User");
const { UnauthenticatedError } = require("../errors");
const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  // console.log(`auth header is  ${authHeader}`);
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new UnauthenticatedError("invalid authentication");
  }
  const token = authHeader.split(" ")[1];
  // console.log(token);
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    // console.log(payload);
    // attach the user to job routes
    // const user = User.findOne(payload.id).select('-password')
    // req.user =user

    req.user = { userID: payload.userID, name: payload.name };
    // console.log(req.user);
    next();
  } catch (error) {
    throw new UnauthenticatedError("invalid authentication");
  }
};

module.exports = auth;
