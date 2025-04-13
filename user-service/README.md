<!-- User-service
This handles registering a new user, login for an existing user, fetching the profile details of users and managing user preferences(what kind of notifications they would prefer to recieve). JWT-based authentication using bearer tokens has been implemented.

Endpoints:
POST / register
POST / login
GET /me
PUT /preferences

env variables:
MONGO_URI=mongodb://localhost:27017/user-service
JWT_SECRET=supersecretkey

Docker usage
1. Build the docker image
command: docker build -t user-service .

2. Run MongoDB container
command: docker run -d --name mongo -p 27017:27017 mongo

3. Run the User Service Container
after making sure .env file is configured run - 
command: docker run -d -p 3001:3001 --env-file .env --name user-service user-service -->

# User Service

This service handles:

- Registering a new user  
- Logging in existing users  
- Fetching user profile details  
- Managing user preferences (types of notifications to receive)

JWT-based authentication is implemented using Bearer tokens.

---

## Endpoints

- `POST /register` — Register a new user  
- `POST /login` — Log in and receive a JWT token  
- `GET /me` — Fetch authenticated user's profile (requires Bearer token)  
- `PUT /preferences` — Update notification preferences

---

## Authentication

All protected routes require a Bearer token in the request header:

```
Authorization: Bearer <your_token_here>
```

---

## Environment Variables

Create a `.env` file in the root of `user-service/`:

```
PORT=3001
MONGO_URI=mongodb://localhost:27017/user-service
JWT_SECRET=supersecretkey
```

---

## Docker Usage (with Docker Desktop)

### 1. Build the Docker Image

```bash
docker build -t user-service .
```

### 2. Run MongoDB Container

```bash
docker run -d --name mongo -p 27017:27017 mongo
```

### 3. Run the User Service Container

Make sure your `.env` file is correctly configured, then run:

```bash
docker run -d -p 3001:3001 --env-file .env --name user-service user-service
```

---



---
