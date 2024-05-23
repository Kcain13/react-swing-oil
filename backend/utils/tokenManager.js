const axios = require('axios');
let globalApiToken = null;
let tokenExpiry = null;

const getAdminToken = async () => {
    const currentTime = new Date();

    if (globalApiToken && tokenExpiry && tokenExpiry > currentTime) {
        console.log('Using cached token');
        return globalApiToken;
    }

    console.log('Fetching new token');
    try {
        const response = await axios.post('https://api2.ghin.com/api/v1/golfer_login.json', {
            token: 'dummy token',
            user: {
                password: process.env.GHIN_ADMIN_PASSWORD,
                email_or_ghin: process.env.GHIN_ADMIN_USER,
                remember_me: true
            }
        });

        if (response.status === 200) {
            globalApiToken = response.data.golfer_user.golfer_user_token;
            tokenExpiry = new Date(currentTime.getTime() + 24 * 60 * 60 * 1000); // Set expiry time to 24 hours
            return globalApiToken;
        } else {
            console.error('Token not found in response');
            return null;
        }
    } catch (error) {
        console.error('Failed to get admin token:', error.response ? error.response.statusText : error.message);
        return null;
    }
};

module.exports = { getAdminToken };
