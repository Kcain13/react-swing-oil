const mongoose = require('mongoose');
const { Schema } = mongoose;

const leaderboardSchema = new Schema({
    golfer_id: { type: Schema.Types.ObjectId, ref: 'Golfer', required: true },
    game_type_id: { type: Schema.Types.ObjectId, ref: 'GameType', required: true },
    score: { type: Number, required: true },
    position: { type: Number, default: null }
});

module.exports = mongoose.model('Leaderboard', leaderboardSchema);
