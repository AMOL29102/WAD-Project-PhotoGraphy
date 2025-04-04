
const express = require('express');
const { getAllUsers, createUser, loginUser } = require('../controllers/user.controller');
const router = express.Router();

router.get('/', getAllUsers);
router.post('/register', createUser);
router.post('/login', loginUser);

module.exports = router;
