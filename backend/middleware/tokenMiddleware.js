// middleware/tokenMiddleware.js

const { getAdminToken } = require('../utils/TokenManager');

async function TokenMiddleware(req, res, next) {
    const token = await getAdminToken();
    if (!token) {
        return res.status(500).json({ error: 'Failed to fetch admin token' });
    }
    req.adminToken = token;
    next();
}

module.exports = TokenMiddleware;
