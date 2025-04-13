# 📬 Personalized Notification System

A microservice-based backend system for sending personalized, scheduled, and event-driven notifications on an e-commerce platform. The system handles sending personalized notifications to users based on their preferences and activity on the platform.

---

## 🛠 Tech Stack

- Node.js + Express.js  
- MongoDB (with Mongoose)  
- RabbitMQ (via amqplib)  
- node-cron for scheduling  
- Docker for containerization (optional)  
- Postman for API testing  

---

## 🧱 System Architecture

This system is designed using modular microservices with asynchronous communication. The different components are:

1. **user-service**  
2. **notification-service**  
3. **scheduler-service**  
4. **RabbitMQ** (message broker)

---

### 🔍 Service Details

- **User-service**  
  ➤ Go to [`/user-service/README.md`](user-service/README.md)

- **Notification-service**  
  ➤ Go to [`/notification-service/README.md`](notification-service/README.md)

- **Scheduler-service**  
  ➤ Go to [`/scheduler-service/README.md`](scheduler-service/README.md)

- **RabbitMQ**  
  ➤ Setup instructions included in [`/scheduler-service/README.md`](scheduler-service/README.md)

---

## 🔁 Communication Flow

```
[SCHEDULER] ───(order/promo event)────► [RABBITMQ] ───(consume)───► [NOTIFICATION SERVICE]
       ▲                                                       ▼
       └─────(trigger recommendation manually)────► [POST /recommendations/:userId]
```

---

## 🗃️ Database Design (MongoDB)

**Notification schema:**

```json
{
  "_id": ObjectId,
  "userId": String,
  "type": "order_update" | "promotion" | "recommendation",
  "content": String | Object,
  "sentAt": Date,
  "read": Boolean
}
```

---

## 🚀 Running the Project

1. Clone the repo  
2. Install dependencies in each microservice  
3. Start RabbitMQ:  
   ```bash
   docker run -d --hostname rabbitmq --name rabbitmq -p 5672:5672 -p 15672:15672 rabbitmq:3-management
   ```

4. Start services:

   ```bash
   # In user-service/
   npm start

   # In notification-service/
   npm start

   # In scheduler-service/
   npm start
   ```
