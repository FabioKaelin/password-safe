#!/bin/bash

cd resources

docker compose up -d

cd ..

cd frontend-safe

npm run dev &

cd ..

cd backend

cp .env.sample .env

go run main.go

echo "open localhost:3000 in your browser"
