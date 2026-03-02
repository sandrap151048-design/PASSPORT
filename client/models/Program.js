import mongoose from 'mongoose';

const programSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, required: true, enum: ['undergraduate', 'postgraduate', 'doctoral'] },
  duration: { type: String, required: true },
  description: String,
  highlights: [{
    name: String,
    detail: String
  }],
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.models.Program || mongoose.model('Program', programSchema);
