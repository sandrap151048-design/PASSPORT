import mongoose from 'mongoose';

const partnerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String },
    company: { type: String },
    createdAt: { type: Date, default: Date.now }
});

export default mongoose.models.Partner || mongoose.model('Partner', partnerSchema);
