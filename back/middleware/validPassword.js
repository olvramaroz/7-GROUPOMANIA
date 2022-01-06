const validPassword = require("../models/password");

module.exports = (req, res, next) => {
  if (!validPassword.validate(req.body.password)) {
    res.status(400).json({ error: "Merci de vérifier les informations entrées" });
  } else {
    next();
  }
};