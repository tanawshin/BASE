/**
 * BASE Events - Main Server Entry Point
 * Secure Express server with all middleware configured
 */

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Load environment variables
dotenv.config();

// Import middleware
import {
    securityHeaders,
    generalRateLimiter,
    xssClean,
    requestLogger
} from './middleware/security.js';

// Import routes
import apiRoutes from './routes/api.js';

// Import database
import { initDatabase } from './db.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Trust proxy (for rate limiting behind reverse proxy)
app.set('trust proxy', 1);

// =====================
// SECURITY MIDDLEWARE
// =====================

// Helmet for security headers
app.use(securityHeaders);

// CORS configuration
const corsOptions = {
    origin: (origin, callback) => {
        const allowedOrigins = [
            process.env.CORS_ORIGIN || 'http://localhost:3000',
            'http://localhost:5173', // Vite dev server
            process.env.DOMAIN_URL
        ].filter(Boolean);

        // Allow requests with no origin (mobile apps, curl, etc.)
        if (!origin) return callback(null, true);

        if (allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
    exposedHeaders: ['X-RateLimit-Limit', 'X-RateLimit-Remaining'],
    maxAge: 86400 // 24 hours
};
app.use(cors(corsOptions));

// Rate limiting
app.use(generalRateLimiter);

// Request logging
app.use(requestLogger);

// Body parsing with size limits
app.use(express.json({ limit: '10kb' })); // Limit body size
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

// XSS protection
app.use(xssClean);

// =====================
// STATIC FILES
// =====================

// Serve static files from public directory
app.use(express.static(path.join(__dirname, '../../public')));

// =====================
// API ROUTES
// =====================

app.use('/api', apiRoutes);

// =====================
// ERROR HANDLING
// =====================

// 404 handler for API routes
app.use('/api/*', (req, res) => {
    res.status(404).json({
        success: false,
        error: 'Endpoint not found'
    });
});

// Serve React app for all other routes (SPA support)
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/index.html'));
});

// Global error handler
app.use((err, req, res, next) => {
    console.error('❌ Error:', err.message);

    // Don't leak error details in production
    const message = process.env.NODE_ENV === 'production'
        ? 'An unexpected error occurred'
        : err.message;

    res.status(err.status || 500).json({
        success: false,
        error: message
    });
});

// =====================
// SERVER STARTUP
// =====================

const startServer = async () => {
    try {
        // Initialize database connection
        // Note: Database will fail to connect until PostgreSQL is configured
        // For development without DB, comment out the next line
        // await initDatabase();

        app.listen(PORT, () => {
            console.log(`
╔════════════════════════════════════════════════════════════╗
║                                                            ║
║   🎉  BASE Events API Server                              ║
║                                                            ║
║   📍  Running on: http://localhost:${PORT}                   ║
║   🔒  Environment: ${process.env.NODE_ENV || 'development'}                          ║
║                                                            ║
║   Endpoints:                                               ║
║   • GET  /api/health     - Health check                    ║
║   • GET  /api/config     - Public configuration            ║
║   • POST /api/auth/*     - Authentication                  ║
║   • GET  /api/events     - List events                     ║
║   • POST /api/contact    - Contact form                    ║
║   • POST /api/newsletter - Newsletter signup               ║
║                                                            ║
╚════════════════════════════════════════════════════════════╝
      `);
        });
    } catch (error) {
        console.error('❌ Failed to start server:', error.message);
        process.exit(1);
    }
};

startServer();

// Graceful shutdown
process.on('SIGTERM', () => {
    console.log('🛑 SIGTERM received, shutting down gracefully');
    process.exit(0);
});

process.on('SIGINT', () => {
    console.log('🛑 SIGINT received, shutting down gracefully');
    process.exit(0);
});

export default app;
