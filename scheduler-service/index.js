// const express = require('express');
// const cron = require('node-cron');
// const axios = require('axios');
// require('dotenv').config();

// const app = express();
// app.use(express.json());

// const NOTIF_SERVICE = process.env.NOTIF_SERVICE_URL;

// // Mock user list
// const users = ['u1', 'u2', 'u3', 'u4'];

// // Scheduler: Every 1 minute, emit order status update
// //Every minute, selects a random user
// 	// •	Sends a fake order shipped notification
// 	// •	Posts it to your Notification Service
// cron.schedule('* * * * *', async () => {
//     const userId = users[Math.floor(Math.random() * users.length)];
  
//     const payload = {
//       userId,
//       type: 'order_update',
//       content: `Order #${Math.floor(Math.random() * 1000)} has been shipped!`
//     };
  
//     try {
//     //   await axios.post(`${NOTIF_SERVICE}/`, payload);
//       await axios.post(NOTIF_SERVICE, payload);
//       console.log(`✅ Order notification sent to ${userId}`);
//     } catch (err) {
//       console.error('❌ Failed to send order notification', err.message?.data || err.message);
//     }
//   });

// // Another scheduler: Every 2 minutes, send promo
// //This scheduler runs every 2 minutes and mimics marketing alerts.
// cron.schedule('*/2 * * * *', async () => {
//     const userId = users[Math.floor(Math.random() * users.length)];
  
//     const payload = {
//       userId,
//       type: 'promotion',
//       content: `🔥 Flash Sale! 50% off on your favorite items!`
//     };
  
//     try {
//       await axios.post(NOTIF_SERVICE, payload);
//       console.log(`🎁 Promo sent to ${userId}`);
//     } catch (err) {
//       console.error('❌ Failed to send promo notification', err.message?.data || err.message);
//     }
//   });

//   app.listen(3003, () => {
//     console.log('⏰ Scheduler Service running on port 3003');
//   });

const express = require('express');
const cron = require('node-cron');
require('dotenv').config();
const { connectRabbitMQ, publishToQueue } = require('./utils/rabbitmq');

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3003;

// Mock user list and products
const users = ['u1', 'u2', 'u3', 'u4'];
const products = ['T-shirt', 'Shoes', 'Phone', 'Laptop', 'Watch'];

// 🟢 Connect to RabbitMQ and then start cron jobs
connectRabbitMQ().then(() => {
  console.log('📡 Connected to RabbitMQ, starting scheduled tasks...');

  // ⏰ Order Update: every 1 minute
  cron.schedule('* * * * *', async () => {
    const userId = users[Math.floor(Math.random() * users.length)];
    const payload = {
      userId,
      type: 'order_update',
      content: `📦 Order #${Math.floor(Math.random() * 1000)} has been shipped!`
    };

    try {
      await publishToQueue('notification-events', payload);
      console.log(`✅ Order update notification published for ${userId}`);
    } catch (err) {
      console.error('❌ Failed to publish order update:', err.message);
    }
  });

  // 🎁 Promotion: every 2 minutes
  cron.schedule('*/2 * * * *', async () => {
    const userId = users[Math.floor(Math.random() * users.length)];
    const payload = {
      userId,
      type: 'promotion',
      content: `🔥 Flash Sale! 50% off on your favorite items!`
    };

    try {
      await publishToQueue('notification-events', payload);
      console.log(`🎁 Promotion notification published for ${userId}`);
    } catch (err) {
      console.error('❌ Failed to publish promotion:', err.message);
    }
  });

  // 💡 Recommendation: every 90 seconds
  cron.schedule('*/1 * * * *', async () => {
    const userId = users[Math.floor(Math.random() * users.length)];
    const product = products[Math.floor(Math.random() * products.length)];
    const payload = {
      userId,
      type: 'recommendation',
      content: `👀 Based on your interest, check out this ${product}`
    };

    try {
      await publishToQueue('recommendation-events', payload);
      console.log(`📤 Recommendation published for ${userId}`);
    } catch (err) {
      console.error('❌ Failed to publish recommendation:', err.message);
    }
  });
});

// Start the scheduler service
app.listen(PORT, () => {
  console.log(`⏰ Scheduler Service running on port ${PORT}`);
});