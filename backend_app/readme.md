# Backend setup
## Required installation
1. Use `npm install` to install all the dependencies
2. Install mongoDB by using the [installer](https://www.mongodb.com/try/download/community) or use brew if you're using a mac
   >$ brew tap mongodb/brew  
   > $ brew install mongodb-community  
   > $ brew services start mongodb-community
## Environment variables
1. In the directory root, create a `.env` file
2. Copy the content of `.env.example` in `.env` file
3. Give a value to the required variables **except** for the `DB_NAME`

## Starting the application
- To start the test environment, run `ENVIRONMENT=test ./startLocalDev.sh`
- To start the development environment, run `./startLocalDev.sh`
## Db-migrate
We use [migrate-mongo](https://www.npmjs.com/package/migrate-mongo) to handle the database migration. It is already installed localy in the project if you ran `npm install` command. To use it, you can either run the command `npx migrate-mongo [command]` or if you want to get rid of npx, you'll have to install it globally `npm install -g db-migrate`.
### Database initialisation
1. `[npx] migrate-mongo db:create rentalDevDB`
2. `[npx] migrate-mongo up`  
You should now see your database by using MongoDB Compass and connecting to *mongodb://127.0.0.1:27017/rentalDevDB*

### Creating a migration
To create a new migration, run `[npx] migrate-mongo create migrationname` A migration file named accordingly with the name you gave it should now appear in the migrations folder. Open it and edit exports.up and exports.down functions to make the desired change to the db. The details for implementing a migration are available [here](https://www.npmjs.com/package/migrate-mongo)

## Testing
Librairies:
- mocha
- chai
- supertest
- sinon

Tests for the backend are located in the `*/tests` directories. Each test file contains unit tests for a specific ressource. All external ressources are stubbed using sinon `stub`.

To run all test, use `npm run test-dev`. If you require only specific tests to be run, you can add a `.only` after a `describe` or `it`
