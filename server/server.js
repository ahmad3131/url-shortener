/**
 * Server Entry Point
 * This is the main file that starts the Express server
 * Uses JSON file storage instead of MongoDB
 */

// Import required packages
const express = require('express');
const cors = require('cors');

// Import URL routes
const urlRoutes = require('./routes/urlRoutes');

// Create an Express application
const app = express();

// ============================================
// MIDDLEWARE
// ============================================

// Middleware to parse JSON request bodies
app.use(express.json());

// Middleware to parse URL-encoded form data
app.use(express.urlencoded({ extended: true }));

// CORS middleware - allows frontend to communicate with backend
app.use(cors({
  origin: '*',  // Allow all origins in development
  credentials: true
}));

// ============================================
// ROUTES
// ============================================

// API routes
app.use('/api', urlRoutes);

// Redirect route (handles short URLs)
app.use('/', urlRoutes);

// ============================================
// ERROR HANDLING MIDDLEWARE
// ============================================

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: 'Route not found'
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({
    success: false,
    error: 'Internal server error'
  });
});

// ============================================
// START SERVER
// ============================================

// Get the port from environment or use 5000
const PORT = process.env.PORT || 5000;

// Start listening for requests
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Open http://localhost:${PORT} in your browser`);
});
