require("dotenv").config();
const mysql = require("mysql2");

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    connectTimeout: 30000 // 30 seconds
})

pool.query('SELECT 1 + 1 AS solution', (err, result) => {
    if (err) {
      console.log("connexion à la BDD échouée");
      throw err;
    }
    console.log(" Connexion à la BDD réussie !");
  });


module.exports = pool.promise();