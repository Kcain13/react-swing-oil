const mongoose = require('mongoose');

const golferSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    ghinId: String,
    lastName: String,
    state: String,
    statistics: {
        averageScore: Number,
        fairwayHitPercentage: Number,
        greenInRegulationPercentage: Number,
        puttsPerRound: Number,
        bunkerSavePercentage: Number
    }
    // Add other fields as necessary
});

const Golfer = mongoose.model('Golfer', golferSchema);

module.exports = Golfer;
