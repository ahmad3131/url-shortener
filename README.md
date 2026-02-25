# URL Shortener - Full Stack Application

A URL shortener web application built with Node.js, Express, and vanilla HTML/CSS/JS.

## Features

- ✨ Shorten long URLs with unique short codes (8 characters)
- 📋 One-click copy to clipboard
- 🔄 Redirect to original URLs
- 📊 Click counter tracking
- 🎨 Modern, responsive UI
- ⚡ Fast and efficient

## Project Structure

```
url-shortener/
├── client/
│   └── index.html          # Frontend (HTML/CSS/JS)
├── server/
│   ├── config/
│   │   └── storage.js      # JSON file storage
│   ├── controllers/
│   │   └── urlController.js # API logic
│   ├── routes/
│   │   └── urlRoutes.js    # API routes
│   ├── data/
│   │   └── urls.json       # URL data storage
│   ├── server.js           # Server entry point
│   └── package.json
└── README.md
```

## Quick Start

### 1. Start the Backend Server

The server is already running. If you need to restart it:

```
bash
cd C:\Users\Ahmad Habibullah\Desktop\url-shortener\server
npm install
node server.js
```

You should see: `Server running on port 5000`

### 2. Open the Frontend

Simply open the HTML file in your browser:

```
C:\Users\Ahmad Habibullah\Desktop\url-shortener\client\index.html
```

Or double-click `index.html` in the client folder.

## How to Use

1. **Open the URL Shortener** in your browser (index.html)
2. **Paste a long URL** in the input field (e.g., https://www.google.com)
3. **Click "Shorten URL"** button
4. **Copy the shortened URL** by clicking the copy button
5. **Visit the shortened URL** to be redirected to the original

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/shorten` | Create a short URL |
| GET | `/api/url/:shortCode` | Get URL info by short code |
| GET | `/:shortCode` | Redirect to original URL |

### Example Usage

**Create Short URL:**
```
bash
curl -X POST http://localhost:5000/api/shorten ^
  -H "Content-Type: application/json" ^
  -d "{\"originalUrl\": \"https://www.google.com\"}"
```

**Response:**
```
json
{
  "success": true,
  "data": {
    "originalUrl": "https://www.google.com",
    "shortCode": "abc12345",
    "clicks": 0,
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
}
```

## Technology Stack

- **Frontend:** HTML5, CSS3, JavaScript (vanilla)
- **Backend:** Node.js, Express.js
- **Storage:** JSON file (no database required)

## Notes

- The server runs on port 5000 by default
- URLs are stored in `server/data/urls.json`
- Each short code is 8 characters long using nanoid
- Click count is tracked and increments on each redirect
