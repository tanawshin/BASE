# BASE - Domain Configuration

## Domain Information

**Domain Name**: `[YOUR_DOMAIN_HERE]`  
**Example**: `www.base-events.com`

---

## Configuration Steps

### 1. Update Environment Variables

After purchasing your domain, update the following files:

#### Backend `.env`
```env
DOMAIN_URL=https://your-domain.com
CORS_ORIGIN=https://your-domain.com
```

#### Frontend `.env`
```env
VITE_API_URL=https://api.your-domain.com
VITE_DOMAIN_URL=https://your-domain.com
```

---

### 2. DNS Configuration

Configure these DNS records with your domain registrar:

| Type  | Host    | Value                      | TTL  |
|-------|---------|----------------------------|------|
| A     | @       | [SERVER_IP]                | 3600 |
| A     | www     | [SERVER_IP]                | 3600 |
| A     | api     | [SERVER_IP]                | 3600 |
| CNAME | www     | your-domain.com            | 3600 |

---

### 3. SSL Certificate

Install SSL certificate using Let's Encrypt:
```bash
sudo certbot --nginx -d your-domain.com -d www.your-domain.com -d api.your-domain.com
```

---

## Social Media Links

Update these in your configuration:

- **Facebook**: `https://facebook.com/BASE-Events`
- **Instagram**: `https://instagram.com/base_events`
- **LinkedIn**: `https://linkedin.com/company/base-events`
- **Twitter/X**: `https://twitter.com/base_events`

---

## Google Business Profile

1. Go to [Google Business Profile](https://business.google.com/)
2. Claim or create your business listing
3. Add your domain URL
4. Complete all business information
5. Verify ownership

---

## SEO Checklist

- [ ] Domain registered and configured
- [ ] SSL certificate installed
- [ ] sitemap.xml generated and submitted to Google
- [ ] robots.txt configured
- [ ] Google Search Console verified
- [ ] Google Analytics connected
- [ ] Social meta tags updated with domain
