const express = require('express');
const { registerUser, loginUser } = require('../controllers/authController');

const router = express.Router();

// Ruta para registro
router.post('/register', registerUser);

// Ruta para login
router.post('/login', loginUser);

module.exports = router;
