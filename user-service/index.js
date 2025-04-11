// require('dotenv').config();
// const express = require('express');
// const mongoose = require('mongoose');
// const userRoutes = require('./routes/userRoutes');

// const app = express();

// // Middleware
// app.use(express.json());

// // Routes
// app.use('/api/users', userRoutes);

// // Default route for testing
// app.get('/', (req, res) => res.send('User Service running!'));

// // MongoDB connection + Start server
// mongoose.connect(process.env.MONGO_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// })
// .then(() => {
//   console.log('✅ MongoDB connected');
//   app.listen(3001, () => console.log('🚀 User Service on port 3001'));
// })
// .catch((err) => {
//   console.error('❌ MongoDB connection failed:', err.message);
// });

require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');

const app = express();
app.use(express.json());

app.get('/', (req, res) => res.send('User Service running!'));

app.use('/api/users', userRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB connected');
    app.listen(3001, () => console.log('🚀 User Service on port 3001'));
  })
  .catch(err => {
    console.error('❌ MongoDB connection error:', err);
  });