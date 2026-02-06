/**
 * BASE Events - API Routes
 * All API endpoints with secure handlers
 */

import express from 'express';
import { query, transaction } from '../db.js';
import { hashPassword, comparePassword, generateToken, authenticate, authorize, trackLoginAttempt } from '../middleware/auth.js';
import { validate, validationRules, authRateLimiter, contactRateLimiter } from '../middleware/security.js';
import { v4 as uuidv4 } from 'uuid';

const router = express.Router();

// =====================
// PUBLIC ROUTES
// =====================

/**
 * GET /api/health - Health check
 */
router.get('/health', (req, res) => {
    res.json({
        success: true,
        message: 'BASE Events API is running',
        timestamp: new Date().toISOString()
    });
});

/**
 * GET /api/config - Public configuration
 */
router.get('/config', (req, res) => {
    res.json({
        success: true,
        data: {
            domain: process.env.DOMAIN_URL || 'http://localhost:3000',
            social: {
                facebook: process.env.FACEBOOK_URL,
                instagram: process.env.INSTAGRAM_URL,
                linkedin: process.env.LINKEDIN_URL,
                twitter: process.env.TWITTER_URL
            },
            google: {
                businessUrl: process.env.GOOGLE_BUSINESS_URL
            }
        }
    });
});

// =====================
// AUTHENTICATION
// =====================

/**
 * POST /api/auth/register - User registration
 */
router.post('/auth/register', validationRules.register, validate, async (req, res) => {
    try {
        const { email, password, firstName, lastName, phone } = req.body;

        // Check if user exists
        const existingUser = await query('SELECT id FROM users WHERE email = $1', [email]);
        if (existingUser.rows.length > 0) {
            return res.status(400).json({
                success: false,
                error: 'Email already registered'
            });
        }

        // Hash password and create user
        const passwordHash = await hashPassword(password);
        const result = await query(
            `INSERT INTO users (email, password_hash, first_name, last_name, phone)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING uuid, email, first_name, last_name, role`,
            [email, passwordHash, firstName, lastName, phone || null]
        );

        const user = result.rows[0];
        const token = generateToken({ uuid: user.uuid, role: user.role });

        res.status(201).json({
            success: true,
            message: 'Registration successful',
            data: {
                user: {
                    uuid: user.uuid,
                    email: user.email,
                    firstName: user.first_name,
                    lastName: user.last_name,
                    role: user.role
                },
                token
            }
        });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({
            success: false,
            error: 'Registration failed'
        });
    }
});

/**
 * POST /api/auth/login - User login
 */
