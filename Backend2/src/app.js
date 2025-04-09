const express = require('express');
const connectDB = require('./config/db');
const userRoutes = require('./routes/user.routes');
const cors = require('cors');
require('dotenv').config();
const wishlistRoutes = require('./routes/wishlist.routes')
// Initialize the app
const app = express();
const path = require('path');

// Middleware
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:5173", "https://hiraiphotostudio.vercel.app"],
    credentials: true, // only if using cookies/auth headers
  })
);
// app.use('/uploads', express.static(path.join(__dirname, '../uploads'))); 


// Connect to database
connectDB();


app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


// Routes
app.use('/api/users', userRoutes);
app.use('/api/events', require('./routes/event.routes'));
app.use('/api/gallery', require('./routes/gallery.routes'));
app.use('/api/bookings', require('./routes/booking.routes'));
app.use('/api/wishlist', wishlistRoutes)
app.use('/api/photo-rates', require('./routes/photoRate.routes'));

// Default route
app.get('/', (req, res) => {
  res.send('API is running...');
});

module.exports = app;