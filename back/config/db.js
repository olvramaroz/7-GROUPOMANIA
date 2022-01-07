require("dotenv").config();
const mysql = require("mysql2");

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
})

// vérifier qu'on est bien connecté à la BDD
let sql = "SELECT * FROM users;";
pool.execute(sql, function(err, result) {
    if(err) throw err;
    result.forEach(res => {
        console.log(res.firstname);
    });
});
// terminal : node config/db.js


module.exports = pool.promise();