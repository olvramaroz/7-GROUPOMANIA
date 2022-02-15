# Creation of a corporate social network

## Getting started

`git clone git@github.com:olvramaroz/OnyLalainaValerieRamarozatovo_P7_06072021.git`

### Set the Database

Make sure you have `MySQL` installed globally

Match your own MySQL credentials with the back-groupo/.env file
Rename it into ".env" instead of ".env.example"
Do the same thing for the ./config/config.example file.

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

The app is reafy to use at the address : http://localhost:8085/