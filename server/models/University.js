const mongoose = require('mongoose');

const universitySchema = new mongoose.Schema({
    name: { type: String, required: true },
    logoUrl: { type: String, required: true },
    country: { type: String },
    websiteUrl: { type: String },
    isActive: { type: Boolean, default: true },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('University', universitySchema);