router.post('/auth/login', authRateLimiter, validationRules.login, validate, async (req, res) => {
    try {
        const { email, password } = req.body;

        // Get user
        const result = await query(
            'SELECT id, uuid, email, password_hash, first_name, last_name, role, locked_until FROM users WHERE email = $1',
            [email]
        );

        if (result.rows.length === 0) {
            return res.status(401).json({
                success: false,
                error: 'Invalid credentials'
            });
        }

        const user = result.rows[0];

        // Check if locked
        if (user.locked_until && new Date(user.locked_until) > new Date()) {
            return res.status(403).json({
                success: false,
                error: 'Account temporarily locked. Try again later.'
            });
        }

        // Verify password
        const isValid = await comparePassword(password, user.password_hash);

        if (!isValid) {
            await trackLoginAttempt(email, false);
            return res.status(401).json({
                success: false,
                error: 'Invalid credentials'
            });
        }

        // Successful login
        await trackLoginAttempt(email, true);
        const token = generateToken({ uuid: user.uuid, role: user.role });

        res.json({
            success: true,
            message: 'Login successful',
            data: {
                user: {
                    uuid: user.uuid,
                    email: user.email,
                    firstName: user.first_name,
                    lastName: user.last_name,
                    role: user.role
                },
                token
            }
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({
            success: false,
            error: 'Login failed'
        });
    }
});

/**
 * GET /api/auth/me - Get current user
 */
router.get('/auth/me', authenticate, async (req, res) => {
    try {
        const result = await query(
            'SELECT uuid, email, first_name, last_name, phone, role, created_at FROM users WHERE uuid = $1',
            [req.user.uuid]
        );

        res.json({
            success: true,
            data: {
                uuid: result.rows[0].uuid,
                email: result.rows[0].email,
                firstName: result.rows[0].first_name,
                lastName: result.rows[0].last_name,
                phone: result.rows[0].phone,
                role: result.rows[0].role,
                createdAt: result.rows[0].created_at
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Failed to get user data'
        });
    }
});

// =====================
// EVENTS
// =====================

/**
 * GET /api/events - Get all published events
 */
router.get('/events', async (req, res) => {
    try {
        const { type, city, page = 1, limit = 12 } = req.query;
        const offset = (page - 1) * limit;

        let queryText = `
      SELECT uuid, title, slug, description, event_type, start_date, end_date,
             location, city, country, max_attendees, current_attendees, price,
             currency, image_url, is_featured
      FROM events
      WHERE is_published = true AND end_date >= CURRENT_TIMESTAMP
    `;
        const params = [];
        let paramCount = 0;

        if (type) {
            paramCount++;
            queryText += ` AND event_type = $${paramCount}`;
            params.push(type);
        }

        if (city) {
            paramCount++;
            queryText += ` AND city ILIKE $${paramCount}`;
            params.push(`%${city}%`);
        }

        queryText += ` ORDER BY is_featured DESC, start_date ASC LIMIT $${paramCount + 1} OFFSET $${paramCount + 2}`;
        params.push(parseInt(limit), parseInt(offset));

        const result = await query(queryText, params);

        // Get total count
        let countQuery = 'SELECT COUNT(*) FROM events WHERE is_published = true AND end_date >= CURRENT_TIMESTAMP';
        if (type) countQuery += ` AND event_type = '${type}'`;
        if (city) countQuery += ` AND city ILIKE '%${city}%'`;
        const countResult = await query(countQuery);

        res.json({
            success: true,
            data: {
                events: result.rows,
                pagination: {
                    page: parseInt(page),
                    limit: parseInt(limit),
                    total: parseInt(countResult.rows[0].count),
                    pages: Math.ceil(countResult.rows[0].count / limit)
                }
            }
        });
    } catch (error) {
        console.error('Events fetch error:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to fetch events'
        });
    }
});

/**
 * GET /api/events/featured - Get featured events
 */
router.get('/events/featured', async (req, res) => {
    try {
        const result = await query(`
      SELECT uuid, title, slug, description, event_type, start_date, end_date,
             location, city, image_url, price, currency
      FROM events
      WHERE is_published = true AND is_featured = true AND end_date >= CURRENT_TIMESTAMP
      ORDER BY start_date ASC
      LIMIT 6
    `);

        res.json({
            success: true,
            data: result.rows
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Failed to fetch featured events'
        });
    }
});

/**
 * GET /api/events/:slug - Get single event
 */
router.get('/events/:slug', async (req, res) => {
    try {
        const result = await query(`
      SELECT e.*, u.first_name as organizer_first_name, u.last_name as organizer_last_name
      FROM events e
      LEFT JOIN users u ON e.organizer_id = u.id
      WHERE e.slug = $1 AND e.is_published = true
    `, [req.params.slug]);

        if (result.rows.length === 0) {
            return res.status(404).json({
                success: false,
                error: 'Event not found'
            });
        }

        res.json({
            success: true,
            data: result.rows[0]
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Failed to fetch event'
        });
    }
});

/**
 * POST /api/events/:uuid/register - Register for an event
 */
router.post('/events/:uuid/register', authenticate, validationRules.uuid, validate, async (req, res) => {
    try {
        const { uuid } = req.params;

        await transaction(async (client) => {
            // Get event
            const eventResult = await client.query(
                'SELECT id, max_attendees, current_attendees FROM events WHERE uuid = $1 FOR UPDATE',
                [uuid]
            );

            if (eventResult.rows.length === 0) {
                throw new Error('Event not found');
            }

            const event = eventResult.rows[0];

            // Check capacity
            if (event.max_attendees && event.current_attendees >= event.max_attendees) {
                throw new Error('Event is at full capacity');
            }

            // Check if already registered
            const existingReg = await client.query(
                'SELECT id FROM event_registrations WHERE event_id = $1 AND user_id = $2',
                [event.id, req.user.id]
            );

            if (existingReg.rows.length > 0) {
                throw new Error('Already registered for this event');
            }

            // Create registration
            await client.query(
                'INSERT INTO event_registrations (event_id, user_id, status) VALUES ($1, $2, $3)',
                [event.id, req.user.id, 'confirmed']
            );

            // Update attendee count
            await client.query(
                'UPDATE events SET current_attendees = current_attendees + 1 WHERE id = $1',
                [event.id]
            );
        });

        res.json({
            success: true,
            message: 'Successfully registered for event'
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message || 'Registration failed'
        });
    }
});

// =====================
// SERVICES
// =====================

/**
 * GET /api/services - Get all active services
 */
router.get('/services', async (req, res) => {
    try {
        const result = await query(`
      SELECT id, title, slug, description, icon, features, price_from
      FROM services
      WHERE is_active = true
      ORDER BY display_order ASC
    `);

        res.json({
            success: true,
            data: result.rows
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Failed to fetch services'
        });
    }
});

// =====================
// TESTIMONIALS
// =====================

/**
 * GET /api/testimonials - Get approved testimonials
 */
router.get('/testimonials', async (req, res) => {
    try {
        const result = await query(`
      SELECT id, author_name, author_title, author_company, content, rating
      FROM testimonials
      WHERE is_approved = true
      ORDER BY is_featured DESC, created_at DESC
      LIMIT 10
    `);

        res.json({
            success: true,
            data: result.rows
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Failed to fetch testimonials'
        });
    }
});

// =====================
// CONTACT
// =====================

/**
 * POST /api/contact - Submit contact form
 */
router.post('/contact', contactRateLimiter, validationRules.contact, validate, async (req, res) => {
    try {
        const { name, email, phone, subject, message } = req.body;
        const ipAddress = req.ip || req.headers['x-forwarded-for'];

        await query(
            `INSERT INTO contact_submissions (name, email, phone, subject, message, ip_address)
       VALUES ($1, $2, $3, $4, $5, $6)`,
            [name, email, phone || null, subject || null, message, ipAddress]
        );

        res.json({
            success: true,
            message: 'Thank you for your message. We will get back to you soon!'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Failed to submit message'
        });
    }
});

// =====================
// NEWSLETTER
// =====================

/**
 * POST /api/newsletter/subscribe - Subscribe to newsletter
 */
router.post('/newsletter/subscribe', validationRules.newsletter, validate, async (req, res) => {
    try {
        const { email, name } = req.body;

        // Upsert subscription
        await query(
            `INSERT INTO newsletter_subscribers (email, name)
       VALUES ($1, $2)
       ON CONFLICT (email) 
       DO UPDATE SET is_active = true, name = COALESCE($2, newsletter_subscribers.name)`,
            [email, name || null]
        );

        res.json({
            success: true,
            message: 'Successfully subscribed to newsletter!'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Failed to subscribe'
        });
    }
});

// =====================
// ADMIN ROUTES
// =====================

/**
 * GET /api/admin/dashboard - Admin dashboard stats
 */
router.get('/admin/dashboard', authenticate, authorize('admin'), async (req, res) => {
    try {
        const [users, events, registrations, contacts] = await Promise.all([
            query('SELECT COUNT(*) FROM users'),
            query('SELECT COUNT(*) FROM events WHERE is_published = true'),
            query('SELECT COUNT(*) FROM event_registrations WHERE status = $1', ['confirmed']),
            query('SELECT COUNT(*) FROM contact_submissions WHERE is_read = false')
        ]);

        res.json({
            success: true,
            data: {
                totalUsers: parseInt(users.rows[0].count),
                activeEvents: parseInt(events.rows[0].count),
                totalRegistrations: parseInt(registrations.rows[0].count),
                unreadContacts: parseInt(contacts.rows[0].count)
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Failed to fetch dashboard data'
        });
    }
});

export default router;
