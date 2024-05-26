// models/golfer.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const golferSchema = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    ghinId: { type: Number, default: null }, // Optional
    state: { type: String, required: function () { return !!this.ghinId; } }, // Required if ghinId is provided
    statistics: { type: mongoose.Schema.Types.ObjectId, ref: 'Statistic' }
});

const Golfer = mongoose.model('Golfer', golferSchema);
module.exports = Golfer;
