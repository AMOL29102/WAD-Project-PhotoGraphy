
const express = require('express');
const connectDB = require('./src/config/db');
const userRoutes = require('./src/routes/user.routes');
const cors = require('cors');
require('dotenv').config();
const wishlistRoutes = require('./src/routes/wishlist.routes')
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



// Connect to database
connectDB();


app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


// Routes
app.use('/api/users', userRoutes);
app.use('/api/events', require('./src/routes/event.routes'));
app.use('/api/gallery', require('./src/routes/gallery.routes'));
app.use('/api/bookings', require('./src/routes/booking.routes'));
app.use('/api/wishlist', wishlistRoutes)
app.use('/api/photo-rates', require('./src/routes/photoRate.routes'));

// Default route
app.get('/', (req, res) => {
  res.send('API is running...');
});

module.exports = app;
// module.exports.handler = serverless(app);

// const PORT = process.env.PORT || 3000;
// // ✅ Start the server
// app.listen(PORT, () => {
//   console.log(`Server running on http://localhost:${PORT}`);
// });


