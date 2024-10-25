#!/bin/bash         
cd client
npm i
cd ..
cd server
npm i
cd ..
cp .env.example ./server/.env
docker compose up --build -d
