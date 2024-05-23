const express = require('express');
const router = express.Router();
const { getGameTypes } = require('../controllers/gameTypes');

router.get('/', getGameTypes);

module.exports = router;
