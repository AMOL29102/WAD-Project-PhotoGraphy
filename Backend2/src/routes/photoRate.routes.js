
const express = require('express');
const { createPhotoRate, getPhotoRates } = require('../controllers/photoRate.controller');
const { protectAdminRoutes } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', protectAdminRoutes, createPhotoRate);
router.get('/', getPhotoRates);

module.exports = router;
