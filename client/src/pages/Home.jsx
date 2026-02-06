import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'

const Home = () => {
    const services = [
        {
            icon: '👔',
            title: 'Corporate Events',
            description: 'Prestigious business conferences and executive gatherings that command respect and inspire success.'
        },
        {
            icon: '🥂',
            title: 'Social Galas',
            description: 'Opulent celebrations and elegant social gatherings that create timeless memories.'
        },
        {
            icon: '🤝',
            title: 'Elite Networking',
            description: 'Exclusive networking soirées connecting industry leaders in refined settings.'
        },
        {
            icon: '🎙️',
            title: 'Grand Conferences',
            description: 'Large-scale conferences with world-class speakers and flawless execution.'
        },
        {
            icon: '📜',
            title: 'Executive Workshops',
            description: 'Sophisticated training sessions that inspire excellence and innovation.'
        },
        {
            icon: '✨',
            title: 'Bespoke Events',
            description: 'Tailored luxury solutions crafted exclusively for your unique vision.'
        }
    ]

    const stats = [
        { number: '500+', label: 'Events Curated' },
        { number: '50K+', label: 'Distinguished Guests' },
        { number: '100+', label: 'Elite Clients' },
        { number: '10+', label: 'Years of Excellence' }
    ]

    const testimonials = [
        {
            quote: 'BASE transformed our annual conference into a truly exceptional experience. Their attention to detail exceeded all expectations.',
            author: 'Lady Sarah Morrison',
            title: 'CEO, Sterling Industries',
            initial: 'M'
        },
        {
            quote: 'The networking gala they orchestrated connected us with industry titans. An absolutely magnificent evening.',
            author: 'Sir Michael Chen',
            title: 'Chairman, Global Ventures',
            initial: 'C'
        },
        {
            quote: 'From conception to execution, BASE delivered perfection. Our corporate celebration was extraordinary.',
            author: 'Victoria Kingston',
            title: 'Director, Prestige Holdings',
            initial: 'K'
        }
    ]

    return (
        <>
            <Helmet>
                <title>BASE - Business And Social Events | Premier Event Management</title>
                <meta name="description" content="BASE creates distinguished business and social events. From prestigious corporate conferences to elegant galas, we deliver extraordinary experiences." />
                <link rel="canonical" href="https://cssentialserver.com/" />
                <script type="application/ld+json">
                    {`
                        {
                            "@context": "https://schema.org",
                            "@type": "Organization",
                            "name": "BASE Events",
                            "url": "https://cssentialserver.com/",
                            "logo": "https://cssentialserver.com/assets/logo.png",
                            "sameAs": [
                                "https://www.instagram.com/baseeventsuk?igsh=MWppbHA4NWluOHp0cQ==",
                                "https://facebook.com/BASE-Events", 
                                "https://linkedin.com/company/base-events",
                                "https://twitter.com/base_events"
                            ],
                            "contactPoint": {
                                "@type": "ContactPoint",
                                "telephone": "+1-234-567-890",
                                "contactType": "customer service"
                            }
                        }
                    `}
                </script>
            </Helmet>

            {/* Hero Section */}
            <section className="hero">
                <div className="hero-content">
                    <span className="hero-badge animate-fade-in">Premier Event Management</span>
                    <h1 className="heading-display hero-title animate-fade-in-up">
                        Creating <span className="text-gold">Extraordinary</span> Experiences
                    </h1>
                    <p className="hero-subtitle animate-fade-in-up animate-delay-1">
                        Where elegance meets excellence. We curate distinguished business and social
                        events that inspire, connect, and leave lasting impressions.
                    </p>
                    <div className="hero-buttons animate-fade-in-up animate-delay-2">
                        <Link to="/events" className="btn btn-primary btn-lg">
                            Discover Events
                        </Link>
                        <Link to="/contact" className="btn btn-secondary btn-lg">
                            Request Consultation
                        </Link>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="stats-section">
                <div className="container">
                    <div className="grid grid-cols-4 gap-8">
                        {stats.map((stat, index) => (
                            <div key={index} className="stat-item">
                                <div className="stat-number">{stat.number}</div>
                                <div className="stat-label">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Services Section */}
            <section className="section section-lg" style={{ background: 'var(--color-brown-medium)' }}>
                <div className="container">
                    <div className="text-center mb-12">
                        <div className="ornament">
                            <span className="ornament-icon">✦</span>
                        </div>
                        <h2 className="heading-2">Our Distinguished Services</h2>
                        <p style={{
                            color: 'var(--color-text-body)',
                            fontFamily: 'var(--font-display)',
                            fontStyle: 'italic',
                            marginTop: 'var(--space-4)'
                        }}>
                            Comprehensive event solutions curated for discerning clientele
                        </p>
                    </div>

                    <div className="grid grid-cols-3 gap-8">
                        {services.map((service, index) => (
                            <div key={index} className="feature-card">
                                <div className="feature-icon">{service.icon}</div>
                                <h3 className="feature-title">{service.title}</h3>
                                <p className="feature-description">{service.description}</p>
                            </div>
                        ))}
                    </div>

                    <div className="text-center mt-12">
                        <Link to="/services" className="btn btn-primary btn-lg">
                            Explore All Services
                        </Link>
                    </div>
                </div>
            </section>

            {/* Why Choose Us */}
            <section className="section section-lg" style={{ background: 'var(--color-brown-dark)' }}>
                <div className="container">
                    <div className="split-section-grid">
                        <div>
                            <div className="ornament" style={{ justifyContent: 'flex-start' }}>
                                <span className="ornament-icon">✦</span>
                            </div>
                            <h2 className="heading-2" style={{ marginBottom: 'var(--space-6)' }}>
                                Where <span className="text-gold">Excellence</span> Meets Elegance
                            </h2>
                            <p style={{
                                color: 'var(--color-text-body)',
                                lineHeight: '1.8',
                                marginBottom: 'var(--space-6)',
                                fontFamily: 'var(--font-display)',
                                fontStyle: 'italic',
                                fontSize: 'var(--font-size-lg)'
                            }}>
                                At BASE, every event is a masterpiece. Our distinguished team brings
                                creativity, precision, and passion to transform your vision into reality.
                            </p>
                            <ul style={{ listStyle: 'none', padding: 0, marginBottom: 'var(--space-8)' }}>
                                {[
                                    'Personalized concierge-level service',
                                    'Award-winning event professionals',
                                    'Access to exclusive venues worldwide',
                                    'Impeccable planning and execution',
                                    'Discreet and confidential service'
                                ].map((item, index) => (
                                    <li key={index} style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 'var(--space-3)',
                                        marginBottom: 'var(--space-3)',
                                        color: 'var(--color-text-dark)'
                                    }}>
                                        <span style={{ color: 'var(--color-gold)', fontSize: '14px' }}>◆</span>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                            <Link to="/about" className="btn btn-primary">
                                Discover Our Story
                            </Link>
                        </div>

                        <div className="royal-border logo-showcase">
                            <img
                                src="/assets/logo.png"
                                alt="BASE Events"
                                style={{ maxWidth: '280px', width: '100%' }}
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section className="section section-lg" style={{ background: 'var(--color-brown-medium)' }}>
                <div className="container">
                    <div className="text-center mb-12">
                        <div className="ornament">
                            <span className="ornament-icon">✦</span>
                        </div>
                        <h2 className="heading-2">Words From Distinguished Clients</h2>
                    </div>

                    <div className="grid grid-cols-3 gap-8">
                        {testimonials.map((testimonial, index) => (
                            <div key={index} className="testimonial-card">
                                <p className="testimonial-quote">{testimonial.quote}</p>
                                <div className="testimonial-author">
                                    <div className="testimonial-avatar">
                                        {testimonial.initial}
                                    </div>
                                    <div>
                                        <div className="testimonial-name">{testimonial.author}</div>
                                        <div className="testimonial-title">{testimonial.title}</div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="section section-lg" style={{
                background: 'var(--color-forest-green)',
                position: 'relative'
            }}>
                <div style={{
                    position: 'absolute',
                    top: '20px',
                    left: '20px',
                    right: '20px',
                    bottom: '20px',
                    border: '1px solid rgba(201, 162, 39, 0.2)',
                    pointerEvents: 'none'
                }} />

                <div className="container cta-text-responsive" style={{ position: 'relative', zIndex: 1 }}>
                    <div className="ornament">
                        <span className="ornament-icon">✦</span>
                    </div>
                    <h2 className="heading-2 text-white" style={{ marginBottom: 'var(--space-4)' }}>
                        Ready to Create Something <span className="text-gold">Extraordinary</span>?
                    </h2>
                    <p style={{
                        color: 'var(--color-champagne)',
                        maxWidth: '500px',
                        margin: '0 auto var(--space-8)',
                        fontSize: 'var(--font-size-lg)',
                        fontFamily: 'var(--font-display)',
                        fontStyle: 'italic'
                    }}>
                        Allow us the privilege of bringing your vision to life.
                    </p>
                    <div style={{ display: 'flex', gap: 'var(--space-4)', justifyContent: 'center', flexWrap: 'wrap' }}>
                        <Link to="/contact" className="btn btn-primary btn-lg">
                            Request Consultation
                        </Link>
                        <Link to="/events" className="btn btn-white btn-lg">
                            View Our Events
                        </Link>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Home
