import mongoose from 'mongoose';

const countrySchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  imageUrl: String,
  flagUrl: String,
  highlights: [String],
  universities: [{
    name: String,
    ranking: String,
    programs: [String]
  }],
  visaRequirements: [String],
  costOfLiving: String,
  popularCities: [String],
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.models.Country || mongoose.model('Country', countrySchema);
