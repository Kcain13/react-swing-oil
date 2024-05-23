const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const golferSchema = new Schema({
    username: { type: String, required: true },
    ghinId: { type: String, required: true },
    lastName: { type: String, required: true },
    state: { type: String, required: true },
    statistics: { type: mongoose.Schema.Types.ObjectId, ref: 'Statistic' }
});

const Golfer = mongoose.model('Golfer', golferSchema);
module.exports = Golfer;
