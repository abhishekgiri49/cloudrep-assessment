# CloudRep Backend Service

This is the backend service for the **CloudRep** full-stack application. It is built using **Node.js** and uses **MongoDB** as its primary database. The frontend components are located in a separate directory and have been reused from existing working implementations.

---

## 📦 Prerequisites

Make sure the following are installed before running the project:

- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)
- [Node.js](https://nodejs.org/) (only required for running locally without Docker)
- [MongoDB](https://www.mongodb.com/) (optional – used if you prefer running it locally without Docker)

---

## 🚀 Getting Started

### 🔧 Using Docker (Recommended)

## Clone the repository:
   ```bash
   git clone <repo-url>
   cd backend

## Clone the repository:
    ```bash
    DB_USER=root \
    DB_PASSWORD=0d727be7b563ff9 \
    DATABASE_URL=mongodb://root:0d727be7b563ff9@host.docker.internal:27017/cloudrep?authSource=admin \
    JWT_SECRET=0d727be7b563ff9804a8fbe19389115ddb95ab7ab05fca93717cb800922f354b \
    JWT_EXPIRES_IN=60m \
    docker-compose up --build

## If MongoDB is running locally on port 27017, you may need to stop it first: On macOS/Linux:
```bash
sudo service mongod stop
## On Windows:
```bash
    net stop MongoDB
## 🖥️ Without Docker
## Install dependencies:
```bash
  npm install
## Create a .env file in the backend root directory with the following content:

```bash
  PORT=4000
  DATABASE_URL=mongodb://root:0d727be7b563ff9@localhost:27017/cloudrep?authSource=admin
  JWT_SECRET=0d727be7b563ff9804a8fbe19389115ddb95ab7ab05fca93717cb800922f354b
  JWT_EXPIRES_IN=60m
## Run the development server:

```bash
  npm run start:dev
## 📁 Project Structure
  Backend
```bash
  backend/
  ├── .env                 # Environment variables
  ├── .gitignore           # Git ignore rules
  ├── .prettierrc          # Prettier configuration
  ├── Dockerfile           # Docker configuration
  ├── package.json         # Project dependencies
  └── README.md            # This file
  🔗 Frontend Integration
  The frontend is located in the cloudrep-frontend/ directory and is built using Next.js.

```bash
frontend/
├── .env
├── .gitignore
├── .prettierrc
├── Dockerfile
├── package.json
└── README.md
Frontend .env example:

env
```bash
  NEXT_PUBLIC_BACKEND_URL=http://localhost:4000
  JWT_SECRET=0d727be7b563ff9804a8fbe19389115ddb95ab7ab05fca93717cb800922f354b
📜 Available Scripts
Script	Description
start	Runs the compiled application
start:dev	Runs the app in dev mode with hot-reload
build	Compiles TypeScript to JavaScript

📘 API Documentation
Once the server is running, access the API docs here:

```bash
http://localhost:4000/api
🛠️ Troubleshooting
Port Conflicts: Make sure no other services are using port 4000 (backend) or 27017 (MongoDB).

Docker Issues: If MongoDB fails to start, try cleaning up Docker with:

```bash
docker system prune
📄 License
MIT License (or your preferred license here)


yaml
```bash
---

Let me know if you’d like this saved as a downloadable `.md` file or want a version including ba
