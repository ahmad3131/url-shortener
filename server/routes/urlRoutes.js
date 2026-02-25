/**
 * URL Routes
 * This file defines all the API routes for URL operations
 */

const express = require('express');
const router = express.Router();

// Import the controller functions
const {
  shortenUrl,
  getUrlByShortCode,
  redirectToOriginalUrl
} = require('../controllers/urlController');

/**
 * Route: POST /api/shorten
 * Description: Create a new shortened URL
 * Body: { originalUrl: string }
 */
router.post('/shorten', shortenUrl);

/**
 * Route: GET /api/url/:shortCode
 * Description: Get URL information by short code
 * Params: shortCode (string)
 */
router.get('/url/:shortCode', getUrlByShortCode);

/**
 * Route: GET /:shortCode
 * Description: Redirect to the original URL
 * Params: shortCode (string)
 */
router.get('/:shortCode', redirectToOriginalUrl);

// Export the router
module.exports = router;
