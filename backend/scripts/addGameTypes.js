const mongoose = require('mongoose');
const GameType = require('../models/gameType');
require('dotenv').config();  // Load environment variables from .env file

const mongoUri = process.env.MONGO_URI;
if (!mongoUri) {
    throw new Error("MONGO_URI is not defined in the environment variables");
}

mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true });

const gameTypes = [
    { name: "Match Play", description: "A game type where players or teams compete on a hole-by-hole basis.", rules: "The player with the lowest number of strokes on an individual hole wins that hole; the player winning the most holes wins the match." },
    { name: "Stroke Play", description: "Players compete over a round or series of rounds by counting the total number of strokes taken.", rules: "The total number of strokes taken over one or more rounds determines the winner." },
    { name: "Tournament Play", description: "A competitive format typically involving a large number of players participating in an extended event.", rules: "The player with the lowest cumulative score at the end of the tournament is declared the winner." },
    { name: "Solo Play", description: "Players play alone focusing on their own scores without direct competition.", rules: "Focuses on personal bests and improving individual performance metrics." }
];

const addGameTypes = async () => {
    try {
        await GameType.deleteMany({}); // Clear existing game types
        await GameType.insertMany(gameTypes);
        console.log("Game types have been added to the database.");
        mongoose.disconnect();
    } catch (err) {
        console.error("Error adding game types:", err);
        mongoose.disconnect();
    }
};

addGameTypes();
