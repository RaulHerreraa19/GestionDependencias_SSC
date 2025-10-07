const jwt = require("jsonwebtoken");
const env = require("dotenv");
const session = require("express-session");

env.config();

function verifyToken(req, res, next) {
  // const { session } = req;
  // console.log("Sesión actual:", session);
  // console.log("Token en sesión:", session ? session.token : null);
  // if (!session.token) {
  //   return res.status(401).send("No autorizado");
  // }
  // jwt.verify(session.token, process.env.JWT_SECRET, (err, decoded) => {
  //   if (err) {
  //     return res.status(401).send("No autorizado");
  //   }
  //   req.user = decoded;
  //   next();
  // });
}

module.exports = verifyToken;
