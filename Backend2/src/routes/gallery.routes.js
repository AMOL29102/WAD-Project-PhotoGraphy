
const express = require('express');
const { getAllGalleryItems, createGalleryItem, getGalleryByEvent } = require('../controllers/gallery.controller');
const { protectUserRoutes } = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/', getAllGalleryItems);
router.post('/', protectUserRoutes, createGalleryItem);
router.get('/event/:eventId', getGalleryByEvent);

module.exports = router;
