/**
 * React Entry Point
 * This file renders the React application to the DOM
 */

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the App component to the root element
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
