/**
 * Database Configuration
 * This file handles the connection to MongoDB database
 */

const mongoose = require('mongoose');

// Hardcoded MongoDB URI for now (you can use .env file as well)
const MONGO_URI = 'mongodb+srv://shovon:12345@cluster0.d442h.mongodb.net/urlshortener';

/**
 * Connect to MongoDB database
 * Uses the MONGO_URI constant
 */
const connectDB = async () => {
  try {
    // Connect to MongoDB
    const conn = await mongoose.connect(MONGO_URI);
    
    // Log successful connection
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    // Log error if connection fails
    console.error(`Error: ${error.message}`);
    
    // Exit process with failure
    process.exit(1);
  }
};

// Export the connectDB function
module.exports = connectDB;
