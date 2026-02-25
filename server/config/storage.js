/**
 * Simple JSON File Storage
 * This file handles storing URLs in a JSON file instead of MongoDB
 */

const fs = require('fs');
const path = require('path');

// Path to the JSON file where URLs will be stored
const DATA_FILE = path.join(__dirname, '..', 'data', 'urls.json');

// Ensure data directory exists
const ensureDataDir = () => {
  const dataDir = path.join(__dirname, '..', 'data');
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
};

/**
 * Read all URLs from the JSON file
 */
const readUrls = () => {
  ensureDataDir();
  try {
    if (fs.existsSync(DATA_FILE)) {
      const data = fs.readFileSync(DATA_FILE, 'utf8');
      return JSON.parse(data);
    }
  } catch (error) {
    console.error('Error reading URLs:', error);
  }
  return [];
};

/**
 * Write URLs to the JSON file
 */
const writeUrls = (urls) => {
  ensureDataDir();
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(urls, null, 2));
  } catch (error) {
    console.error('Error writing URLs:', error);
  }
};

/**
 * Find URL by short code
 */
const findByShortCode = (shortCode) => {
  const urls = readUrls();
  return urls.find(url => url.shortCode === shortCode);
};

/**
 * Find URL by original URL
 */
const findByOriginalUrl = (originalUrl) => {
  const urls = readUrls();
  return urls.find(url => url.originalUrl === originalUrl);
};

/**
 * Save a new URL
 */
const saveUrl = (urlData) => {
  const urls = readUrls();
  urls.push(urlData);
  writeUrls(urls);
  return urlData;
};

/**
 * Update URL clicks
 */
const updateClicks = (shortCode) => {
  const urls = readUrls();
  const urlIndex = urls.findIndex(url => url.shortCode === shortCode);
  if (urlIndex !== -1) {
    urls[urlIndex].clicks += 1;
    writeUrls(urls);
    return urls[urlIndex];
  }
  return null;
};

module.exports = {
  findByShortCode,
  findByOriginalUrl,
  saveUrl,
  updateClicks,
  readUrls
};
