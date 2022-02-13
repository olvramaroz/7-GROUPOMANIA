const express = require('express');
const app = express();
const path = require('path')
const helmet = require('helmet');
const cors = require('cors');
require('dotenv').config();
  
// routes
const usersRoutes = require("./routes/users.routes")
const postsRoutes = require("./routes/posts.routes")
const commentsRoutes = require("./routes/comments.routes")

// access to the database
const { sequelize } = require('./models/index');
require("./config/db.connexion");

// CORS access
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});


app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/users", usersRoutes)
app.use("/api/posts", postsRoutes)
app.use("/api/comments", commentsRoutes)
app.use('/images', express.static(path.join(__dirname, 'images')));


const dbTest = async function () {
  try {
    await sequelize.authenticate();
    console.log('Connection to the database successfull.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};
dbTest();


module.exports = app;