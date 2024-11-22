// app.js
const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
const planRoutes = require('./routes/planRoutes');

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());

// Connect to MongoDB
connectDB();


// Define Routes
app.use('/api', planRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
