Project Overview
This is the backend service for a full-stack application. The project is built with Node.js and uses MongoDB as its database. The frontend components have been reused from existing working implementations.

Prerequisites
Before you begin, ensure you have the following installed:

Docker

Docker Compose (usually comes with Docker Desktop)

Node.js (if you need to run without Docker)

MongoDB (optional - only if you want to run MongoDB locally instead of using Docker)

Installation & Setup
Using Docker (Recommended)
Clone the repository:

bash
git clone [<repository-url>](https://github.com/abhishekgiri49/cloudrep-assessment.git)

Build and start the containers:
DB_USER=root
DB_PASSWORD=0d727be7b563ff9
DATABASE_URL=mongodb://root:0d727be7b563ff9@host.docker.internal:27017/cloudrep?authSource=admin
JWT_SECRET=0d727be7b563ff9804a8fbe19389115ddb95ab7ab05fca93717cb800922f354b
JWT_EXPIRES_IN=60m

bash
docker-compose up --build
Note: If you have MongoDB running locally on the default port (27017), you'll need to stop it first:

bash

# For macOS/Linux

sudo service mongod stop

# For Windows

net stop MongoDB
Without Docker
Install dependencies:

bash
npm install
Start the development server:

bash
npm run start:dev
Project Structure
text
backend/

├── .env # Environment variables
├── .gitignore # Git ignore rules
├── .prettierrc # Prettier configuration
├── Dockerfile # Docker configuration
├── package.json # Project dependencies
└── README.md # This file
Project Structure

# .env

PORT=4000
DATABASE_URL=mongodb://root:0d727be7b563ff9@localhost:27017/cloudrep?authSource=admin
JWT_SECRET=0d727be7b563ff9804a8fbe19389115ddb95ab7ab05fca93717cb800922f354b
JWT_EXPIRES_IN=60m

Frontend Integration
Most frontend components have been reused from existing working implementations. The frontend is located in the cloudrep-frontend directory and is built with Next.js.

frontend/

├── .env # Environment variables
├── .gitignore # Git ignore rules
├── .prettierrc # Prettier configuration
├── Dockerfile # Docker configuration
├── package.json # Project dependencies
└── README.md # This file

Environment Variables
Create a .env file in the root directory with the following variables:
bash
npm install
npm run start:dev
Project Structure
NEXT_PUBLIC_BACKEND_URL=http://localhost:4000
JWT_SECRET=0d727be7b563ff9804a8fbe19389115ddb95ab7ab05fca93717cb800922f354b
Available Scripts
start: Runs the compiled application

start:dev: Runs the application in development mode with hot-reload

build: Compiles TypeScript to JavaScript

For API Documentation
http://localhost:4000/api

Troubleshooting
If you encounter port conflicts, ensure no other services are using port 3000 (backend) or 27017 (MongoDB)

If Docker fails to start MongoDB, try removing old containers with docker system prune
