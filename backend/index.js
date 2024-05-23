require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

mongoose.set('strictQuery', false);

const PORT = process.env.PORT || 5001;

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}).catch((error) => {
    console.error('Error connecting to MongoDB:', error.message);
});

app.use(bodyParser.json());

const courseRoutes = require('./routes/courses');
const roundRoutes = require('./routes/rounds');
const golferRoutes = require('./routes/golfers');
const gameTypeRoutes = require('./routes/gameTypes');

app.use('/api/courses', courseRoutes);
app.use('/api/rounds', roundRoutes);
app.use('/api/golfers', golferRoutes);
app.use('/api/game-types', gameTypeRoutes);
