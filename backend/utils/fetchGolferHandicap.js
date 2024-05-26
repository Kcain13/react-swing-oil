// utils/fetchGolferHandicap.js
const axios = require('axios');
const { getAdminToken } = require('./TokenManager');

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
