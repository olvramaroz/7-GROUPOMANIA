# Creation of a corporate social network


### Set the Database

Make sure you have `MySQL` installed globally

Match your own MySQL credentials with the backend/.env.example file
Rename it ".env" instead of ".env.example"
Do the same thing for the ./config/config.example.json file.

```
cd backend
```

```
npx sequelize-cli db:create
npx sequelize-cli db:migrate
```

### Install the Backend

```
npm install
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