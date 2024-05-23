const mongoose = require('mongoose');
const { Schema } = mongoose;

const statisticSchema = new Schema({
    golfer_id: { type: Schema.Types.ObjectId, ref: 'Golfer', required: true },
    average_score: { type: Number, default: 0 },
    fairway_hit_percentage: { type: Number, default: 0 },
    green_in_regulation_percentage: { type: Number, default: 0 },
    putts_per_round: { type: Number, default: 0 },
    total_rounds_played: { type: Number, default: 0 },
    total_wins: { type: Number, default: 0 },
    total_losses: { type: Number, default: 0 },
    birdies: { type: Number, default: 0 },
    pars: { type: Number, default: 0 },
    bogeys: { type: Number, default: 0 },
    double_bogeys: { type: Number, default: 0 }
});

statisticSchema.methods.update = function (score) {
    // Implement the logic to update statistics based on the score
};

module.exports = mongoose.model('Statistic', statisticSchema);
