const mongoose = require('mongoose');

const scoreSchema = new mongoose.Schema({
    roundId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Round',
        required: true
    },
    holeNumber: {
        type: Number,
        required: true
    },
    holePar: {
        type: Number,
        required: true
    },
    yardage: {
        type: Number,
        required: true
    },
    holeHandicap: {
        type: Number,
        required: true
    },
    score: {
        type: Number,
        required: true,
        min: 1,
        max: 15
    },
    fairwayHit: {
        type: Boolean,
        default: false
    },
    greenInRegulation: {
        type: Boolean,
        default: false
    },
    putts: {
        type: Number,
        required: true,
        min: 0
    },
    bunkerShots: {
        type: Number,
        default: 0
    },
    penalties: {
        type: Number,
        default: 0
    }
});

const Score = mongoose.model('Score', scoreSchema);

module.exports = Score;
