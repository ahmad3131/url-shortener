/**
 * URL Controller
 * This file contains the business logic for URL shortening operations
 * Uses JSON file storage instead of MongoDB
 */

const { nanoid } = require('nanoid');
const storage = require('../config/storage');

/**
 * generateShortCode
 * Generates a unique short code (8 characters)
 * Uses nanoid for generating URL-friendly unique IDs
 */
const generateShortCode = () => {
  // Generate a short, URL-friendly unique ID
  return nanoid(8);
};

/**
 * shortenUrl
 * Controller function to create a new shortened URL
 * POST /api/shorten
 */
const shortenUrl = async (req, res) => {
  try {
    // Get the original URL from the request body
    const { originalUrl } = req.body;

    // Validate: Check if URL is provided
    if (!originalUrl) {
      return res.status(400).json({
        success: false,
        error: 'Please provide a URL to shorten'
      });
    }

    // Validate: Check if URL is valid format
    try {
      new URL(originalUrl);
    } catch (e) {
      return res.status(400).json({
        success: false,
        error: 'Invalid URL format. Please include http:// or https://'
      });
    }

    // Check if this URL was already shortened before
    const existingUrl = storage.findByOriginalUrl(originalUrl);
    
    if (existingUrl) {
      return res.status(200).json({
        success: true,
        data: existingUrl
      });
    }

    // Generate a unique short code
    let shortCode = generateShortCode();

    // Make sure the short code is truly unique
    let isUnique = false;
    let attempts = 0;
    
    while (!isUnique && attempts < 5) {
      const existing = storage.findByShortCode(shortCode);
      if (!existing) {
        isUnique = true;
      } else {
        shortCode = generateShortCode();
        attempts++;
      }
    }

    // Create new URL data object
    const newUrl = {
      originalUrl,
      shortCode,
      clicks: 0,
      createdAt: new Date().toISOString()
    };

    // Save to JSON storage
    storage.saveUrl(newUrl);

    // Return the created URL
    res.status(201).json({
      success: true,
      data: newUrl
    });

  } catch (error) {
    // Handle any server errors
    console.error('Error creating short URL:', error);
    res.status(500).json({
      success: false,
      error: 'Server error. Please try again later.'
    });
  }
};

/**
 * getUrlByShortCode
 * Controller function to get URL information by short code
 * GET /api/url/:shortCode
 */
const getUrlByShortCode = async (req, res) => {
  try {
    const { shortCode } = req.params;

    // Find the URL in storage
    const url = storage.findByShortCode(shortCode);

    if (!url) {
      return res.status(404).json({
        success: false,
        error: 'Short URL not found'
      });
    }

    res.status(200).json({
      success: true,
      data: url
    });

  } catch (error) {
    console.error('Error fetching URL:', error);
    res.status(500).json({
      success: false,
      error: 'Server error. Please try again later.'
    });
  }
};

/**
 * redirectToOriginalUrl
 * Controller function to redirect to the original URL
 * GET /:shortCode
 */
const redirectToOriginalUrl = async (req, res) => {
  try {
    const { shortCode } = req.params;

    // Find the URL in storage
    const url = storage.findByShortCode(shortCode);

    if (!url) {
      return res.status(404).json({
        success: false,
        error: 'Short URL not found'
      });
    }

    // Increment the click counter
    storage.updateClicks(shortCode);

    // Redirect to the original URL
    res.redirect(url.originalUrl);

  } catch (error) {
    console.error('Error redirecting URL:', error);
    res.status(500).json({
      success: false,
      error: 'Server error. Please try again later.'
    });
  }
};

// Export all controller functions
module.exports = {
  shortenUrl,
  getUrlByShortCode,
  redirectToOriginalUrl
};
