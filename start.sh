#!/bin/bash         
cd client
npm i
cd ..
cd server
npm i
cd ..
cp .env.example .env
cp .env.example ./server/.env
cp .env.example ./client/.env
docker compose up --build -d
