Notification-service
Responsible for storing notifications, fetching unread notifications(can fetch read notifications too), marking notifications as read, and saving recommendation-based notifications as well. Used MongoDB for storage, REST APIs for interactions, and RabbitMQ consumer for event-driven updates.
For recommendations, mock user data has been used(browsing history and puchasing history)

Endpoints:
POST /api/notifications
GET /api/notifications//unread/:userId 
PATCH /api/notifications/:id/read
POST /api/notifications/recommendations/:userId
GET /api/notifications/getall/:userId

env variables:
PORT=3002
MONGO_URI=mongodb://localhost:27017/notificationsDB

Docker usage instructions:(commands are used in bash)
1. Build the docker image
command : docker build -t notification-service .
This builds the container image for the Notification Service.

2. Run the MongoDB container
command: docker run -d --name mongo -p 27017:27017 mongo
This starts mongo on the dafault port 21017

3. Run the Notification Service Container
Make sure that the above mentioned env variables are included in the .env file
then run:
command: docker run -d -p 3002:3002 --env-file .env --name notification-service notification-service

4. Running RabbitMQ for message queues
command: docker run -d --hostname rabbitmq --name rabbitmq -p 5672:5672 -p 15672:15672 rabbitmq:3-management


