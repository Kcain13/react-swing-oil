const express = require('express');
const router = express.Router();
const { getGolferTrophyRoom } = require('../controllers/golfers');

// Route to get golfer's trophy room data
router.get('/:golferId/trophy_room', getGolferTrophyRoom);

module.exports = router;
