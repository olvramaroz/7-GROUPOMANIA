const Sequelize = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
    host: process.env.DB_HOST,
    port: 3306,
    dialect: 'mysql'
});

sequelize
  .authenticate() // this will execute SELECT 1+1 AS result
  .then(() => {
    console.log('Connexion à la base de données via Sequelize réussie !');
  })
  .catch(err => {
    console.error('Impossible de se connecter à la base de données:', err);
  });

module.exports = sequelize;
global.sequelize = sequelize;