const express = require('express');
const router = express.Router();
const { startRound, submitScores, getRoundDetails } = require('../controllers/rounds');

// Define the routes
router.post('/start', startRound);
router.post('/:roundId/scores', submitScores);
router.get('/:roundId', getRoundDetails);

module.exports = router;
