const db = require("../models")
const User = db.users
const Post = db.posts
const Comment = db.comments
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

require('dotenv').config({ path: './.env'})


// signup
exports.signup = (req, res, next) => {
    if (User.length === 0) {
        bcrypt.hash(process.env.ADMIN_PASSWORD, 8)
        .then(hash => {
            const user = new User({
                id: 1,
                firstname: process.env.ADMIN_FIRSTNAME,
                lastname: process.env.ADMIN_LASTNAME,
                email: process.env.ADMIN_EMAIL,
                password: hash,
                userpicture: `${req.protocol}://${req.get("host")}/images/${process.env.ADMIN_USERPICTURE}`,
                isAdmin: true,
                isActive: true
            })
            user.save()
        })
    }
    bcrypt.hash(req.body.password, 8)
    .then(hash => {
        const user = new User({
            firtsname: req.body.firtsname,
            lastname: req.body.lastname,
            email: req.body.email,
            password: hash,
        })
        user.save()
        .then(() => res.status(201).json({ message: `Utilisateur créé !` }))
        .catch(error => res.status(401).json({ error }))
    })
    .catch(error => res.status(500).json({ error }))
}

// login
exports.login = (req, res, next) => {
    User.findOne({where: { email: req.body.email }})
    .then(user => {
        if (user.isActive === false) { 
            return res.status(403).json({ error: "User removed !" })
        }
        if(!user) {
            return res.status(404).json({ error: "Unknown user !" })
        }
        bcrypt.compare(req.body.password, user.password)
        .then(valid => {
            if(!valid) {
                return res.status(401).json({ error: "incorrect entries!" })
            }
            res.status(200).json({
                message: "User connected !",
                userId: user.id,
                role: user.isAdmin,
                firstname : user.firstname,
                lastname : user.lastname,
                userpicture : user.userpicture,
                token: jwt.sign( { userId: user.id }, process.env.SECRET_KEY, { expiresIn: '24h' } )
            })
        })
        .catch(error => res.status(501).json({ error }))
    })
    .catch(error => res.status(502).json({ error }))
}

// findOneUser
exports.findOneUser = (req, res, next) => {
    const userInfo = {}
    User.findOne({ where: { id: req.params.id }})
    .then(user => {
        userInfo.firstname = user.firstname
        userInfo.lastname = user.lastname
        userInfo.email = user.email

        if (user.isAdmin == false) {
          userInfo.role = "Utilisateur"
        } else {
          userInfo.role = "Administrateur"
        }

        userInfo.createdAt = user.createdAt
        userInfo.avatar = user.avatar
        userInfo.isActive = user.isActive
    })
    .then(() => {
      Comment.count({ where: { userId: req.params.id }})
      .then(cmtcount => { userInfo.commentsCount = cmtcount })
    })
    .then(() => {
      Post.count({ where: { userId: req.params.id }})
      .then(postcount => { 
          userInfo.postsCount = postcount 
          res.status(200).json(userInfo)
      })
    })  
    .catch(error => res.status(404).json({ error }))
}

// ModifyUser
exports.modifyUser = (req, res, next) => {
    const userObject = req.file ?
        {
            ...req.body.userId,
            userpicture: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`
        } : { ... req.body}
    User.update({ ...userObject, id:  req.params.id}, { where: { id: req.params.id }})
      .then(() => res.status(200).json({ ...userObject }))
      .catch(error => res.status(400).json({ error }))
}

// DeleteUser
exports.deleteUser = (req, res) => {
      const id = req.params.id;
      User.destroy({
        where: { id: id }
      }).then(() => {
          res.status(200).send('User has been deleted!');
      }).catch(err => {
          res.status(500).send("Error -> " + err);
      });
}