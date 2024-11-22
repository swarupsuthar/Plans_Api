// controllers/planController.js
const Plan = require('../models/plan');
const moment = require('moment');

// Create a new plan
const createPlan = async (req, res) => {
  try {
    const { firstName, location, category, time, date, peopleInvited, longitude, latitude } = req.body;

    // Create new plan instance
    const newPlan = new Plan({
      firstName,
      location,
      category,
      time,
      date: new Date(date),
      peopleInvited,
      coordinates: { type: 'Point', coordinates: [longitude, latitude] },
    });

    // Save to database
    await newPlan.save();

    res.status(201).json({
      message: 'Plan created successfully',
      plan: newPlan,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error creating plan', error });
  }
};

// Get all plans
const getAllPlans = async (req, res) => {
  try {
    const plans = await Plan.find();
    res.status(200).json(plans);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching plans', error });
  }
};

// Filter plans by category, location, status, and date
const filterPlans = async (req, res) => {
  try {
    const { category, location, status, dateFilter, distance, latitude, longitude } = req.query;

    const filter = {};

    // Category filter
    if (category) filter.category = category;

    // Status filter
    if (status) filter.status = status;

    // Date filter logic
    if (dateFilter) {
      const currentDate = moment();
      switch (dateFilter) {
        case 'upcoming':
          filter.date = { $gt: currentDate.toDate() }; // Only future dates
          break;
        case 'active':
          filter.date = { $lte: currentDate.toDate(), $gte: currentDate.startOf('day').toDate() }; // Current day plans
          break;
        case 'after':
          if (req.query.after) {
            const afterDate = moment().add(req.query.after, req.query.unit || 'days');
            filter.date = { $gt: afterDate.toDate() }; // Filter plans after a certain period
          }
          break;
      }
    }

    // Location filter (within a certain radius in km)
    if (distance && latitude && longitude) {
      const point = { type: 'Point', coordinates: [longitude, latitude] };
      filter.coordinates = {
        $nearSphere: {
          $geometry: point,
          $maxDistance: distance * 1000, // Convert km to meters
        },
      };
    }

    const plans = await Plan.find(filter);
    res.status(200).json(plans);
  } catch (error) {
    res.status(500).json({ message: 'Error filtering plans', error });
  }
};

module.exports = { createPlan, getAllPlans, filterPlans };
