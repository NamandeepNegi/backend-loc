const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const port = 5000;
require('dotenv').config()
// 9v9SyLNNu8STddD9
// Replace <username>, <password>, and <dbname> with your actual MongoDB Atlas credentials
const mongoURI = process.env.MONGO_URI;

// Connect to MongoDB Cloud without deprecated options
mongoose.connect(mongoURI)
  .then(() => console.log('Connected to MongoDB Cloud'))
  .catch(err => console.error('MongoDB connection error:', err));

// Define a Mongoose schema
const locationSchema = new mongoose.Schema({
  name: String,
  latitude: Number,
  longitude: Number,
  timestamp: { type: Date, default: Date.now }
});

// Create a model
const Location = mongoose.model('Location', locationSchema);

// Middleware
app.use(cors());
app.use(express.json());

// Route to handle location data
app.post('/location', (req, res) => {
  const { name, latitude, longitude } = req.body;

  // Create a new location document
  const newLocation = new Location({ name, latitude, longitude });

  // Save it to the database
  newLocation.save()
    .then(() => res.status(200).send("Location saved"))
    .catch(err => res.status(500).send("Error saving location"));

  console.log(`Received: Name: ${name}, Latitude: ${latitude}, Longitude: ${longitude}`);
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
