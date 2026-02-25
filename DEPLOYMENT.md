# Deploy Your Panda URL Shortener - Step by Step Guide

---

## Part 0: Install Git (Required)

### For Windows:
1. **Download Git:** https://git-scm.com/download/win
2. Run the installer
3. **Important:** During installation, choose these options:
   - Use Git from Git Bash only
   - Checkout Windows-style, commit Unix-style line endings
4. After installation, restart your terminal/command prompt
5. Verify: Run `git --version` in command prompt

### Alternative - Install GitHub Desktop:
1. Go to https://desktop.github.com/
2. Download and install GitHub Desktop
3. Sign in with your GitHub account
4. You can push code using the app!

---

## Part 1: Push Code to GitHub

### Step 1: Create a GitHub Account
If you don't have one, go to [GitHub.com](https://github.com) and sign up for free.

### Step 2: Create a New Repository
1. Log in to GitHub
2. Click the **+** icon in the top right → **New repository**
3. Repository name: `url-shortener`
4. Make it **Public**
5. Click **Create repository** (don't add README yet)

### Step 3: Push Your Code
Open **Command Prompt** (not PowerShell) and run:

```
bash
cd "d:/Web DEVELOPMENT/url-shortener"

git init

git add .

git commit -m "Panda URL Shortener"

git remote add origin https://github.com/YOUR_USERNAME/url-shortener.git

git branch -M main

git push -u origin main
```

**Replace YOUR_USERNAME with your actual GitHub username!**

---

## Part 2: Deploy Backend on Render

### Step 1: Sign Up for Render
1. Go to [Render.com](https://render.com)
2. Click **Sign Up** → Sign up with **GitHub**
3. Authorize Render to access your GitHub

### Step 2: Deploy Backend Service
1. In Render dashboard, click **New +** → **Web Service**
2. Find and select your `url-shortener` repository
3. Configure these settings:
   - **Name**: `url-shortener-backend`
   - **Root Directory**: `server`
   - **Build Command**: `npm install`
   - **Start Command**: `node server.js`
4. Click **Create Web Service**
5. **Wait 2-3 minutes** for deployment

### Step 3: Get Your Backend URL
- Once deployed, you'll see a URL like:
- `https://url-shortener-backend.onrender.com`
- **Copy this URL** - you'll need it!

---

## Part 3: Deploy Frontend on Render

### Step 1: Deploy Static Site
1. In Render dashboard, click **New +** → **Static Site**
2. Select your `url-shortener` repository
3. Configure:
   - **Name**: `url-shortener-frontend`
   - **Root Directory**: `client`
   - **Build Command**: `npm run build`
   - **Publish Directory**: `build`

### Step 2: Add Environment Variable
1. Scroll down to the **Environment Variables** section
2. Click **Add Environment Variable**
3. Fill in:
   - Key: `REACT_APP_API_URL`
   - Value: `https://url-shortener-backend.onrender.com` (your backend URL from Part 2)
4. Click **Create Static Site**
5. **Wait 2-3 minutes** for deployment

---

## Part 4: Test Your Live URL Shortener!

### Get Your Frontend URL
- After frontend deploys, you'll get a URL like:
- `https://url-shortener-frontend.onrender.com`

### Open it in your browser and test:
1. Enter any long URL (e.g., `https://www.google.com/search?q=hello`)
2. Click **Shorten URL**
3. Watch the pandas squeeze your link!
4. Click the short link to test it works

---

## Quick Reference

| Step | Action |
|------|--------|
| 0 | Install Git from git-scm.com |
| 1 | Create GitHub repo & push code |
| 2 | Deploy backend on Render |
| 3 | Deploy frontend on Render |

---

**Need Help?** Let me know if you face any issues!
