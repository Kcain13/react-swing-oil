const express = require('express');
const router = express.Router();
const { getAllGameTypes, addGameType } = require('../controllers/GameTypes');

// Define the routes
router.get('/', getAllGameTypes);
router.post('/', addGameType);

module.exports = router;
