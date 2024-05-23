const GameType = require('../models/gameType');
const Round = require('../models/round');
const Score = require('../models/score');
const Leaderboard = require('../models/leaderboard');
const Statistic = require('../models/statistic');



// Get all game types
const getAllGameTypes = async (req, res) => {
    try {
        const gameTypes = await GameType.find();
        res.json(gameTypes);
    } catch (error) {
        console.error('Error fetching game types:', error);
        res.status(500).json({ message: 'Failed to fetch game types' });
    }
};

// Add a new game type
const addGameType = async (req, res) => {
    const { name, description, rules } = req.body;
    try {
        const newGameType = new GameType({ name, description, rules });
        await newGameType.save();
        res.status(201).json(newGameType);
    } catch (error) {
        console.error('Error adding game type:', error);
        res.status(500).json({ message: 'Failed to add game type' });
    }
};
// Update leaderboard based on game type
const updateLeaderboard = async (roundId) => {
    const round = await Round.findById(roundId).populate('game_type');
    if (!round) throw new Error('Round not found');

    const scores = await Score.find({ round_id: roundId });

    if (round.game_type.name === "Match Play") {
        await processMatchPlay(scores);
    } else if (round.game_type.name === "Stroke Play") {
        await processStrokePlay(scores);
    } else if (round.game_type.name === "Tournament Play") {
        await processTournamentPlay(round.golfer_id, round.game_type._id);
    } else if (round.game_type.name === "Solo Play") {
        await processSoloPlay(round);
    }
};

// Process match play
const processMatchPlay = async (scores) => {
    const golferScores = {};
    scores.forEach(score => {
        golferScores[score.golfer_id] = 0;
    });

    for (let holeNumber = 1; holeNumber <= 18; holeNumber++) {
        const holeScores = scores.filter(score => score.hole_number === holeNumber);
        const minStrokes = Math.min(...holeScores.map(score => score.strokes));

        holeScores.forEach(score => {
            if (score.strokes === minStrokes && holeScores.filter(s => s.strokes === minStrokes).length === 1) {
                golferScores[score.golfer_id] += 1;
            }
        });
    }

    for (const [golferId, points] of Object.entries(golferScores)) {
        let leaderboardEntry = await Leaderboard.findOne({ golfer_id: golferId, game_type_id: gameTypeId });
        if (!leaderboardEntry) {
            leaderboardEntry = new Leaderboard({ golfer_id: golferId, game_type_id: gameTypeId, score: points });
            await leaderboardEntry.save();
        } else {
            leaderboardEntry.score += points;
            await leaderboardEntry.save();
        }
    }
};

// Process stroke play
const processStrokePlay = async (scores) => {
    const golferScores = {};
    scores.forEach(score => {
        if (!golferScores[score.golfer_id]) {
            golferScores[score.golfer_id] = 0;
        }
        golferScores[score.golfer_id] += score.strokes;
    });

    for (const [golferId, totalScore] of Object.entries(golferScores)) {
        let leaderboardEntry = await Leaderboard.findOne({ golfer_id: golferId, game_type_id: gameTypeId });
        if (!leaderboardEntry) {
            leaderboardEntry = new Leaderboard({ golfer_id: golferId, game_type_id: gameTypeId, score: totalScore });
            await leaderboardEntry.save();
        } else {
            leaderboardEntry.score = totalScore;
            await leaderboardEntry.save();
        }
    }
};

// Process tournament play
const processTournamentPlay = async (golferId, gameTypeId) => {
    const rounds = await Round.find({ golfer_id: golferId, game_type_id: gameTypeId }).limit(4);
    const totalScore = rounds.reduce((sum, round) => sum + round.total_score(), 0);

    let leaderboardEntry = await Leaderboard.findOne({ golfer_id: golferId, game_type_id: gameTypeId });
    if (!leaderboardEntry) {
        leaderboardEntry = new Leaderboard({ golfer_id: golferId, game_type_id: gameTypeId, score: totalScore });
        await leaderboardEntry.save();
    } else {
        leaderboardEntry.score = totalScore;
        await leaderboardEntry.save();
    }
};

// Process solo play
const processSoloPlay = async (round) => {
    const totalScore = round.total_score();

    let statistics = await Statistic.findOne({ golfer_id: round.golfer_id });
    if (!statistics) {
        statistics = new Statistic({
            golfer_id: round.golfer_id,
            average_score: totalScore,
            total_rounds_played: 1,
            average_strokes_per_round: totalScore
        });
        await statistics.save();
    } else {
        const roundsPlayed = statistics.total_rounds_played + 1;
        statistics.average_score = ((statistics.average_score * statistics.total_rounds_played) + totalScore) / roundsPlayed;
        statistics.average_strokes_per_round = ((statistics.average_strokes_per_round * statistics.total_rounds_played) + totalScore) / roundsPlayed;
        statistics.total_rounds_played = roundsPlayed;
        await statistics.save();
    }
};

module.exports = {
    getAllGameTypes,
    addGameType,
    updateLeaderboard,
    processMatchPlay,
    processStrokePlay,
    processTournamentPlay,
    processSoloPlay
};
