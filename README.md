# BASE - Business And Social Events

<p align="center">
  <img src="public/assets/logo.png" alt="BASE Events Logo" width="300">
</p>

<p align="center">
  <strong>Premium Event Management Platform</strong><br>
  Creating unforgettable business and social experiences
</p>

---

## 🌟 Overview

BASE is a full-stack web application for a premium event management company. Built with modern technologies and best practices for security, SEO, and user experience.

## 🛠️ Tech Stack

- **Frontend**: React 18 + Vite
- **Backend**: Node.js + Express
- **Database**: PostgreSQL (with SQL security best practices)
- **Styling**: Custom CSS with design tokens
- **SEO**: React Helmet Async, sitemap.xml, robots.txt

## 📁 Project Structure

```
BASE/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Page components
│   │   ├── App.jsx         # Main app component
│   │   ├── main.jsx        # Entry point
│   │   └── index.css       # Design system & styles
│   ├── index.html          # HTML template with SEO meta tags
│   ├── package.json
│   └── vite.config.js
├── server/                 # Node.js backend
│   ├── src/
│   │   ├── db.js           # Database connection (PostgreSQL)
│   │   ├── db/
│   │   │   └── setup.js    # Database schema
│   │   ├── middleware/
│   │   │   ├── auth.js     # JWT authentication
│   │   │   └── security.js # Security middleware
│   │   ├── routes/
│   │   │   └── api.js      # API endpoints
│   │   └── index.js        # Server entry point
│   ├── .env                # Environment variables
│   ├── .env.example        # Environment template
│   └── package.json
├── public/                 # Static assets
│   ├── assets/
│   │   └── logo.png
│   ├── sitemap.xml         # SEO sitemap
│   └── robots.txt          # Search engine config
├── DOMAIN_CONFIG.md        # Domain setup guide
├── package.json            # Root scripts
└── README.md
```

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm or yarn
- PostgreSQL (for production)

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd BASE

# Install all dependencies
npm run install:all

# Or manually:
npm install
cd client && npm install
cd ../server && npm install
```

### Development

```bash
# Run both frontend and backend
npm run dev

# Or run separately:
npm run dev:client    # Frontend on http://localhost:3000
npm run dev:server    # Backend on http://localhost:5000
```

### Production Build

```bash
# Build frontend
npm run build

# Start production server
npm start
```

## 🔒 Security Features

This application implements multiple security measures:

### Database Security
- **Parameterized Queries**: All SQL queries use parameters to prevent SQL injection
- **Connection Pooling**: Secure connection management with limits
- **SSL in Production**: Encrypted database connections

### API Security
- **Helmet**: HTTP security headers
- **Rate Limiting**: Protection against brute force attacks
- **Input Validation**: express-validator for all inputs
- **XSS Prevention**: Automatic input sanitization
- **CORS**: Properly configured cross-origin policies
- **JWT Authentication**: Secure token-based auth with expiration
- **Password Hashing**: bcrypt with 12 salt rounds
- **Account Lockout**: Auto-lock after failed login attempts

### Audit Trail
- Request logging
- Database audit log table
- Failed login tracking

## 🌐 SEO Implementation

- Server-side meta tags
- Open Graph tags for social sharing
- Twitter Card meta tags
- Structured sitemap.xml
- Proper robots.txt configuration
- Semantic HTML structure
- Page-specific titles and descriptions

## 📱 Social Media Integration

Configure social links in `server/.env`:

```env
FACEBOOK_URL=https://facebook.com/your-page
INSTAGRAM_URL=https://instagram.com/your-handle
LINKEDIN_URL=https://linkedin.com/company/your-company
TWITTER_URL=https://twitter.com/your-handle
```

## 🔧 Domain Configuration

After purchasing your domain:

1. Update `DOMAIN_CONFIG.md` with your domain
2. Configure DNS records
3. Update environment variables
4. Install SSL certificate
5. Update `sitemap.xml` and `robots.txt`
6. Submit sitemap to Google Search Console

See `DOMAIN_CONFIG.md` for detailed instructions.

## 📊 Google Business Profile

1. Create/claim your Google Business Profile
2. Add your website URL
3. Complete business information
4. Verify ownership
5. Update `GOOGLE_BUSINESS_URL` in `.env`

## 🎨 Color Palette

The design uses colors from the BASE logo:

| Color | Hex | Usage |
|-------|-----|-------|
| Forest Green | `#1B4D2E` | Primary brand color |
| Forest Green Dark | `#0F2E1A` | Backgrounds, accents |
| Golden Bronze | `#9E8B3E` | Accent, highlights |
| Off White | `#FEFDFB` | Light backgrounds |
| Cream | `#F8F6F0` | Section backgrounds |

## 📝 API Endpoints

### Public Endpoints
- `GET /api/health` - Health check
- `GET /api/config` - Public configuration
- `GET /api/events` - List events
- `GET /api/events/featured` - Featured events
- `GET /api/events/:slug` - Single event
- `GET /api/services` - List services
- `GET /api/testimonials` - Testimonials
- `POST /api/contact` - Contact form
- `POST /api/newsletter/subscribe` - Newsletter signup

### Authentication Endpoints
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user

### Protected Endpoints
- `POST /api/events/:uuid/register` - Event registration
- `GET /api/admin/dashboard` - Admin dashboard (admin only)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

MIT License - feel free to use this project for your own purposes.

---

<p align="center">
  Made with ❤️ by BASE Events
</p>
# BASE
