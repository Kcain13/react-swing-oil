const express = require('express');
const router = express.Router();
const { getRoundDetails, submitScores } = require('../controllers/rounds');
const { verifyToken } = require('../middleware/auth');

router.get('/:roundId', verifyToken, async (req, res) => {
    try {
        const roundDetails = await getRoundDetails(req.params.roundId);
        res.json(roundDetails);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch round details' });
    }
});

router.post('/:roundId/scores', verifyToken, async (req, res) => {
    try {
        await submitScores(req.params.roundId, req.body.scores);
        res.status(200).json({ message: 'Scores submitted successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to submit scores' });
    }
});

module.exports = router;
