import mongoose from 'mongoose';

const destinationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  country: { type: String, required: true },
  description: String,
  features: [String],
  imageUrl: String,
  isActive: { type: Boolean, default: true }
});

export default mongoose.models.Destination || mongoose.model('Destination', destinationSchema);
