/**
 * BASE Events - Security Middleware
 * Comprehensive security measures to protect the API
 */

import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { body, param, query as queryValidator, validationResult } from 'express-validator';

/**
 * Configure Helmet for HTTP security headers
 */
export const securityHeaders = helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
            fontSrc: ["'self'", "https://fonts.gstatic.com"],
            imgSrc: ["'self'", "data:", "https:"],
            scriptSrc: ["'self'"],
            connectSrc: ["'self'", process.env.API_URL || "http://localhost:5000"],
            frameSrc: ["'none'"],
            objectSrc: ["'none'"],
            upgradeInsecureRequests: process.env.NODE_ENV === 'production' ? [] : null
        }
    },
    crossOriginEmbedderPolicy: false,
    hsts: {
        maxAge: 31536000,
        includeSubDomains: true,
        preload: true
    }
});

/**
 * Rate limiting configurations
 */
export const generalRateLimiter = rateLimit({
    windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000, // 15 minutes
    max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 100,
    message: {
        error: 'Too many requests, please try again later.',
        retryAfter: 'Retry-After header indicates when you can try again.'
    },
    standardHeaders: true,
    legacyHeaders: false,
    keyGenerator: (req) => {
        return req.ip || req.headers['x-forwarded-for'] || 'unknown';
    }
});

// Stricter rate limit for authentication endpoints
export const authRateLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // 5 attempts per window
    message: {
        error: 'Too many login attempts. Please try again in 15 minutes.'
    },
    standardHeaders: true,
    legacyHeaders: false
});

// Rate limit for contact forms
export const contactRateLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hour
    max: 5, // 5 submissions per hour
    message: {
        error: 'Too many contact form submissions. Please try again later.'
    }
});

/**
 * Input validation middleware
 */
export const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            errors: errors.array().map(err => ({
                field: err.path,
                message: err.msg
            }))
        });
    }
    next();
};

/**
 * Validation rules for different endpoints
 */
export const validationRules = {
    register: [
        body('email')
            .isEmail()
            .normalizeEmail()
            .withMessage('Please provide a valid email address'),
        body('password')
            .isLength({ min: 8 })
            .withMessage('Password must be at least 8 characters')
            .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/)
            .withMessage('Password must contain uppercase, lowercase, number, and special character'),
        body('firstName')
            .trim()
            .isLength({ min: 2, max: 100 })
            .escape()
            .withMessage('First name must be 2-100 characters'),
        body('lastName')
            .trim()
            .isLength({ min: 2, max: 100 })
            .escape()
            .withMessage('Last name must be 2-100 characters'),
        body('phone')
            .optional()
            .isMobilePhone()
            .withMessage('Please provide a valid phone number')
    ],

    login: [
        body('email')
            .isEmail()
            .normalizeEmail()
            .withMessage('Please provide a valid email'),
        body('password')
            .notEmpty()
            .withMessage('Password is required')
    ],

    contact: [
        body('name')
            .trim()
            .isLength({ min: 2, max: 255 })
            .escape()
            .withMessage('Name must be 2-255 characters'),
        body('email')
            .isEmail()
            .normalizeEmail()
            .withMessage('Please provide a valid email'),
        body('subject')
            .optional()
            .trim()
            .isLength({ max: 255 })
            .escape()
            .withMessage('Subject must be less than 255 characters'),
        body('message')
            .trim()
            .isLength({ min: 10, max: 5000 })
            .escape()
            .withMessage('Message must be 10-5000 characters')
    ],

    newsletter: [
        body('email')
            .isEmail()
            .normalizeEmail()
            .withMessage('Please provide a valid email')
    ],

    event: [
        body('title')
            .trim()
            .isLength({ min: 3, max: 255 })
            .escape()
            .withMessage('Title must be 3-255 characters'),
        body('description')
            .optional()
            .trim()
            .isLength({ max: 10000 })
            .withMessage('Description must be less than 10000 characters'),
        body('startDate')
            .isISO8601()
            .withMessage('Please provide a valid start date'),
        body('endDate')
            .isISO8601()
            .withMessage('Please provide a valid end date')
            .custom((value, { req }) => {
                if (new Date(value) <= new Date(req.body.startDate)) {
                    throw new Error('End date must be after start date');
                }
                return true;
            }),
        body('eventType')
            .isIn(['business', 'social', 'networking', 'conference', 'workshop', 'other'])
            .withMessage('Invalid event type'),
        body('maxAttendees')
            .optional()
            .isInt({ min: 1 })
            .withMessage('Maximum attendees must be a positive number')
    ],

    uuid: [
        param('uuid')
            .isUUID()
            .withMessage('Invalid resource identifier')
    ]
};

/**
 * XSS Prevention - Clean user input
 */
export const xssClean = (req, res, next) => {
    const cleanObject = (obj) => {
        if (typeof obj === 'string') {
            return obj
                .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
                .replace(/javascript:/gi, '')
                .replace(/on\w+=/gi, '');
        }
        if (typeof obj === 'object' && obj !== null) {
            for (let key in obj) {
                obj[key] = cleanObject(obj[key]);
            }
        }
        return obj;
    };

    if (req.body) req.body = cleanObject(req.body);
    if (req.query) req.query = cleanObject(req.query);
    if (req.params) req.params = cleanObject(req.params);

    next();
};

/**
 * Request logging for audit trail
 */
export const requestLogger = (req, res, next) => {
    const start = Date.now();

    res.on('finish', () => {
        const duration = Date.now() - start;
        const log = {
            timestamp: new Date().toISOString(),
            method: req.method,
            path: req.path,
            status: res.statusCode,
            duration: `${duration}ms`,
            ip: req.ip || req.headers['x-forwarded-for'],
            userAgent: req.headers['user-agent']
        };

        if (process.env.NODE_ENV === 'development') {
            console.log(`📝 ${log.method} ${log.path} ${log.status} ${log.duration}`);
        }
    });

    next();
};

export default {
    securityHeaders,
    generalRateLimiter,
    authRateLimiter,
    contactRateLimiter,
    validate,
    validationRules,
    xssClean,
    requestLogger
};
