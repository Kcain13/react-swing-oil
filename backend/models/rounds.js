const mongoose = require('mongoose');
const Round = require('./Round');

const roundsSchema = new mongoose.Schema({
    golfer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Golfer',
        required: true
    },
    rounds: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Round'
    }]
});

roundsSchema.methods.best_score = async function () {
    const recentRounds = await Round.find({ _id: { $in: this.rounds } }).sort({ date_played: -1 }).limit(5);
    return Math.min(...recentRounds.map(round => round.total_score()));
};

roundsSchema.methods.worst_score = async function () {
    const recentRounds = await Round.find({ _id: { $in: this.rounds } }).sort({ date_played: -1 }).limit(5);
    return Math.max(...recentRounds.map(round => round.total_score()));
};

roundsSchema.methods.avg_score = async function () {
    const recentRounds = await Round.find({ _id: { $in: this.rounds } }).sort({ date_played: -1 }).limit(5);
    const totalScore = recentRounds.reduce((sum, round) => sum + round.total_score(), 0);
    return totalScore / recentRounds.length;
};

module.exports = mongoose.model('Rounds', roundsSchema);
