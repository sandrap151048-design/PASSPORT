import mongoose from 'mongoose';

const subscriptionSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    interest: { type: String, default: 'General' },
    status: { type: String, default: 'pending' },
    createdAt: { type: Date, default: Date.now }
});

export default mongoose.models.Subscription || mongoose.model('Subscription', subscriptionSchema);
