const express = require('express');
const mongoose = require('mongoose');
const app = express();

// Other imports and middleware setup

// Connect to the MongoDB database
mongoose.connect('mongodb://localhost:27017/portfolio_management_db', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on('error', (error) => console.error('MongoDB connection error:', error));
db.once('open', () => console.log('Connected to MongoDB database'));

// Use the project routes
const projectRoutes = require('./routes/projectRoutes');
app.use('/api', projectRoutes);

// Other routes and middleware setup

// Start the server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
