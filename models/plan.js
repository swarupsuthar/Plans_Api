// models/plan.js
const mongoose = require('mongoose');

const planSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  location: { type: String, required: true },
  category: { type: String, required: true },
  time: { type: String, required: true },
  date: { type: Date, required: true },
  peopleInvited: { type: Number, required: true, min: 0, max: 8 },
  status: { type: String, enum: ['open', 'full'], default: 'open' },
  coordinates: { 
    type: { type: String, enum: ['Point'], required: true },
    coordinates: { type: [Number], required: true } // [longitude, latitude]
  }
});

// Index for geospatial queries
planSchema.index({ coordinates: '2dsphere' });

// Pre-save middleware to update the status based on peopleInvited
planSchema.pre('save', function (next) {
  if (this.peopleInvited >= 8) {
    this.status = 'full';
  } else {
    this.status = 'open';
  }
  next();
});

const Plan = mongoose.model('Plan', planSchema);

module.exports = Plan;
