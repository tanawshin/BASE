/**
 * BASE Events - JWT Authentication Middleware
 * Secure token-based authentication
 */

import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { query } from '../db.js';

const JWT_SECRET = process.env.JWT_SECRET || 'CHANGE_THIS_IN_PRODUCTION';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d';
const SALT_ROUNDS = 12;

/**
 * Hash password securely using bcrypt
 */
export const hashPassword = async (password) => {
    return await bcrypt.hash(password, SALT_ROUNDS);
};

/**
 * Compare password with hash
 */
export const comparePassword = async (password, hash) => {
    return await bcrypt.compare(password, hash);
};

/**
 * Generate JWT token
 */
export const generateToken = (payload) => {
    return jwt.sign(payload, JWT_SECRET, {
        expiresIn: JWT_EXPIRES_IN,
        algorithm: 'HS256',
        issuer: 'base-events',
        audience: 'base-events-users'
    });
};

/**
 * Verify JWT token
 */
export const verifyToken = (token) => {
    try {
        return jwt.verify(token, JWT_SECRET, {
            algorithms: ['HS256'],
            issuer: 'base-events',
            audience: 'base-events-users'
        });
    } catch (error) {
        return null;
    }
};

/**
 * Authentication middleware
 * Extracts and verifies JWT from Authorization header
 */
export const authenticate = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({
                success: false,
                error: 'Authentication required'
            });
        }

        const token = authHeader.split(' ')[1];
        const decoded = verifyToken(token);

        if (!decoded) {
            return res.status(401).json({
                success: false,
                error: 'Invalid or expired token'
            });
        }

        // Verify user still exists and is not locked
        const result = await query(
            'SELECT id, uuid, email, role, locked_until FROM users WHERE uuid = $1',
            [decoded.uuid]
        );

        if (result.rows.length === 0) {
            return res.status(401).json({
                success: false,
                error: 'User not found'
            });
        }

        const user = result.rows[0];

        // Check if account is locked
        if (user.locked_until && new Date(user.locked_until) > new Date()) {
            return res.status(403).json({
                success: false,
                error: 'Account is temporarily locked'
            });
        }

        // Attach user to request
        req.user = {
            id: user.id,
            uuid: user.uuid,
            email: user.email,
            role: user.role
        };

        next();
    } catch (error) {
        console.error('Authentication error:', error);
        return res.status(500).json({
            success: false,
            error: 'Authentication failed'
        });
    }
};

/**
 * Optional authentication - doesn't fail if no token
 */
export const optionalAuth = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (authHeader && authHeader.startsWith('Bearer ')) {
            const token = authHeader.split(' ')[1];
            const decoded = verifyToken(token);

            if (decoded) {
                const result = await query(
                    'SELECT id, uuid, email, role FROM users WHERE uuid = $1',
                    [decoded.uuid]
                );

                if (result.rows.length > 0) {
                    req.user = result.rows[0];
                }
            }
        }

        next();
    } catch (error) {
        // Silently continue without auth
        next();
    }
};

/**
 * Role-based authorization middleware
 */
export const authorize = (...roles) => {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({
                success: false,
                error: 'Authentication required'
            });
        }

        if (!roles.includes(req.user.role)) {
            return res.status(403).json({
                success: false,
                error: 'Insufficient permissions'
            });
        }

        next();
    };
};

/**
 * Track failed login attempts and lock accounts
 */
export const trackLoginAttempt = async (email, success) => {
    if (success) {
        // Reset on successful login
        await query(
            'UPDATE users SET login_attempts = 0, last_login = CURRENT_TIMESTAMP, locked_until = NULL WHERE email = $1',
            [email]
        );
    } else {
        // Increment failed attempts
        const result = await query(
            `UPDATE users 
       SET login_attempts = login_attempts + 1,
           locked_until = CASE 
             WHEN login_attempts >= 4 THEN CURRENT_TIMESTAMP + INTERVAL '15 minutes'
             ELSE NULL 
           END
       WHERE email = $1
       RETURNING login_attempts`,
            [email]
        );

        if (result.rows.length > 0 && result.rows[0].login_attempts >= 5) {
            return { locked: true, message: 'Account locked due to too many failed attempts' };
        }
    }

    return { locked: false };
};

export default {
    hashPassword,
    comparePassword,
    generateToken,
    verifyToken,
    authenticate,
    optionalAuth,
    authorize,
    trackLoginAttempt
};
