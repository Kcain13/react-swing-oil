const mongoose = require('mongoose');

const milestoneSchema = new mongoose.Schema({
    golferId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Golfer',
        required: true
    },
    type: String,
    details: String,
    date: Date
});

const Milestone = mongoose.model('Milestone', milestoneSchema);

module.exports = Milestone;
