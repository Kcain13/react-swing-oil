const mongoose = require('mongoose');

const CourseSchema = new mongoose.Schema({
    name: { type: String, required: true },
    status: { type: String },
    latitude: { type: Number },
    longitude: { type: Number },
    facilityId: { type: Number },
    facilityName: { type: String },
    fullName: { type: String },
    address: { type: String },
    city: { type: String },
    state: { type: String },
    zipCode: { type: String },
    country: { type: String },
    phone: { type: String },
    email: { type: String },
    updatedOn: { type: Date }
});

module.exports = mongoose.model('Course', CourseSchema);
