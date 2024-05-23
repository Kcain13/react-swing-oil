const { Round, Rounds, Golfer, Milestone, Statistic, Score, Leaderboard, GameType } = require('../models');
// Your existing code

// Controller function to start a new round
const startRound = async (req, res) => {
    const { golferId, courseId, teeId, gameTypeId, useHandicap } = req.body;
    try {
        const newRound = new Round({
            golferId,
            courseId,
            teeId,
            gameTypeId,
            useHandicap,
            datePlayed: new Date()
        });
        await newRound.save();
        res.status(201).json(newRound);
    } catch (error) {
        console.error('Error starting a new round:', error);
        res.status(500).json({ message: 'Failed to start a new round' });
    }
};
// Helper function to calculate statistics from scores
const calculateStatistics = (scores) => {
    const totalScore = scores.reduce((acc, score) => acc + score.score, 0);
    const firstNineScore = scores.slice(0, 9).reduce((acc, score) => acc + score.score, 0);
    const lastNineScore = scores.slice(9).reduce((acc, score) => acc + score.score, 0);
    const totalPutts = scores.reduce((acc, score) => acc + score.putts, 0);
    const fairwaysHit = scores.filter(score => score.fairwayHit).length;
    const greensInRegulation = scores.filter(score => score.greenInRegulation).length;
    const totalPenalties = scores.reduce((acc, score) => acc + score.penalties, 0);
    const totalBunkerShots = scores.reduce((acc, score) => acc + score.bunkerShots, 0);

    return {
        totalScore,
        firstNineScore,
        lastNineScore,
        totalPutts,
        fairwaysHitRatio: fairwaysHit / scores.length,
        greensInRegulationRatio: greensInRegulation / scores.length,
        totalPenalties,
        totalBunkerShots
    };
};

const getRoundDetails = async (roundId) => {
    try {
        const round = await Round.findById(roundId).populate('courseId teeId gameTypeId');
        if (!round) {
            throw new Error('Round not found');
        }

        const scores = await Score.find({ roundId });

        // Calculate statistics
        const statistics = calculateStatistics(scores);

        // Prepare data for Plotly graph
        const graphData = {
            data: [
                {
                    x: scores.map(score => score.holeNumber),
                    y: scores.map(score => score.score),
                    type: 'bar'
                }
            ],
            layout: {
                title: 'Scores per Hole',
                xaxis: { title: 'Hole Number' },
                yaxis: { title: 'Score' }
            }
        };

        return {
            round,
            scores,
            statistics,
            graphData
        };
    } catch (error) {
        console.error('Error fetching round details:', error);
        throw new Error('Failed to fetch round details');
    }
};

const submitScores = async (roundId, scores) => {
    try {
        // Remove existing scores for the round
        await Score.deleteMany({ roundId });

        // Insert new scores
        const scoreDocuments = scores.map(scoreData => new Score({ roundId, ...scoreData }));
        await Score.insertMany(scoreDocuments);
    } catch (error) {
        console.error('Error submitting scores:', error);
        throw new Error('Failed to submit scores');
    }
};

module.exports = {
    startRound,
    submitScores,
    getRoundDetails
};
