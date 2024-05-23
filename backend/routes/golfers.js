// routes/golfers.js
const express = require('express');
const { getGolferTrophyRoom } = require('../controllers/golfers');
const router = express.Router();

router.get('/:golferId/trophy-room', getGolferTrophyRoom);

module.exports = router;
