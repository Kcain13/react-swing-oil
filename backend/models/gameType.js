const mongoose = require('mongoose');

const gameTypeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
    rules: {
        type: String,
        required: true,
        trim: true,
    },
});

const GameType = mongoose.model('GameType', gameTypeSchema);

module.exports = GameType;
