const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const milestoneSchema = new Schema({
    golferId: { type: mongoose.Schema.Types.ObjectId, ref: 'Golfer', required: true },
    type: { type: String, required: true },
    details: { type: String, required: true },
    date: { type: Date, default: Date.now }
});

const Milestone = mongoose.model('Milestone', milestoneSchema);
module.exports = Milestone;
