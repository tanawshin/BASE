import { Link } from 'react-router-dom'
import { useState } from 'react'
import { FacebookIcon, InstagramIcon, LinkedInIcon, TwitterIcon } from './SocialIcons'

const Footer = () => {
    const [email, setEmail] = useState('')
    const [subscribeStatus, setSubscribeStatus] = useState('')

    const handleNewsletterSubmit = async (e) => {
        e.preventDefault()

        try {
            const response = await fetch('/api/newsletter/subscribe', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email })
            })

            const data = await response.json()

            if (data.success) {
                setSubscribeStatus('success')
                setEmail('')
                setTimeout(() => setSubscribeStatus(''), 3000)
            } else {
                setSubscribeStatus('error')
            }
        } catch (error) {
            setSubscribeStatus('error')
        }
    }

    const currentYear = new Date().getFullYear()

    // Social media links - update these with your actual URLs
    const socialLinks = [
        {
            name: 'Facebook',
            url: '#', // Coming soon
            icon: FacebookIcon,
            disabled: true
        },
        {
            name: 'Instagram',
            url: 'https://www.instagram.com/baseeventsuk?igsh=MWppbHA4NWluOHp0cQ==',
            icon: InstagramIcon,
            disabled: false
        },
        {
            name: 'LinkedIn',
            url: '#', // Coming soon
            icon: LinkedInIcon,
            disabled: true
        },
        {
            name: 'Twitter',
            url: '#', // Coming soon
            icon: TwitterIcon,
            disabled: true
        },
    ]

    return (
        <footer className="footer">
            <div className="container">
                {/* Newsletter Section */}
                <section className="newsletter-section" style={{
                    marginBottom: 'var(--space-16)',
                    borderRadius: 0
                }}>
                    <div className="ornament">
                        <span className="ornament-icon">✦</span>
                    </div>
                    <h3 className="heading-3 newsletter-title">Stay Updated</h3>
                    <p className="newsletter-subtitle">
                        Subscribe to receive exclusive invitations to our premier events
                    </p>
                    <form className="newsletter-form" onSubmit={handleNewsletterSubmit}>
                        <input
                            type="email"
                            className="form-input"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <button type="submit" className="btn btn-primary">
                            Subscribe
                        </button>
                    </form>
                    {subscribeStatus === 'success' && (
                        <p style={{ color: 'var(--color-golden-light)', marginTop: 'var(--space-4)' }}>
                            ✓ Successfully subscribed!
                        </p>
                    )}
                    {subscribeStatus === 'error' && (
                        <p style={{ color: '#FF6B6B', marginTop: 'var(--space-4)' }}>
                            Something went wrong. Please try again.
                        </p>
                    )}
                </section>

                {/* Footer Grid */}
                <div className="footer-grid">
                    {/* Brand Column */}
                    <div className="footer-brand">
                        <img
                            src="/assets/logo.png"
                            alt="BASE Events"
                            style={{
                                height: '70px',
                                marginBottom: 'var(--space-4)',
                                filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3))'
                            }}
                        />
                        <p className="footer-brand-text">
                            Where elegance meets excellence. Creating unforgettable business
                            and social events that connect people and inspire lasting memories.
                        </p>
                        <div className="footer-social" style={{ marginTop: 'var(--space-8)' }}>
                            {socialLinks.map((social) => {
                                const IconComponent = social.icon
                                return (
                                    <a
                                        key={social.name}
                                        href={social.url}
                                        target={social.disabled ? undefined : "_blank"}
                                        rel={social.disabled ? undefined : "noopener noreferrer"}
                                        className="footer-social-link"
                                        aria-label={`Follow us on ${social.name}`}
                                        title={social.name}
                                        onClick={(e) => {
                                            if (social.disabled) {
                                                e.preventDefault();
                                            }
                                        }}
                                        style={{
                                            opacity: social.disabled ? 0.7 : 1,
                                            cursor: social.disabled ? 'default' : 'pointer'
                                        }}
                                    >
                                        <IconComponent />
                                    </a>
                                )
                            })}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="footer-heading">Quick Links</h4>
                        <Link to="/" className="footer-link">Home</Link>
                        <Link to="/about" className="footer-link">About Us</Link>
                        <Link to="/services" className="footer-link">Services</Link>
                        <Link to="/events" className="footer-link">Events</Link>
                        <Link to="/contact" className="footer-link">Contact</Link>
                    </div>

                    {/* Services */}
                    <div>
                        <h4 className="footer-heading">Our Services</h4>
                        <Link to="/services" className="footer-link">Corporate Events</Link>
                        <Link to="/services" className="footer-link">Social Gatherings</Link>
                        <Link to="/services" className="footer-link">Networking Events</Link>
                        <Link to="/services" className="footer-link">Conferences</Link>
                        <Link to="/services" className="footer-link">Workshops</Link>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 className="footer-heading">Get In Touch</h4>
                        <a href="mailto:contact@base-events.com" className="footer-link">
                            contact@base-events.com
                        </a>
                        <a href="tel:+1234567890" className="footer-link">
                            +1 (234) 567-890
                        </a>
                        <p className="footer-link" style={{ cursor: 'default' }}>
                            Your Business Address Here
                        </p>
                        <a
                            href="#"
                            onClick={(e) => e.preventDefault()}
                            className="footer-link"
                            style={{
                                color: 'var(--color-golden-light)',
                                marginTop: 'var(--space-4)',
                                display: 'inline-block',
                                opacity: 0.7,
                                cursor: 'default'
                            }}
                        >
                            View on Google Maps →
                        </a>
                    </div>
                </div>

                {/* Royal Divider */}
                <div className="royal-divider" style={{ margin: 'var(--space-8) 0' }}></div>

                {/* Footer Bottom */}
                <div className="footer-bottom">
                    <p>© {currentYear} BASE Events. All rights reserved.</p>
                    <div style={{ display: 'flex', gap: 'var(--space-6)' }}>
                        <Link to="/privacy" className="footer-link" style={{ padding: 0 }}>Privacy Policy</Link>
                        <Link to="/terms" className="footer-link" style={{ padding: 0 }}>Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer
