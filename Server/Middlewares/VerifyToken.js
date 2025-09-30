const jwt = require("jsonwebtoken");
const env = require("dotenv");
const session = require("express-session");

env.config();
const secretKey = process.env.SECRET_KEY;

function verifyToken(req, res, next) {
  const sessionToken = req.session.token;
  if (sessionToken) {
    req.user = jwt.decode(sessionToken);
    return next();
  } else {
    return res.status(401).json({ message: "No autorizado" });
  }
}

module.exports = verifyToken;
