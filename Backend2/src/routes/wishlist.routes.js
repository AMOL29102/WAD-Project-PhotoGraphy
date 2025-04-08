const express = require('express');
const { addToWishlist, getWishlist, removeFromWishlist } = require('../controllers/wishlist.controller');
const { protectUserRoutes } = require('../middleware/authMiddleware');

const router = express.Router();


router.delete('/:serviceId', protectUserRoutes, removeFromWishlist);

router.post('/:serviceId', protectUserRoutes, addToWishlist);
router.get('/', protectUserRoutes, getWishlist);

module.exports = router;
