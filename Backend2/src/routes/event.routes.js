
// const express = require('express');
// const { getAllEvents, createEvent, updateEvent } = require('../controllers/event.controller');
// const { protectUserRoutes,protectAdminRoutes } = require('../middleware/authMiddleware');
// const router = express.Router();

// router.get('/', getAllEvents);
// router.post('/', protectAdminRoutes, createEvent);
// router.put('/:id', protectUserRoutes, updateEvent);

// module.exports = router;

const express = require('express');
const router = express.Router();
const { 
  getAllEvents, 
  createEvent, 
  updateEvent, 
  getEventServices, 
  createService 
} = require('../controllers/event.controller.js');

router.get('/', getAllEvents);
router.post('/', createEvent);
router.put('/:id', updateEvent);
router.get('/:eventId/services', getEventServices);
router.post('/:eventId/services', createService);

module.exports = router;