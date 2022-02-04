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
      bcrypt.hash(req.body.password, 8)
      .then(hash => {
        const image = `${req.protocol}://${req.get('host')}/images/default-user.svg`;
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
  let sql = `SELECT * FROM users WHERE users.id=${req.body.userId};`;
  pool.execute(sql, function (err, result) {
      if (err) res.status(400).json({ err });
      res.status(200).json(result)
  });
};

// getAs
exports.getAs = (req, res, next) => {
  let sql = `SELECT * FROM users WHERE lastname LIKE '%${req.body.lastname}%' OR firstname LIKE '%${req.body.lastname}%' LIMIT 12;`;
  pool.execute(sql, [req.body.nom], function (err, result) {
      if (err) res.status(400).json({ err });
      res.status(200).json(result)
  });
};

/********
  UPDATE 
*********/
// modifyUserPicture
exports.updateUserPicture = (req, res, next) => {
  if (req.file) {
    let sql = `SELECT * FROM users WHERE id = ?`;
    pool.execute(sql, [req.params.id], function (err, result) {
        if (err) res.status(400).json({ err });
        if (!result[0]) res.status(400).json({ message: "Aucun id ne correspond dans la table" });
        else {
            // SI LE USER A UNE IMAGE, LA SUPPRIMER DU DOSSIER IMAGES/PROFILE
            if (result[0].userpicture != "http://localhost:5000/images/default-user.svg") {
                const name = result[0].userpicture.split('/images/')[1];
                fs.unlink(`images/${name}`, () => {
                    if (err) console.log(err);
                    else console.log('Image modifiée !');
                })
            }
            // RECUPERE LES INFOS ENVOYER PAR LE FRONT 
            let image = (req.file) ? `${req.protocol}://${req.get('host')}/images/${req.file.filename}` : "";
            // UPDATE LA DB
            let sql2 = `UPDATE users SET userpicture = ? WHERE id = ?`;
            pool.execute(sql2, [image, req.params.id], function (err, result) {
                if (err) throw err;
                res.status(201).json({ message: `Photo user udpate` });
            });
        }
    });
}
};

// modifyAccount
exports.updateName = (req, res, next) => {
  if (req.body.lastname != "") {
    let sql = `UPDATE users SET lastname = ? WHERE id = ?`;
    pool.execute(sql, [req.body.lastname, req.params.id], function (err, result) {
        if (err) throw err;
    });
  }
  if (req.body.firstname != "") {
    let sql = `UPDATE users SET firstname = ? WHERE id = ?`;
    pool.execute(sql, [req.body.firstname, req.params.id], function (err, result) {
        if (err) throw err;
    });
}
res.status(200).json({ message: "Information user update" });
};

// modifyPassword
exports.updatePassword = (req, res, next) => {
  if (req.body.password) {
    let sql = `SELECT * FROM users WHERE id = ?`;
    pool.execute(sql, [req.params.id], function (err, result) {
        let user = result[0];
        bcrypt.compare(req.body.oldPassword, user.password)
            .then(valid => {
                if (!valid) {
                    return res.status(401).json({ error: " Mot de passe incorrect !" });
                } else {
                    bcrypt.hash(req.body.password, 10)
                        .then(hash => {
                            let sql2 = `UPDATE users SET password = ? WHERE id = ?`;
                            pool.execute(sql2, [hash, req.params.id], function (err, result) {
                                if (err) throw err;
                                res.status(200).json({ message: "Mot de passe modifié" })
                            });
                        })
                        .catch(error => res.status(500).json({ error }));
                }
            })
            .catch(error => res.status(400).json({ message: "Erreur authentification" }));
    })
}
};

/********
  DELETE 
*********/
// deleteUser
exports.deleteUser = (req, res, next) => {
  if (req.body.password) {
    let sql = `SELECT * FROM users WHERE id=?`;
    pool.execute(sql, [req.params.id], function (err, result) {
        let user = result[0];
        bcrypt.compare(req.body.password, user.password)
            .then(valid => {
                if (!valid) {
                    return res.status(401).json({ error: " Mot de passe incorrect !" });
                } else {
                    bcrypt.hash(req.body.password, 10)
                        .then(hash => {
                            let sql = `DELETE FROM users WHERE id=?`;
                            pool.execute(sql, [req.params.id], function (err, result) {
                                if (err) throw err;
                                console.log(result);
                                res.status(200).json({ message: `Compte numéro ${req.params.id} supprimé` });
                            });
                        })
                        .catch(error => res.status(500).json({ error }));
                }
            })
            .catch(error => res.status(500).json({ message: "Erreur authentification" }));
    })
  }
};