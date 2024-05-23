const mongoose = require('mongoose');
const { Schema } = mongoose;

const roundSchema = new Schema({
    date_played: { type: Date, default: Date.now },
    golfer_id: { type: Schema.Types.ObjectId, ref: 'Golfer', required: true },
    course_id: { type: Number, required: true },
    tee_id: { type: Number, required: true },
    game_type_id: { type: Schema.Types.ObjectId, ref: 'GameType', required: true },
    use_handicap: { type: Boolean, default: false },
    scores: [{ type: Schema.Types.ObjectId, ref: 'Score' }]
});

roundSchema.methods.total_score = function () {
    // Calculate total score
};

roundSchema.methods.fairway_hits_percentage = function () {
    // Calculate fairway hits percentage
};

roundSchema.methods.average_score_per_hole = function () {
    // Calculate average score per hole
};

roundSchema.methods.best_score = function () {
    // Find the best (lowest) score of the round
};

roundSchema.methods.worst_score = function () {
    // Find the worst (highest) score of the round
};

roundSchema.methods.calculate_round_statistics = function () {
    // Calculate round statistics
};

roundSchema.methods.create_score_chart = function () {
    // Create a score chart
};

module.exports = mongoose.model('Round', roundSchema);
