const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('🟢 MongoDB connected - Notification Service'))
  .catch((err) => console.error('❌ MongoDB connection error:', err));

// Routes
const notificationRoutes = require('./routes/notificationRoutes');
app.use('/api/notifications', notificationRoutes);

app.get('/', (req, res) => {
});

app.listen(process.env.PORT, () => {
  console.log('📢 Notification Service listening on port 3002');
});
require('./consumer');