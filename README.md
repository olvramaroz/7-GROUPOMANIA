# Corporate social network
# Node, Express, Sequelize, JWT
# Vue, Axios, Bootstrap, Sweetalert
# Javascript

You need to have installed Node.js, MySQL, Sequelize-cli in you machine.

### Set the Database

Make sure you have `MySQL` installed globally

Match your own MySQL credentials with the backend/.env.example file
Rename it ".env" instead of ".env.example"
Do the same thing for the ./config/config.example.json file.


### Install the Backend with the db

```
cd backend
npm install
```

```
 sequelize db:create
 sequelize db:migrate
```

```
npm start
```
### Run the Frontend

Open a new terminal

```
cd frontend
npm install 
npm run serve
```

The app is ready to use at : http://localhost:8085/
