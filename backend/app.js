require('dotenv').config();
const express = require('express');
const app = express();
const path = require("path")
const auth = require("./middleware/auth")
const helmet = require('helmet');
const cors = require('cors');

  
// routes
const authRoutes = require("./routes/auth")
const userRoutes = require("./routes/user")
const messageRoutes = require("./routes/message")
const commentRoutes = require("./routes/comment")

//db
const { sequelize } = require('./models/index');
require("./config/db.connexion");

//allow access
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

app.use('/images', express.static(path.join(__dirname, 'images')));
app.use("/api/auth", authRoutes)
app.use("/api/users", auth , userRoutes)
app.use("/api/messages", auth, messageRoutes)
app.use("/api/comments", auth ,commentRoutes)


module.exports = app;