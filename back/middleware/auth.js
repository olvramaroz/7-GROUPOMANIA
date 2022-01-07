const db = require('../config/db')
const jwt = require("jsonwebtoken");


module.exports = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token,process.env.SECRET_TOKEN_KEY);
    const userId = decodedToken.userId;

    if (req.body.userId && req.body.userId !== userId) {
      throw "Identifiant non valide";
    } else {
      await User.findOne({ where: { id: userId } })
      .then(user => {
        req.user = user
        next()
      })
    }
  } catch (error) {
    res.status(401).json({ error: error | "Requête non authentifiée" });
  }
};
