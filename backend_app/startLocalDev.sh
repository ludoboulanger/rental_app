#!/bin/bash

if [ $ENVIRONMENT == "test" ]
then
  echo "Running in test environment"
  cp test.env .env
  npm run test-dev
else
  echo "Running in development environment"
  cp dev.env .env
  npm run start-dev
fi