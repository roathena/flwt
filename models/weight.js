const mongoose = require('mongoose');

const weightSchema = new mongoose.Schema({
  weight: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Weight', weightSchema);
