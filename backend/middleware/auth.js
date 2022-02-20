const jwt = require("jsonwebtoken")
require("dotenv").config()

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1]
        const decodedToken = jwt.verify(token, process.env.SECRET_KEY)
        const userId = decodedToken.userId
        
        if (req.body.userId && req.body.userId !== userId) {
            throw "Utilisateur non-reconnu !"
        } else {
            next()
        }
    } 
    catch (error) {
        res.status(401).json({ error: error || "Requête non authentifiée !" })
    }
}


//////////////////////////////

// const jwt = require("jsonwebtoken");
// const config = require("../config/auth.config.js");

// const verifyToken = (req, res, next) => {
//   let token = req.headers["x-access-token"];

//   if (!token) {
//     return res.status(403).send({
//       message: "No token provided!"
//     });
//   }

//   jwt.verify(token, config.secret, (err, decoded) => {
//     if (err) {
//       return res.status(401).send({
//         message: "Unauthorized!"
//       });
//     }
//     req.userId = decoded.id;
//     next();
//   });
// };

// module.exports = verifyToken