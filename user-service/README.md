User-service
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
command: docker run -d -p 3001:3001 --env-file .env --name user-service user-service

