Scheduler Service

The Scheduler Service automates the sending of notifications at regular intervals using node-cron. It simulates an e-commerce platform by generating and publishing various types of notifications (order updates, promotions, and recommendations) to RabbitMQ queues, which are later consumed by the Notification Service.

What It Does
It schedules:
-> "order_update"(as defined in the schema) notification every 1 minute(can be modified to whatever time desired)
-> "promotion" notification every 2 minute(can be modified to whatever time desired)
-> personalized "recommendation" every 90 seconds(can be modified to whatever time desired)

Publishes all events to RabbitMQ queues: `notification-events` and `recommendation-events`

RabbitMQ (message broker)
It is used for decoupled communication between services, publishing events like order status updated, promotion send and recommendation create. These messages are consumed by notification service.


Architecture

[SCHEDULER SERVICE]
       |
       |---> Publishes messages to RabbitMQ
               |
               |---> [NOTIFICATION SERVICE] consumes and stores them


Sample payload

{
  "userId": "u1",
  "type": "promotion",
  "content": "🔥 Flash Sale! 50% off on your favorite items!"
}

type can be "promotion", "order_update" or "recommendation" , content changes accordingly