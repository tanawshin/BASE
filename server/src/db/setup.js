/**
 * BASE Events - Database Schema Setup
 * Creates tables with proper constraints and security measures
 */

import { query, initDatabase, closeDatabase } from './db.js';

const createTables = async () => {
    console.log('🔧 Setting up database schema...\n');

    // Users table with secure password storage
    await query(`
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      uuid UUID DEFAULT gen_random_uuid() UNIQUE NOT NULL,
      email VARCHAR(255) UNIQUE NOT NULL,
      password_hash VARCHAR(255) NOT NULL,
      first_name VARCHAR(100) NOT NULL,
      last_name VARCHAR(100) NOT NULL,
      phone VARCHAR(20),
      role VARCHAR(20) DEFAULT 'user' CHECK (role IN ('admin', 'user', 'organizer')),
      email_verified BOOLEAN DEFAULT FALSE,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      last_login TIMESTAMP,
      login_attempts INTEGER DEFAULT 0,
      locked_until TIMESTAMP
    )
  `);
    console.log('✅ Users table created');

    // Events table
    await query(`
    CREATE TABLE IF NOT EXISTS events (
      id SERIAL PRIMARY KEY,
      uuid UUID DEFAULT gen_random_uuid() UNIQUE NOT NULL,
      title VARCHAR(255) NOT NULL,
      slug VARCHAR(255) UNIQUE NOT NULL,
      description TEXT,
      event_type VARCHAR(50) CHECK (event_type IN ('business', 'social', 'networking', 'conference', 'workshop', 'other')),
      start_date TIMESTAMP NOT NULL,
      end_date TIMESTAMP NOT NULL,
      location VARCHAR(500),
      address TEXT,
      city VARCHAR(100),
      country VARCHAR(100),
      max_attendees INTEGER,
      current_attendees INTEGER DEFAULT 0,
      price DECIMAL(10, 2) DEFAULT 0.00,
      currency VARCHAR(3) DEFAULT 'USD',
      image_url VARCHAR(500),
      is_featured BOOLEAN DEFAULT FALSE,
      is_published BOOLEAN DEFAULT FALSE,
      organizer_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);
    console.log('✅ Events table created');

    // Event registrations
    await query(`
    CREATE TABLE IF NOT EXISTS event_registrations (
      id SERIAL PRIMARY KEY,
      event_id INTEGER REFERENCES events(id) ON DELETE CASCADE,
      user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
      status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'cancelled', 'attended')),
      registered_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      UNIQUE(event_id, user_id)
    )
  `);
    console.log('✅ Event registrations table created');

    // Contact form submissions
    await query(`
    CREATE TABLE IF NOT EXISTS contact_submissions (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL,
      phone VARCHAR(20),
      subject VARCHAR(255),
      message TEXT NOT NULL,
      ip_address INET,
      is_read BOOLEAN DEFAULT FALSE,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);
    console.log('✅ Contact submissions table created');

    // Newsletter subscriptions
    await query(`
    CREATE TABLE IF NOT EXISTS newsletter_subscribers (
      id SERIAL PRIMARY KEY,
      email VARCHAR(255) UNIQUE NOT NULL,
      name VARCHAR(255),
      is_active BOOLEAN DEFAULT TRUE,
      subscribed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      unsubscribed_at TIMESTAMP
    )
  `);
    console.log('✅ Newsletter subscribers table created');

    // Testimonials
    await query(`
    CREATE TABLE IF NOT EXISTS testimonials (
      id SERIAL PRIMARY KEY,
      author_name VARCHAR(255) NOT NULL,
      author_title VARCHAR(255),
      author_company VARCHAR(255),
      content TEXT NOT NULL,
      rating INTEGER CHECK (rating >= 1 AND rating <= 5),
      is_featured BOOLEAN DEFAULT FALSE,
      is_approved BOOLEAN DEFAULT FALSE,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);
    console.log('✅ Testimonials table created');

    // Services offered
    await query(`
    CREATE TABLE IF NOT EXISTS services (
      id SERIAL PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      slug VARCHAR(255) UNIQUE NOT NULL,
      description TEXT,
      icon VARCHAR(100),
      features TEXT[],
      price_from DECIMAL(10, 2),
      is_active BOOLEAN DEFAULT TRUE,
      display_order INTEGER DEFAULT 0,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);
    console.log('✅ Services table created');

    // Audit log for security
    await query(`
    CREATE TABLE IF NOT EXISTS audit_log (
      id SERIAL PRIMARY KEY,
      user_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
      action VARCHAR(100) NOT NULL,
      table_name VARCHAR(100),
      record_id INTEGER,
      old_values JSONB,
      new_values JSONB,
      ip_address INET,
      user_agent TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);
    console.log('✅ Audit log table created');

    // Create indexes for performance
    await query(`CREATE INDEX IF NOT EXISTS idx_events_start_date ON events(start_date)`);
    await query(`CREATE INDEX IF NOT EXISTS idx_events_slug ON events(slug)`);
    await query(`CREATE INDEX IF NOT EXISTS idx_users_email ON users(email)`);
    await query(`CREATE INDEX IF NOT EXISTS idx_audit_user ON audit_log(user_id)`);
    console.log('✅ Indexes created');

    console.log('\n🎉 Database schema setup complete!');
};

// Run setup
const setup = async () => {
    try {
        await initDatabase();
        await createTables();
    } catch (error) {
        console.error('❌ Setup failed:', error.message);
        process.exit(1);
    } finally {
        await closeDatabase();
    }
};

setup();
