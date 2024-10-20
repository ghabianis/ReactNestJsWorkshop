#!/bin/bash         
cd client
npm i
cd ..
cd server
npm i
cd ..
docker compose up --build -d
