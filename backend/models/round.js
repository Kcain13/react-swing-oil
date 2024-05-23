const mongoose = require('mongoose');
const Score = require('./score');

const roundSchema = new mongoose.Schema({
    date_played: {
        type: Date,
        default: Date.now
    },
    golfer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Golfer',
        required: true
    },
    course_id: {
        type: Number,
        required: true
    },
    tee_id: {
        type: Number,
        required: true
    },
    game_type: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'GameType',
        required: true
    },
    use_handicap: {
        type: Boolean,
        default: false
    },
    scores: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Score'
    }]
});

roundSchema.methods.total_score = function () {
    return this.scores.reduce((total, score) => total + score.score, 0);
};

roundSchema.methods.fairway_hits_percentage = function () {
    const fairwayHits = this.scores.filter(score => score.fairwayHit).length;
    return (fairwayHits / this.scores.length) * 100;
};

roundSchema.methods.avg_par3_score = function () {
    const par3Scores = this.scores.filter(score => score.holePar === 3);
    return par3Scores.reduce((total, score) => total + score.score, 0) / par3Scores.length || 0;
};

roundSchema.methods.avg_par4_score = function () {
    const par4Scores = this.scores.filter(score => score.holePar === 4);
    return par4Scores.reduce((total, score) => total + score.score, 0) / par4Scores.length || 0;
};

roundSchema.methods.avg_par5_score = function () {
    const par5Scores = this.scores.filter(score => score.holePar === 5);
    return par5Scores.reduce((total, score) => total + score.score, 0) / par5Scores.length || 0;
};

roundSchema.methods.calculate_round_statistics = function () {
    const total_score = this.total_score();
    const first_nine_score = this.scores.filter(score => score.holeNumber <= 9).reduce((total, score) => total + score.score, 0);
    const last_nine_score = this.scores.filter(score => score.holeNumber > 9).reduce((total, score) => total + score.score, 0);
    const total_putts = this.scores.reduce((total, score) => total + score.putts, 0);
    const total_penalties = this.scores.reduce((total, score) => total + score.penalties, 0);
    const total_bunker_shots = this.scores.reduce((total, score) => total + score.bunkerShots, 0);

    const fairways_hit = this.scores.filter(score => score.fairwayHit).length;
    const greens_in_regulation = this.scores.filter(score => score.greenInRegulation).length;

    const statistics = {
        total_score,
        first_nine_score,
        last_nine_score,
        total_putts,
        fairways_hit_ratio: `${fairways_hit}/${this.scores.length}`,
        greens_in_regulation_ratio: `${greens_in_regulation}/${this.scores.length}`,
        total_penalties,
        total_bunker_shots,
    };

    return statistics;
};

roundSchema.methods.create_score_chart = function () {
    const par3_avg = this.avg_par3_score();
    const par4_avg = this.avg_par4_score();
    const par5_avg = this.avg_par5_score();

    const chartData = {
        labels: ['Par 3', 'Par 4', 'Par 5'],
        datasets: [{
            label: 'Average Score',
            data: [par3_avg, par4_avg, par5_avg],
            backgroundColor: ['rgba(75, 192, 192, 0.2)'],
            borderColor: ['rgba(75, 192, 192, 1)'],
            borderWidth: 1
        }]
    };

    return chartData;
};

module.exports = mongoose.model('Round', roundSchema);
