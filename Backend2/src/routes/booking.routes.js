
const express = require('express');
const { createBooking, getUserBookings } = require('../controllers/booking.controller');
const { protectUserRoutes } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/', protectUserRoutes, createBooking);
router.get('/my-bookings', protectUserRoutes, getUserBookings);

module.exports = router;
