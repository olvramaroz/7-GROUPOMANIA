const db = require('../models')
const Sequelize = db.Sequelize
const jwt = require('jsonwebtoken')
const { User } = db.sequelize.models

const newToken = user => {
  token = jwt.sign({ userId: user.id }, 'RANDOM_TOKEN_SECRET', {
    expiresIn: '24h'
  })
  return { user, token }
}

exports.signup = (req, res, next) => {
  User.create({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password
  })
    .then(user => res.status(201).json(newToken(user)))
    .catch(error => res.status(401).json({ error: error }))
}

exports.login = async (req, res, next) => {
  try {
    const response = await User.authenticate(req.body.email, req.body.password)

    if (response.valid) {
      res.status(201).json(newToken(response.user))
    } else {
      res.status(401).json({ error: response.message })
    }
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

exports.getOneUser = (req, res, next) => {
  User.findOne({ where: { id: req.params.id } })
    .then(user => res.status(200).json({ user }))
    .catch(error => res.status(404).json({ error }))
}

exports.getAllUsers = (req, res, next) => {
  const options = {
    where: Sequelize.where(
      Sequelize.fn(
        'concat',
        Sequelize.col('firstName'),
        ' ',
        Sequelize.col('lastName')
      ),
      {
        [Sequelize.Op.like]: `%${req.query.search}%`
      }
    ),
    limit: 10
  }

  User.findAll(options)
    .then(users => {
      res.status(200).json({ users })
    })
    .catch(error => {
      console.log(error)
      res.status(400).json({ error })
    })
}

exports.editUser = (req, res, next) => {  
  req.file ? req.body.profile = req.file.filename : console.log("on garde la même photo"); // <- on vérifie si l'user a uploadé une nouvelle photo
  if (req.file) { // <- on supprime l'ancienne image de profil
      User.findOne({where: {id:req.params.id}})
          .then(user => {
              if(user.profile !== "defaultUserProfile.png") { // <- si sa photo de profile n'est pas celle par défaut on peut la supprimer
                  fs.unlink(`images/${user.profile}`, (error) => {
                      if (error) throw err
                  })    
              } else {
                  console.log("ce fichier ne peut être effacé car c'est l'image par défaut")
              }
          })
          .catch(error => res.status(400).json(error));
  }
  if (req.body.password) { // <- si le password a été modifié on enregistre le hash
      bcrypt.hash(req.body.password, 8)
          .then(hash => {
              req.body.password = hash;
              User.update(req.body, {where: {id: req.params.id}})
                  .then(user => {
                      res.status(201).json({message: "profil et mot de passe changé"});
                  })
                  .catch(error => res.status(400).json(error));
          })
          .catch(error => res.status(500).json(error));
  } else { // <- le password n'a pas été modifié on peut donc enregistrer nos données directement
      User.update(req.body, {where: {id: req.params.id}})
          .then(() => res.status(201).json({message: "profil actualisé"}))
          .catch(error => res.status(400).json(error));
  };
}

exports.deleteUser = (req, res, next) => {
  console.log("user id à supprimer:", req.params.id);
  try {
      User.destroy({where: {id:req.params.id}})
          .then(() => {
              console.log("User supprimé");
              res.status(200);
          })
          .catch(error => res.status(400).json(error))
  } catch {
      error => res.status(500).json(error);
  }
};