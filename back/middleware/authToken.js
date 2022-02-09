const db = require('../config/db')
const jwt = require("jsonwebtoken");

module.exports = {
  checkToken : (req, res, next) => {
    let token = req.headers["x-access-token"];

    if (!token) {
      return res.status(403).send({
      message: "No token provided ! tOKEN PAS RECONNU"
    });
    }

    jwt.verify(token, process.env.SECRET_TOKEN_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "Unauthorized!"
      });
    }
    req.userId = decoded.id;
    next();
  });
}
}

