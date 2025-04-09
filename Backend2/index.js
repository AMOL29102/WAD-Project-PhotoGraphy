const express = require('express');
const fileUpload = require('express-fileupload');
const connectDB = require('./src/config/db');
const userRoutes = require('./src/routes/user.routes');
const cors = require('cors');
require('dotenv').config();
const wishlistRoutes = require('./src/routes/wishlist.routes');
const app = express();

// Middleware
app.use(express.json());
app.use(cors({ origin: '*' }));
app.use(fileUpload()); // Add this to handle file uploads

// Connect to database
connectDB();


// Routes
app.use('/api/users', userRoutes);
app.use('/api/events', require('./src/routes/event.routes'));
app.use('/api/gallery', require('./src/routes/gallery.routes'));
app.use('/api/bookings', require('./src/routes/booking.routes'));
app.use('/api/wishlist', wishlistRoutes);
app.use('/api/photo-rates', require('./src/routes/photoRate.routes'));

app.get('/', (req, res) => {
  res.send('API is running...');
});

// module.exports = app;

const PORT = process.env.PORT || 3000;
// ✅ Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});


