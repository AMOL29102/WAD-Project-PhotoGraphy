
const express = require('express');
const { getAllEvents, createEvent, updateEvent } = require('../controllers/event.controller');
const { protectUserRoutes,protectAdminRoutes } = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/', getAllEvents);
router.post('/', protectAdminRoutes, createEvent);
router.put('/:id', protectUserRoutes, updateEvent);

module.exports = router;
