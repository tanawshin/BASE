/**
 * BASE Events - Database Configuration
 * Supports PostgreSQL (production) and SQLite (development)
 * with parameterized queries to prevent SQL injection
 */

import dotenv from 'dotenv';
import pg from 'pg';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Database configuration with security best practices
const dbConfig = {
    postgres: {
        host: process.env.DB_HOST || 'localhost',
        port: parseInt(process.env.DB_PORT) || 5432,
        database: process.env.DB_NAME || 'base_events',
        user: process.env.DB_USER || 'base_admin',
        password: process.env.DB_PASSWORD,
        // Connection pool settings for security and performance
        max: 20, // Maximum connections
        idleTimeoutMillis: 30000,
        connectionTimeoutMillis: 2000,
        // SSL configuration for production
        ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: true } : false
    }
};

let pool = null;

/**
 * Initialize database connection pool
 */
export const initDatabase = async () => {
    try {
        pool = new pg.Pool(dbConfig.postgres);

        // Test connection
        const client = await pool.connect();
        console.log('✅ Database connected successfully');
        client.release();

        return pool;
    } catch (error) {
        console.error('❌ Database connection failed:', error.message);
        throw error;
    }
};

/**
 * Execute a parameterized query (prevents SQL injection)
 * @param {string} text - SQL query with $1, $2, etc. placeholders
 * @param {Array} params - Parameters to safely inject
 */
export const query = async (text, params = []) => {
    if (!pool) {
        throw new Error('Database not initialized. Call initDatabase() first.');
    }

    const start = Date.now();
    try {
        const result = await pool.query(text, params);
        const duration = Date.now() - start;

        if (process.env.NODE_ENV === 'development') {
            console.log('📊 Query executed:', { text, duration: `${duration}ms`, rows: result.rowCount });
        }

        return result;
    } catch (error) {
        console.error('❌ Query error:', error.message);
        throw error;
    }
};

/**
 * Execute queries within a transaction
 * @param {Function} callback - Function receiving client for transaction
 */
export const transaction = async (callback) => {
    const client = await pool.connect();

    try {
        await client.query('BEGIN');
        const result = await callback(client);
        await client.query('COMMIT');
        return result;
    } catch (error) {
        await client.query('ROLLBACK');
        throw error;
    } finally {
        client.release();
    }
};

/**
 * Sanitize input for extra protection (defense in depth)
 * Note: Always use parameterized queries as primary defense
 */
export const sanitizeInput = (input) => {
    if (typeof input !== 'string') return input;
    return input
        .replace(/'/g, "''")
        .replace(/;/g, '')
        .replace(/--/g, '')
        .trim();
};

/**
 * Close database connection pool
 */
export const closeDatabase = async () => {
    if (pool) {
        await pool.end();
        console.log('🔒 Database connection closed');
    }
};

export default { initDatabase, query, transaction, sanitizeInput, closeDatabase };
