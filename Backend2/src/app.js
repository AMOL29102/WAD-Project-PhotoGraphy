const express = require('express');
const connectDB = require('./config/db');
const userRoutes = require('./routes/user.routes');
const cors = require('cors');
require('dotenv').config();

// Initialize the app
const app = express();

// Middleware
app.use(express.json());
app.use(cors());


// Connect to database
connectDB();

// Routes
app.use('/api/users', userRoutes);
app.use('/api/events', require('./routes/event.routes'));
app.use('/api/gallery', require('./routes/gallery.routes'));
app.use('/api/bookings', require('./routes/booking.routes'));

// Default route
app.get('/', (req, res) => {
  res.send('API is running...');
});

module.exports = app;
