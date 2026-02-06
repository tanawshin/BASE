import { Helmet } from 'react-helmet-async'
import { useState } from 'react'
import { FacebookIcon, InstagramIcon, LinkedInIcon, TwitterIcon } from '../components/SocialIcons'

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        subject: '',
        eventType: '',
        message: ''
    })
    const [submitStatus, setSubmitStatus] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsSubmitting(true)
        setSubmitStatus('')

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            })

            const data = await response.json()

            if (data.success) {
                setSubmitStatus('success')
                setFormData({ name: '', email: '', phone: '', subject: '', eventType: '', message: '' })
            } else {
                setSubmitStatus('error')
            }
        } catch {
            setSubmitStatus('error')
        } finally {
            setIsSubmitting(false)
        }
    }

    const contactInfo = [
        { icon: '✉', title: 'Email Us', content: 'contact@base-events.com', link: 'mailto:contact@base-events.com' },
        { icon: '☎', title: 'Call Us', content: '+1 (234) 567-890', link: 'tel:+1234567890' },
        { icon: '◈', title: 'Visit Us', content: 'Your Business Address Here', link: null },
        { icon: '◷', title: 'Business Hours', content: 'Mon - Fri: 9AM - 6PM', link: null }
    ]

    const socialLinks = [
        { name: 'Facebook', icon: FacebookIcon, url: '#', disabled: true },
        { name: 'Instagram', icon: InstagramIcon, url: 'https://www.instagram.com/baseeventsuk?igsh=MWppbHA4NWluOHp0cQ==', disabled: false },
        { name: 'LinkedIn', icon: LinkedInIcon, url: '#', disabled: true },
        { name: 'Twitter', icon: TwitterIcon, url: '#', disabled: true }
    ]

    return (
        <>
            <Helmet>
                <title>Contact Us | BASE - Business And Social Events</title>
                <meta name="description" content="Get in touch with BASE Events. Contact us for event planning consultations and inquiries." />
                <link rel="canonical" href="YOUR_DOMAIN_HERE/contact" />
            </Helmet>

            {/* Hero */}
            <section className="hero" style={{ minHeight: '50vh' }}>
                <div className="hero-content">
                    <span className="hero-badge animate-fade-in">Get In Touch</span>
                    <h1 className="heading-display hero-title animate-fade-in-up">
                        Contact <span className="text-gold">Us</span>
                    </h1>
                    <p className="hero-subtitle animate-fade-in-up animate-delay-1">
                        We would be honoured to discuss how we can bring your vision to life.
                    </p>
                </div>
            </section>

            {/* Contact Section */}
            <section className="section section-lg" style={{ background: 'var(--color-brown-medium)' }}>
                <div className="container">
                    <div className="grid" style={{ gridTemplateColumns: '1fr 1.5fr', gap: 'var(--space-12)', alignItems: 'start' }}>

                        {/* Contact Info */}
                        <div>
                            <div className="ornament" style={{ justifyContent: 'flex-start' }}>
                                <span className="ornament-icon">✦</span>
                            </div>
                            <h2 className="heading-3 mb-8">Reach Out</h2>

                            <div style={{ marginBottom: 'var(--space-8)' }}>
                                {contactInfo.map((item, index) => (
                                    <div key={index} style={{
                                        display: 'flex',
                                        alignItems: 'flex-start',
                                        gap: 'var(--space-4)',
                                        padding: 'var(--space-4) 0',
                                        borderBottom: '1px solid var(--color-gold)'
                                    }}>
                                        <div style={{
                                            width: '48px',
                                            height: '48px',
                                            background: 'var(--color-forest-green)',
                                            border: '2px solid var(--color-gold)',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            fontSize: 'var(--font-size-lg)',
                                            color: 'var(--color-gold)',
                                            flexShrink: 0
                                        }}>
                                            {item.icon}
                                        </div>
                                        <div>
                                            <h4 style={{
                                                color: 'var(--color-forest-green)',
                                                marginBottom: '2px',
                                                fontSize: 'var(--font-size-sm)',
                                                textTransform: 'uppercase',
                                                letterSpacing: '0.08em',
                                                fontWeight: '600'
                                            }}>
                                                {item.title}
                                            </h4>
                                            {item.link ? (
                                                <a href={item.link} style={{ color: 'var(--color-text-body)' }}>
                                                    {item.content}
                                                </a>
                                            ) : (
                                                <span style={{ color: 'var(--color-text-body)' }}>{item.content}</span>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Social Links */}
                            <h3 style={{
                                marginBottom: 'var(--space-4)',
                                fontSize: 'var(--font-size-sm)',
                                textTransform: 'uppercase',
                                letterSpacing: '0.12em',
                                color: 'var(--color-gold-dark)',
                                fontWeight: '600'
                            }}>
                                Follow Us
                            </h3>
                            <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
                                {socialLinks.map((social) => {
                                    const IconComponent = social.icon
                                    return (
                                        <a
                                            key={social.name}
                                            href={social.url}
                                            target={social.disabled ? undefined : "_blank"}
                                            rel={social.disabled ? undefined : "noopener noreferrer"}
                                            className="footer-social-link"
                                            title={social.name}
                                            onClick={(e) => {
                                                if (social.disabled) e.preventDefault()
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

                            {/* Google Business */}
                            <div className="royal-border" style={{
                                marginTop: 'var(--space-8)',
                                padding: 'var(--space-5)',
                                background: 'var(--color-forest-green)'
                            }}>
                                <h4 style={{ marginBottom: 'var(--space-2)', color: 'var(--color-gold)' }}>
                                    Find Us on Google
                                </h4>
                                <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-champagne)', marginBottom: 'var(--space-4)' }}>
                                    View our reviews and get directions
                                </p>
                                <a href="#" onClick={(e) => e.preventDefault()}
                                    className="btn btn-primary" style={{ width: '100%', opacity: 0.7, cursor: 'default' }}>
                                    View Google Profile
                                </a>
                            </div>
                        </div>

                        {/* Contact Form */}
                        <div className="royal-border" style={{
                            background: 'var(--color-cream)',
                            padding: 'var(--space-10)'
                        }}>
                            <div className="text-center mb-6">
                                <div className="ornament">
                                    <span className="ornament-icon">✦</span>
                                </div>
                                <h2 className="heading-3">Send Us a Message</h2>
                                <p style={{ color: 'var(--color-text-muted)', fontStyle: 'italic', marginTop: 'var(--space-2)' }}>
                                    Complete the form below and we shall respond within 24 hours.
                                </p>
                            </div>

                            {submitStatus === 'success' && (
                                <div style={{
                                    padding: 'var(--space-4)',
                                    background: 'rgba(46, 125, 74, 0.1)',
                                    border: '2px solid var(--color-success)',
                                    marginBottom: 'var(--space-6)',
                                    color: 'var(--color-success)',
                                    textAlign: 'center'
                                }}>
                                    ✓ Thank you for your inquiry. We shall be in touch shortly.
                                </div>
                            )}

                            {submitStatus === 'error' && (
                                <div style={{
                                    padding: 'var(--space-4)',
                                    background: 'rgba(199, 62, 62, 0.1)',
                                    border: '2px solid var(--color-error)',
                                    marginBottom: 'var(--space-6)',
                                    color: 'var(--color-error)',
                                    textAlign: 'center'
                                }}>
                                    Something went wrong. Please try again.
                                </div>
                            )}

                            <form onSubmit={handleSubmit}>
                                <div className="grid grid-cols-2 gap-6">
                                    <div className="form-group">
                                        <label className="form-label" htmlFor="name">Full Name *</label>
                                        <input type="text" id="name" name="name" className="form-input"
                                            placeholder="John Doe" value={formData.name} onChange={handleChange} required />
                                    </div>
                                    <div className="form-group">
                                        <label className="form-label" htmlFor="email">Email Address *</label>
                                        <input type="email" id="email" name="email" className="form-input"
                                            placeholder="john@example.com" value={formData.email} onChange={handleChange} required />
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-6">
                                    <div className="form-group">
                                        <label className="form-label" htmlFor="phone">Phone Number</label>
                                        <input type="tel" id="phone" name="phone" className="form-input"
                                            placeholder="+1 (234) 567-890" value={formData.phone} onChange={handleChange} />
                                    </div>
                                    <div className="form-group">
                                        <label className="form-label" htmlFor="eventType">Event Type</label>
                                        <select id="eventType" name="eventType" className="form-input"
                                            value={formData.eventType} onChange={handleChange}>
                                            <option value="">Select event type</option>
                                            <option value="corporate">Corporate Event</option>
                                            <option value="social">Social Gala</option>
                                            <option value="networking">Networking Event</option>
                                            <option value="conference">Conference</option>
                                            <option value="workshop">Executive Workshop</option>
                                            <option value="other">Bespoke Event</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label className="form-label" htmlFor="subject">Subject</label>
                                    <input type="text" id="subject" name="subject" className="form-input"
                                        placeholder="How may we assist you?" value={formData.subject} onChange={handleChange} />
                                </div>

                                <div className="form-group">
                                    <label className="form-label" htmlFor="message">Message *</label>
                                    <textarea id="message" name="message" className="form-input form-textarea"
                                        placeholder="Please share your vision..." value={formData.message}
                                        onChange={handleChange} required rows="5" />
                                </div>

                                <button type="submit" className="btn btn-primary btn-lg"
                                    style={{ width: '100%' }} disabled={isSubmitting}>
                                    {isSubmitting ? 'Sending...' : 'Submit Inquiry'}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <section className="section" style={{ background: 'var(--color-brown-dark)' }}>
                <div className="container">
                    <div className="text-center mb-8">
                        <div className="ornament">
                            <span className="ornament-icon">✦</span>
                        </div>
                        <h2 className="heading-2">Frequently Asked Questions</h2>
                    </div>

                    <div style={{ maxWidth: '700px', margin: '0 auto' }}>
                        {[
                            { q: 'How far in advance should I book my event?', a: 'We recommend booking at least 3-6 months in advance for grand events and 1-2 months for intimate gatherings.' },
                            { q: 'What is included in your event planning services?', a: 'Our comprehensive services include venue selection, vendor curation, bespoke design, timeline orchestration, and day-of coordination.' },
                            { q: 'Do you offer virtual or hybrid event options?', a: 'Yes, we specialise in sophisticated virtual and hybrid events with professional broadcasting and seamless technical support.' },
                            { q: 'How do you ensure privacy for high-profile clients?', a: 'Discretion is paramount. We maintain strict confidentiality protocols and work with vetted vendors.' }
                        ].map((faq, index) => (
                            <details key={index} style={{
                                marginBottom: 'var(--space-4)',
                                background: 'var(--color-ivory)',
                                border: '1px solid var(--color-gold)'
                            }}>
                                <summary style={{
                                    padding: 'var(--space-4) var(--space-5)',
                                    cursor: 'pointer',
                                    fontWeight: '600',
                                    color: 'var(--color-forest-green)',
                                    fontFamily: 'var(--font-display)'
                                }}>
                                    {faq.q}
                                </summary>
                                <div style={{
                                    padding: '0 var(--space-5) var(--space-4)',
                                    color: 'var(--color-text-body)',
                                    lineHeight: '1.7',
                                    borderTop: '1px solid rgba(201, 162, 39, 0.3)'
                                }}>
                                    {faq.a}
                                </div>
                            </details>
                        ))}
                    </div>
                </div>
            </section>
        </>
    )
}

export default Contact
