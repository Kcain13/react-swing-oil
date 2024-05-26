// backend/controllers/authController.js

const Golfer = require('../models/Golfer');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
    const { firstName, lastName, username, email, password, ghinId, state } = req.body;

    try {
        const existingUser = await Golfer.findOne({ $or: [{ username }, { email }] });
        if (existingUser) {
            return res.status(400).json({ error: 'Username or email already taken' });
        }

        const hashedPassword = await bcrypt.hash(password, 12);
        const golfer = new Golfer({ firstName, lastName, username, email, password: hashedPassword, ghinId, state });
        await golfer.save();

        const token = jwt.sign({ id: golfer._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(201).json({ token, golfer });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

const login = async (req, res) => {
    const { username, password } = req.body;

    try {
        const golfer = await Golfer.findOne({ username });
        if (!golfer) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, golfer.password);
        if (!isMatch) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: golfer._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

module.exports = { register, login };
