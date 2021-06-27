#!/bin/bash

if [ $ENVIRONMENT == "test" ]
then
  echo "Running in test environment"
  echo "DB_NAME=testDB" >> .env
  npm run test-dev
else
  echo "Running in development environment"
  echo "DB_NAME=rentalDevDB" >> .env
  npm run start-dev
fi