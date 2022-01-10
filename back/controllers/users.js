const dotenv = require("dotenv").config();
const { pool } = require('../config/db');
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
// const db = require("../config/db");

/********
  CREATE 
*********/

// signup
exports.signup = (req, res, next) => {
  let sql = `SELECT * FROM users WHERE email=?`;

  pool.execute(sql, [req.body.email], function (err, result) {
    let user = result[0];

    if (!user) { 
      bcrypt.hash(req.body.password, 10)
      .then(hash => {
        const image = `${req.protocol}://${req.get('host')}/images/default-user.jpg`;
        const user = {
          lastname: req.body.lastname,
          firstname: req.body.firstname,
          email: req.body.email,
          password: hash,
          imageUrl: image,
        }
        let sql = `INSERT INTO users (lastname, firstname, email, password, userpicture) VALUES (?,?,?,?,?)`;
        pool.execute(sql, [user.lastname, user.firstname, user.email, user.password, user.imageUrl], function (err, result) {
          if (err) throw err;
          res.status(201).json({ message: `L'utilisateur ${user.firstname} ${user.lastname} a bien été ajouté` });
        })
      })
      .catch(error => res.status(500).json({ error }));
      } 
    else {
      res.status(401).json({ message: "Cette adresse email existe déjà" })
    }
  })
};

// login
exports.login = (req, res, next) => {
  let sql = `SELECT * FROM users WHERE email=?`;
  pool.execute(sql, [req.body.email], function (err, result) {
    let user = result[0];
    if (!user)
      return res.status(401).json({ error: "Email non reconnu" });
    bcrypt.compare(req.body.password, user.password)
      .then(valid => {
        if (!valid) {
          return res.status(401).json({ error: " Mot de passe incorrect !" })
        }
        res.status(200).json({
          userId: user.id,
          token: jwt.sign(
            { userId: user.id },
            process.env.SECRET_TOKEN_KEY,
            { expiresIn: "24h" },
          ),
        })
      })
    .catch(error => res.status(500).json({ message: "Erreur d'authentification" }));
  })
};

/********
  READ 
*********/

// getOne
exports.getOneUser = (req, res, next) => {
  console.log("getOne user");
};

// getAs
exports.getAs = (req, res, next) => {
  console.log("getAs user");
};

/********
  UPDATE 
*********/
// modifyUserPicture
exports.modifyUserPicture = (req, res, next) => {
  console.log("modifyUserPicture");
};

// modifyAccount
exports.modifyAccount = (req, res, next) => {
  console.log("modifyAccount");
};

// modifyPassword
exports.modifyPassword = (req, res, next) => {
  console.log("modifyPassword");
};

/********
  DELETE 
*********/
// deleteUser
exports.deleteUser = (req, res, next) => {
  console.log("deleteUser");
};