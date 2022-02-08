// const db = require('../config/db')
// const jwt = require("jsonwebtoken");

// module.exports = async (req, res, next) => {
//   try {
//     const token = req.headers.authorization.split(" ")[1];
//     const decodedToken = jwt.verify(token,process.env.SECRET_TOKEN_KEY);
//     const userId = decodedToken.userId;

//     if (req.body.userId && req.body.userId !== userId) {
//       throw "Identifiant non valide";
//     } else {
//       await User.findOne({ where: { id: userId } })
//       .then(user => {
//         req.user = user
//         next()
//       })
//     }
//   } catch (error) {
//     res.status(401).json({ error: error | "Requête non authentifiée" });
//   }
// };

//////////////////////////////////////////////////////////////////////////////

// to validate the token

const { verify } = require('jsonwebtoken');

module.exports = {
    checkToken: (req, res, next) => {
        let token = req.get("authorization");
        if(token) {
            token = token.slice(7); // removing the bearer which has 6 char
            verify(token,
                process.env.SECRET_TOKEN_KEY,
                (err, decoded) => {
                    if (err) {
                        res.json({
                            success: 0,
                            message: "Invalid token"
                        });
                        
                    } else {
                        next();
                    }
                })
        } else {
            res.json({
                success: 0,
                message: "Access denied ! unauthorized user"
            });
        }
    }
}