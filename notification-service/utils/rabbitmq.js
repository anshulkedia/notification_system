// const amqp = require('amqplib');
// const { createNotification } = require('../services/notification.service');

// let channel;

// const connectRabbitMQ = async () => {
//   const connection = await amqp.connect('amqp://localhost');
//   channel = await connection.createChannel();
//   console.log('📦 Connected to RabbitMQ - Notification Service');

//   await channel.assertQueue('notification-events');
//   channel.consume('notification-events', (msg) => {
//     const data = JSON.parse(msg.content.toString());
//     console.log('📥 Received Notification Event:', data);

//     // Save to DB logic here (import model/controller as needed)
//     //implemented in the 2nd line of this file(createNotification)

//     channel.ack(msg);
//   });
// };

// module.exports = { connectRabbitMQ };





// const amqp = require('amqplib');
// const { createNotification } = require('../services/notification.service');

// let channel;

// const connectRabbitMQ = async () => {
//   const connection = await amqp.connect('amqp://localhost');
//   channel = await connection.createChannel();
//   console.log('📦 Connected to RabbitMQ - Notification Service');

//   await channel.assertQueue('notification-events');

//   channel.consume('notification-events', async (msg) => {
//     const data = JSON.parse(msg.content.toString());
//     console.log('📥 Received Notification Event:', data);

//     try {
//       await createNotification(data);
//     } catch (err) {
//       console.error('❌ Failed to store notification:', err.message);
//     }

//     channel.ack(msg);
//   });
// };

// module.exports = { connectRabbitMQ };

const amqp = require('amqplib');

const connectRabbitMQ = async () => {
  const connection = await amqp.connect('amqp://localhost');
  const channel = await connection.createChannel();
  console.log('📦 Connected to RabbitMQ - Notification Service');
  return channel;
};

module.exports = { connectRabbitMQ };