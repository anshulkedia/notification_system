const amqp = require('amqplib');

let channel = null;

async function connectRabbitMQ() {
  try {
    const connection = await amqp.connect('amqp://localhost');
    channel = await connection.createChannel();
    console.log('🐇 Connected to RabbitMQ');
  } catch (err) {
    console.error('❌ RabbitMQ connection error:', err.message);
  }
}

async function publishToQueue(queue, message) {
  if (!channel) throw new Error('RabbitMQ channel not initialized');
  await channel.assertQueue(queue, { durable: true });
  channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)), {
    persistent: true
  });
}

module.exports = { connectRabbitMQ, publishToQueue };