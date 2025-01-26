const express = require('express');
const { getAllUsers, createUser } = require('../controllers/user.controller');
const router = express.Router();

// Define routes
router.get('/', getAllUsers); // Fetch all users
router.post('/', createUser); // Create a new user

module.exports = router;
