/**
 * Chotto URL - Playful URL Shortener
 * Cute cats stretch your links! 🐱
 */

import React, { useState, useRef } from 'react';
import axios from 'axios';
import './index.css';

// Get API URL from environment variable or use localhost for development
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

function App() {
  // State variables
  const [url, setUrl] = useState('');
  const [shortUrl, setShortUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);
  const [isStretching, setIsStretching] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  
  const inputRef = useRef(null);

  // Handle URL input change
  const handleUrlChange = (e) => {
    setUrl(e.target.value);
    setError('');
    setShowResult(false);
    setShortUrl(null);
  };

  // Handle input focus
  const handleFocus = () => {
    setIsFocused(true);
  };

  // Handle input blur
  const handleBlur = () => {
    setIsFocused(false);
  };

  // Validate URL format
  const isValidUrl = (string) => {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  };

  // Handle form submission with cat stretching animation
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!url.trim()) {
      setError('Please enter a URL to shorten');
      return;
    }

    if (!isValidUrl(url)) {
      setError('Please enter a valid URL (include http:// or https://)');
      return;
    }

    // Start stretching animation
    setIsStretching(true);
    setShowResult(false);
    setShortUrl(null);
    setLoading(true);
    setError('');

    // Wait a bit for animation
    await new Promise(resolve => setTimeout(resolve, 500));

    try {
      const response = await axios.post(`${API_URL}/api/shorten`, {
        originalUrl: url
      });

      if (response.data.success) {
        // More animation time for effect
        await new Promise(resolve => setTimeout(resolve, 800));
        setShortUrl(response.data.data);
        setShowResult(true);
      }
    } catch (err) {
      if (err.response) {
        setError(err.response.data.error || 'Failed to shorten URL');
      } else if (err.request) {
        setError('Server is not responding. Please check if the backend is running.');
      } else {
        setError('An error occurred. Please try again.');
      }
    } finally {
      setLoading(false);
      setIsStretching(false);
    }
  };

  // Copy short URL to clipboard
  const copyToClipboard = async () => {
    if (!shortUrl) return;

    try {
      const fullShortUrl = `${API_URL}/${shortUrl.shortCode}`;
      await navigator.clipboard.writeText(fullShortUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      const textArea = document.createElement('textarea');
      textArea.value = `${API_URL}/${shortUrl.shortCode}`;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Truncate URL
  const truncateUrl = (str, length = 35) => {
    if (str.length <= length) return str;
    return str.substring(0, length) + '...';
  };

  // Cat Component
  const Cat = ({ side, isStretching }) => (
    <div className={`cat ${side} ${isStretching ? 'stretching' : ''}`}>
      {/* Ears */}
      <div className="cat-ear left"></div>
      <div className="cat-ear right"></div>
      
      {/* Body */}
      <div className="cat-body">
        {/* Face */}
        <div className="cat-face">
          {/* Eyes */}
          <div className="cat-eye left"></div>
          <div className="cat-eye right"></div>
          
          {/* Nose */}
          <div className="cat-nose"></div>
          
          {/* Mouth */}
          <div className="cat-mouth"></div>
        </div>
        
        {/* Whiskers */}
        <div className="cat-whisker left-1"></div>
        <div className="cat-whisker left-2"></div>
        <div className="cat-whisker right-1"></div>
        <div className="cat-whisker right-2"></div>
        
        {/* Paws */}
        <div className="cat-paw left"></div>
        <div className="cat-paw right"></div>
      </div>
      
      {/* Tail */}
      <div className="cat-tail"></div>
    </div>
  );

  return (
    <div className="app-container">
      {/* Background Effects */}
      <div className="background-layer">
        {/* Doodles */}
        <div className="doodle doodle-1 doodle-circuit"></div>
        <div className="doodle doodle-2 doodle-sparkle">✨</div>
        <div className="doodle doodle-3 doodle-star">★</div>
        <div className="doodle doodle-4 doodle-cloud"></div>
        <div className="doodle doodle-5 doodle-cable"></div>
        <div className="doodle doodle-6 doodle-sparkle">✨</div>
        
        {/* Tech Icons */}
        <div className="doodle-icon doodle-icon-1">⚡</div>
        <div className="doodle-icon doodle-icon-2">🔗</div>
        <div className="doodle-icon doodle-icon-3">🚀</div>
      </div>

      {/* Hero Section */}
      <section className="hero">
        {/* Main Card */}
        <div className="main-card">
          {/* Cats Container */}
          <div className="cats-container">
            <Cat side="left" isStretching={isStretching} />
            <Cat side="right" isStretching={isStretching} />
          </div>

          {/* Header */}
          <div className="hero-header">
            <h1 className="hero-title">Chotto URL</h1>
            <p className="hero-subtitle">Shorten your links in style! ✨</p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="error-message">
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit}>
            <div className="input-wrapper">
              <div className={`url-input-container ${isFocused ? 'input-focused' : ''} ${isStretching ? 'stretching' : ''}`}>
                <input
                  ref={inputRef}
                  type="text"
                  className="url-input"
                  value={url}
                  onChange={handleUrlChange}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  placeholder="Paste your long URL here..."
                  disabled={loading}
                />
                <button 
                  type="submit" 
                  className={`shorten-btn ${loading ? 'loading' : ''}`}
                  disabled={loading || !url.trim()}
                >
                  {loading ? (
                    <>
                      <span className="btn-spinner"></span>
                      Shortening...
                    </>
                  ) : (
                    'Shorten URL'
                  )}
                </button>
              </div>
            </div>
          </form>

          {/* Result */}
          {shortUrl && showResult && (
            <div className="result-section">
              <div className="result-label">
                Your Short Link is Ready!
              </div>
              <div className="result-url-container">
                <a 
                  className="result-url"
                  href={`${API_URL}/${shortUrl.shortCode}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {API_URL}/{shortUrl.shortCode}
                </a>
                <button 
                  className={`copy-btn ${copied ? 'copied' : ''}`}
                  onClick={copyToClipboard}
                >
                  {copied ? 'Copied!' : 'Copy'}
                </button>
              </div>
              
              {/* Stats */}
              <div className="result-stats">
                <div className="result-stat">
                  <span>Original:</span> {truncateUrl(shortUrl.originalUrl, 25)}
                </div>
                <div className="result-stat">
                  <span>Clicks:</span> {shortUrl.clicks}
                </div>
                <div className="result-stat">
                  <span>Created:</span> {formatDate(shortUrl.createdAt)}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Footer - Right corner */}
      <footer className="footer">
        <p className="footer-text">
          © {new Date().getFullYear()} All rights reserved by Ahmad Habibullah
        </p>
      </footer>
    </div>
  );
}

export default App;
