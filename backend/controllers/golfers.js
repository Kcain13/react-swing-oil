// controllers/golfers.js
const { Golfer, Milestone, Statistic, Round, Score, Leaderboard, GameType } = require('../models');
const { fetchGolferHandicap } = require('../utils/fetchGolferHandicap');

const getGolferTrophyRoom = async (req, res) => {
    const { golferId } = req.params;

    try {
        const golfer = await Golfer.findById(golferId).populate('statistics');
        if (!golfer) {
            return res.status(404).json({ message: 'Golfer not found' });
        }

        let handicap = 'Not available';
        if (golfer.ghinId && golfer.lastName && golfer.state) {
            handicap = await fetchGolferHandicap(golfer.ghinId, golfer.lastName, golfer.state) || 'Not available';
        }

        const milestones = await Milestone.find({ golferId }).sort({ date: -1 });

        res.json({
            golfer,
            handicap,
            milestones
        });
    } catch (error) {
        console.error('Error fetching golfer trophy room:', error);
        res.status(500).json({ message: 'Failed to fetch trophy room data' });
    }
};

module.exports = {
    getGolferTrophyRoom
};
