const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const golferRoutes = require('./routes/golfers');
const courseRoutes = require('./routes/courses');
const roundRoutes = require('./routes/rounds');
const gameTypeRoutes = require('./routes/gameTypes'); // Add this line


app.use('/api/golfers', golferRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/rounds', roundRoutes);
app.use('/api/gameTypes', gameTypeRoutes); // Add this line

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
