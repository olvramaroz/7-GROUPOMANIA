const express = require("express");
require("dotenv").config();
const path = require("path");

// Les sécurités
const helmet = require("helmet");
const sanitize = require("sanitize-middleware");

// Les routes
// const userRoutes = require('./routes/user')
// const postsRoutes = require('./routes/posts')
// const auth = require('./middleware/auth')
// const userCtrl = require('./controllers/user')

const usersRoutes = require('./routes/users');
// const postsRoutes = require('./routes/posts');
// const commentsRoutes = require('./routes/comments');


// Création de l'application Express
const app = express();

// Les diverses middleware d'autorisation
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

app.use(express.json());

app.use(helmet()); // Protection contre XSS
app.use(sanitize()); // Protection contre injection SQL

// Les routes d'API
app.use('/images', express.static(path.join(__dirname, 'images')))
app.use('/api/users', usersRoutes)
// app.use('/api/users/posts', postsRoutes)
// app.use('/api/users/comments', commentsRoutes)

// app.get('/api/users', auth, userCtrl.getAllUsers)
// app.get('/api/users/:id', auth, userCtrl.getOneUser)

module.exports = app;
