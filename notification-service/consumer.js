const { connectRabbitMQ } = require('./utils/rabbitmq');
const { createNotification } = require('./services/notification.service'); // function that stores notification

(async () => {
  const channel = await connectRabbitMQ();

  await channel.assertQueue('notification-events');
  channel.consume('notification-events', async (msg) => {
    const payload = JSON.parse(msg.content.toString());
    console.log('📨 Received notification event:', payload);
    await createNotification(payload); // Save to DB
    channel.ack(msg);
  });

  await channel.assertQueue('recommendation-events');
  channel.consume('recommendation-events', async (msg) => {
    const payload = JSON.parse(msg.content.toString());
    console.log('📨 Received recommendation event:', payload);
    await createNotification(payload); // Save to DB
    channel.ack(msg);
  });
})();