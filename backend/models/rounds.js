const mongoose = require('mongoose');

const roundSchema = new mongoose.Schema({
    golferId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Golfer',
        required: true
    },
    courseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
        required: true
    },
    teeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tee',
        required: true
    },
    gameTypeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'GameType',
        required: true
    },
    datePlayed: {
        type: Date,
        required: true
    },
    useHandicap: {
        type: Boolean,
        required: true
    }
});

const Round = mongoose.model('Rounds', roundSchema);

module.exports = Round;
