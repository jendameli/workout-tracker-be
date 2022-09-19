const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../utils/serverConfig");

exports.authentificate = (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      return res.status(403).json({ error: "Access denied" });
    }
    const decodedToken = jwt.verify(token, JWT_SECRET);
    req.user = decodedToken;
    next();
  } catch (error) {
    return res.status(400).json({ error: error.message || "Invalid token" });
  }
};
