#!/bin/bash         
cd client
npm i
cd ..
cd server
npm i
cd ..
echo "VITE_SERVER_URL=$(gp url 3000)" >> .env.example
echo "VITE_CLIENT_URL=$(gp url 5173)" >> .env.example
cp .env.example .env
cp .env.example ./server/.env
cp .env.example ./client/.env
docker compose up --build -d
