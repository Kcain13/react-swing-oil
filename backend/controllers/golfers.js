const { Golfer, Milestone } = require('../models');
const axios = require('axios');
const { getAdminToken } = require('../utils/tokenManager');

const fetchGolferHandicap = async (ghinId, lastName, state) => {
    try {
        const token = await getAdminToken();
        if (!token) {
            throw new Error('Authentication token is missing or invalid');
        }

        const response = await axios.get('https://api2.ghin.com/api/v1/golfers/search.json', {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            params: {
                per_page: '50',
                page: '1',
                ghin_id: ghinId,
                last_name: lastName,
                state: state
            }
        });

        const golfers = response.data.golfers;
        if (golfers && golfers.length > 0) {
            const golfer = golfers.find(g => String(g.ghin) === String(ghinId));
            if (golfer) {
                return golfer.handicap_index;
            }
        }
        return null;
    } catch (error) {
        console.error('Error fetching golfer handicap:', error);
        return null;
    }
};

module.exports = {
    fetchGolferHandicap
};


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
