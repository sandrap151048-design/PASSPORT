const mongoose = require('mongoose');

const countrySchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String },
  highlights: [String],
  universities: [String],
  
  // Additional detailed information
  whyStudy: { type: String }, // Why study in this country
  educationSystem: { type: String }, // About the education system
  
  // Cost Information
  tuitionFees: {
    undergraduate: { type: String },
    postgraduate: { type: String },
    doctoral: { type: String }
  },
  costOfLiving: {
    accommodation: { type: String },
    food: { type: String },
    transport: { type: String },
    overall: { type: String }
  },
  
  // Admission Requirements
  admissionRequirements: {
    academicQualifications: [String],
    languageRequirements: { type: String },
    standardizedTests: [String],
    documents: [String]
  },
  
  // Visa Information
  visaInformation: {
    visaType: { type: String },
    processingTime: { type: String },
    requirements: [String],
    workPermit: { type: String }
  },
  
  // Scholarships
  scholarships: [{
    name: { type: String },
    description: { type: String },
    amount: { type: String }
  }],
  
  // Work Opportunities
  workOpportunities: {
    duringStudy: { type: String },
    afterStudy: { type: String },
    partTimeJobs: [String],
    averageWages: { type: String }
  },
  
  // Student Life & Culture
  studentLife: {
    climate: { type: String },
    culture: { type: String },
    transportation: { type: String },
    activities: [String],
    safety: { type: String }
  },
  
  // Accommodation Options
  accommodation: {
    types: [{
      name: { type: String },
      description: { type: String },
      cost: { type: String }
    }],
    tips: [String]
  },
  
  // Healthcare & Insurance
  healthcare: {
    system: { type: String },
    insurance: { type: String },
    cost: { type: String },
    facilities: [String]
  },
  
  // Application Process
  applicationProcess: {
    timeline: [{
      phase: { type: String },
      description: { type: String },
      duration: { type: String }
    }],
    deadlines: { type: String },
    tips: [String]
  },
  
  // Popular Cities
  popularCities: [{
    name: { type: String },
    description: { type: String }
  }],
  
  // Intake Seasons
  intakePeriods: [String],
  
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Country', countrySchema);
