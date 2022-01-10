require("dotenv").config();
const express = require("express");
const path = require("path");
const db = require("./config/db");

// Les sécurités
const helmet = require("helmet");
const sanitize = require("sanitize-middleware");

// Création de l'application Express
const app = express();

// Les diverses middleware d'autorisation
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS");
  next();
});

app.use(express.json());

app.use(helmet()); // Protection contre XSS
app.use(sanitize()); // Protection contre injection SQL


// Les routes
app.use("/api/users", require("./routes/users"));
app.use("/api/posts", require("./routes/posts"));
// app.use("/api/likes", require("./routes/likes"));
// app.use("/api/comments", require("./routes/comments"));
app.use('/images', express.static(path.join(__dirname, 'images')))


module.exports = app;