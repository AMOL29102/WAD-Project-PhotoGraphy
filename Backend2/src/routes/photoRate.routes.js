
const express = require('express');
const { createPhotoRate, getPhotoRates, deletePhotoRate } = require('../controllers/photoRate.controller');
const { protectAdminRoutes } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', protectAdminRoutes, createPhotoRate);
router.get('/', getPhotoRates);
router.delete('/:id', protectAdminRoutes, deletePhotoRate);

module.exports = router;
