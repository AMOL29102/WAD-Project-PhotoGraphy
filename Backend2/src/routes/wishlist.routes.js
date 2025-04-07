const express = require('express');
const { addToWishlist, getWishlist } = require('../controllers/wishlist.controller');
const { protectUserRoutes } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/:serviceId', protectUserRoutes, addToWishlist);
router.get('/', protectUserRoutes, getWishlist);

module.exports = router;
