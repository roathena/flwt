const express = require('express');
const mongoose = require('mongoose');
const Weight = require('./models/weight');
const path = require('path');
require('dotenv').config()

// Replace with your actual MongoDB Atlas connection URI
const MONGO_URI = `${process.env.DATABASE_URL}`;

mongoose.connect(MONGO_URI)
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch(error => console.error('Error connecting to MongoDB', error));

const app = express();

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Parse incoming JSON requests
app.use(express.json());

// Route to add a new weight entry (POST request)
app.post('/weight', async (req, res) => {
  try {
    // Access weight from request body
    const weight = req.body.weight;

    // Basic validation (optional)
    if (!weight || typeof weight !== 'number') {
      return res.status(400).json({ message: 'Invalid weight value' });
    }

    const newWeight = new Weight({ weight });
    await newWeight.save();

    res.json({ message: 'Weight added successfully!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error adding weight' });
  }
});

app.get('/stats', async (req, res) => {
  try {
    // Retrieve all weight entries from the database
    const weights = await Weight.find();

    // Format weight data with formatted dates and times
    const formattedWeights = weights.map(weight => ({
      weight: weight.weight,
      formattedDateTime: weight.date.toLocaleString('en-US', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' }),
    }));

    res.json(formattedWeights); // Send formatted weights as JSON response
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching weights' }); // Handle errors
  }
});

app.delete('/weights', async (req, res) => {
  try {
    // Delete all weight entries using deleteMany
    const deleteResult = await Weight.deleteMany({});

    // Respond with the number of deleted documents
    res.json({ message: `Deleted ${deleteResult.deletedCount} weight entries!` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error deleting weights' });
  }
});

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server listening on port ${port}`));
