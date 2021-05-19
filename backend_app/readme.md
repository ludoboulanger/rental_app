#Backend setup
___
##Required installation
1. Use `npm install` to install all the dependencies
2. Install mongoDB by using the [installer](https://www.mongodb.com/try/download/community) or use brew if you're using a mac
   >$ brew tap mongodb/brew  
   > $ brew install mongodb-community  
   > $ brew services start mongodb-community

##Db-migrate
We use [db-migrate](https://db-migrate.readthedocs.io/en/latest/) to handle the database migration. It is already installed localy in the project if you ran `npm install` command. To use it, you can either run the command `npx db-migrate [command]` or if you want to get rid of npx, you'll have to install it globally `npm install -g db-migrate`.
###Database initialisation
1. `[npx] db-migrate db:create dbdev`
2. `[npx] db-migrate up`  
You should now see your database by using MongoDB Compass and connecting to *mongodb://127.0.0.1:27017/DBdev*

###Creating a migration
To create a new migration, run `[npx] db-migrate create migrationname` A migration file named accordingly with the name you gave it should now appear in the migrations folder. Open it and edit exports.up and exports.down functions to make the desired change to the db. The details for implementing a migration are available [here](https://db-migrate.readthedocs.io/en/latest/API/NoSQL/)
