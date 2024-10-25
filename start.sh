#!/bin/bash         
cd client
npm i
cd ..
cd server
npm i
cp .env.example ./server/.env
cd ..
docker compose up --build -d
