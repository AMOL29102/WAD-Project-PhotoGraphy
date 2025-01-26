const express = require('express');
const connectDB = require('./config/db');
const userRoutes = require('./routes/user.routes');
require('dotenv').config();

// Initialize the app
const app = express();

// Middleware
app.use(express.json());

// Connect to database
connectDB();

// Routes
app.use('/api/users', userRoutes);

// Default route
app.get('/', (req, res) => {
  res.send('API is running...');
});

module.exports = app;
