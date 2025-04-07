const express = require('express');
const { estimatePrice } = require('../controllers/estimate.controller');
// const protect = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/:serviceId', estimatePrice);

module.exports = router;