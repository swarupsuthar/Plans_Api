// routes/planRoutes.js
const express = require('express');
const { createPlan, getAllPlans, filterPlans } = require('../controllers/planController');
const router = express.Router();

// POST route to create a new plan
router.post('/plans', createPlan);

// GET route to fetch all plans
router.get('/plans', getAllPlans);

// GET route to filter plans by category, location, status, and date
router.get('/plans/filter', filterPlans);

module.exports = router;
