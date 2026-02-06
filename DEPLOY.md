# BASE Website Deployment Guide

This folder contains the full source code for the BASE Events website, ready for deployment at **https://cssentialserver.com/**.

## 📂 Project Structure

- **`/client`**: The React frontend application (Vite).
- **`/server`**: The Node.js Express backend API.
- **`/public`**: The production build output folder (Frontend is built here).

## 📍 Server Location

**Root Path:** `/var/www/html/projects/`

The project folder should be placed inside this directory.

## 🚀 Prerequisites

- **Node.js**: v18 or higher
- **npm**: v9 or higher
- **PostgreSQL**: (Recommended for production)

## 🛠️ Installation & Setup

1.  **Environment Setup**
    Navigate to your project directory on the server:
    ```bash
    cd /var/www/html/projects/base-events
    ```
    *(Note: Adjust folder name `base-events` if you name it differently)*

2.  **Install Dependencies**
    Run this command in the root folder of the project to install dependencies for both client and server:
    ```bash
    npm run install:all
    ```

3.  **Environment Configuration**
    
    *Server Config:*
    Go to `/server` and create a `.env` file from the example.
    ```bash
    cd server
    cp .env.example .env
    ```
    
    **Vital `.env` Settings:**
    - `NODE_ENV=production`
    - `PORT=5000` (or your specific port)
    - `DOMAIN_URL=https://cssentialserver.com`
    - `CORS_ORIGIN=https://cssentialserver.com`

4.  **Build the Frontend**
    This command compiles the React code and places the optimized static files into the `/public` folder, where the backend serves them perfectly.
    ```bash
    npm run build
    ```

## 🌍 Running in Production

To start the production server:

```bash
npm start
```

**What this does:**
1.  Starts the API server (default port 5000).
2.  Serves the frontend from the `/public` directory.
3.  Handles URL routing so `https://cssentialserver.com/about` works correctly.

## 🔒 Security & Best Practices

- **SSL/TLS**: Ensure SSL is active for `https://cssentialserver.com`.
- **Database**: Configure a secure PostgreSQL database and update `.env`.
- **Process Management**: Use `pm2` to keep the site running:
  ```bash
  pm2 start src/index.js --name "base-events"
  ```

## 🐛 Troubleshooting

- **Paths**: The app handles API requests using relative paths (`/api/...`), so it will work automatically on any domain without modifying the frontend code.
- **Hard Refresh**: If specific styles don't look right immediately, try a hard refresh to clear browser cache.

---
**Ready for Handover!**
Zip this entire folder and unzip it at `/var/www/html/projects/` on the server.
