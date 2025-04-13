Personalized Notification System 
A microservice-based backend system for sending personalized, scheduled, and event-driven notifications on an e-commerce platform. The system handles sending personalized notifications to users based on their preferences and activity on the platform.

Tech stack
    Node.js + Express.js
    MongoDB (with Mongoose)
    RabbitMQ (via amqplib)
    node-cron for scheduling
	Docker for containerization (optional)
	Postman for API testing

System Architecture:
This system is designed using modular microservices with asynchronous communication. The different components are :
1. user-service
2. notification-service
3. scheduler-service
5. RabbitMQ (Message broker)

1. User-service
This handles registering a new user, login for an existing user, fetching the profile details of users and managing user preferences(what kind of notifications they would prefer to recieve). JWT-based authentication using bearer tokens has been implemented.

Endpoints:
POST / register
POST / login
GET /me
PUT /preferences

2. Notification-service
Responsible for storing notifications, fetching unread notifications(can fetch read notifications too), marking notifications as read, and saving recommendation-based notifications as well. Used MongoDB for storage, REST APIs for interactions, and RabbitMQ consumer for event-driven updates.

Endpoints:
POST /api/notifications
GET /api/notifications//unread/:userId 
PATCH /api/notifications/:id/read
POST /api/notifications/recommendations/:userId
GET /api/notifications/getall/:userId

3. Scheduler-service
Uses node-cron to schedule events periodically, sends mock user updates and promotional messages and pushes messages to RabbitMQ queue for notification-service to consume. 

4. RabbitMQ (message broker)
It is used for decoupled communication between services, publishing events like order status updated, promotion send and recommendation create. These messages are consumed by notification service.

Communication flow:

[SCHEDULER] ───(order/promo event)────► [RABBITMQ] ───(consume)───► [NOTIFICATION SERVICE]
       ▲                                                       ▼
       └─────(trigger recommendation manually)────► [POST /recommendations/:userId]

Database design(MongoDB):
Notification schema-
{
  "_id": ObjectId,
  "userId": String,
  "type": "order_update" | "promotion" | "recommendation",
  "content": String | Object,
  "sentAt": Date,
  "read": Boolean
}












