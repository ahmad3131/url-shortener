/**
 * URL Model
 * This file defines the schema for storing shortened URLs in MongoDB
 */

const mongoose = require('mongoose');

// Define the URL schema
const urlSchema = new mongoose.Schema({
  // The original long URL that needs to be shortened
  originalUrl: {
    type: String,
    required: true,  // This field is mandatory
    trim: true       // Remove extra whitespace
  },
  
  // The unique short code generated for this URL
  shortCode: {
    type: String,
    required: true,
    unique: true,   // Each short code must be unique
    trim: true
  },
  
  // Timestamp when the URL was shortened
  createdAt: {
    type: Date,
    default: Date.now  // Automatically set to current time
  },
  
  // Counter for tracking how many times the short URL was visited
  clicks: {
    type: Number,
    default: 0  // Start at 0 visits
  }
});

// Create the URL model from the schema
// This allows us to perform CRUD operations on the 'urls' collection
const Url = mongoose.model('Url', urlSchema);

// Export the Url model for use in other files
module.exports = Url;
