// pour protéger les informations de connexion vers la BDD
const dotenv = require("dotenv").config();

const http = require("http");
const app = require("./app");


const normalizePort = (val) => {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    return val;
  }
  if (port >= 0) {
    return port;
  }
  return false;
};

const port = normalizePort(process.env.PORT || "5000");
app.set("port", port);

// gérer les erreurs
const errorHandler = (error) => {
  if (error.syscall !== "listen") {
    throw error;
  }
  const address = server.address();
  const bind =
    typeof address === "string" ? "pipe " + address : "port: " + port;
  switch (error.code) {
    case "EACCES":
      console.error(bind + "vous n'avez pas l'autorisation nécessaire.");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " est déjà utilisé.");
      process.exit(1);
      break;
    default:
      throw error;
  }
};

const server = http.createServer(app);

server.on("error", errorHandler);
server.on("listening", () => {
  const address = server.address();
  const bind = typeof address === "string" ? "pipe " + address : "port " + port;
  console.log("Le port foncionne sur le " + bind);
});

// écoute sur le port 5000
server.listen(port);

// // vérification que sequelize se connecte bien à la BDD
// const sequelize = new Sequelize(
//   {
//     username: process.env.BD_NAME,
//     password: process.env.BD_PASSWORD,
//     database: "database_development",
//     host: "127.0.0.1",
//     dialect: "mysql"
//   }
// );
// sequelize
//   .authenticate() // authenticate simply runs SELECT 1+1 AS result query to check the db connection
//   .then(() => {
//     console.log('La connexion à la BDD a bien été établie.');
//   }) 
//   .catch(err => {
//     console.error('Impossible de se connecter à la base de données:', err);
//   });