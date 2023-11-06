const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Route for user registration
router.post('/register', authController.registerUser);

// Route for user login
router.post('/login', authController.loginUser);

// Route for user logout (you can customize the endpoint and method as needed)
router.post('/logout', authController.logoutUser);

module.exports = router;
