const jwt = require("jsonwebtoken");

const { JWT_SECRET, JWT_EXPIRATION } = require("./serverConfig");

exports.createJwtToken = (userData) => {
  const token = jwt.sign(userData, JWT_SECRET, { expiresIn: JWT_EXPIRATION });
  return token;
};
