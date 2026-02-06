import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'

const Services = () => {
    const services = [
        {
            icon: '👔',
            title: 'Corporate Events',
            description: 'Prestigious business conferences, executive retreats, and corporate gatherings.',
            features: ['Executive conferences', 'Board meetings', 'Product launches', 'Award galas', 'Stakeholder events']
        },
        {
            icon: '🥂',
            title: 'Social Galas',
            description: 'Opulent celebrations and elegant social gatherings for distinguished guests.',
            features: ['Grand celebration galas', 'Charity balls', 'Anniversary celebrations', 'Private dinners', 'Exclusive receptions']
        },
        {
            icon: '🤝',
            title: 'Elite Networking',
            description: 'Exclusive networking soirées connecting industry leaders.',
            features: ['Industry gatherings', 'VIP networking', 'Professional mixers', 'Invitation-only events', 'Executive roundtables']
        },
        {
            icon: '🎙️',
            title: 'Grand Conferences',
            description: 'Large-scale conferences with world-class speakers and flawless execution.',
            features: ['Multi-day conferences', 'International summits', 'Trade exhibitions', 'Speaker management', 'Live streaming']
        },
        {
            icon: '📜',
            title: 'Executive Workshops',
            description: 'Sophisticated training sessions that inspire excellence.',
            features: ['Leadership development', 'Strategic planning', 'Team building', 'Skills masterclasses', 'Executive coaching']
        },
        {
            icon: '✨',
            title: 'Bespoke Events',
            description: 'Tailored luxury event solutions for your unique vision.',
            features: ['Fully customised', 'Unique venues', 'Themed productions', 'Experiential events', 'Destination events']
        }
    ]

    const process = [
        { step: '01', title: 'Consultation', description: 'Understanding your vision and objectives.' },
        { step: '02', title: 'Conceptualisation', description: 'Developing a bespoke concept for your event.' },
        { step: '03', title: 'Curation', description: 'Selecting the finest venues and vendors.' },
        { step: '04', title: 'Execution', description: 'Flawless coordination and management.' }
    ]

    return (
        <>
            <Helmet>
                <title>Our Services | BASE - Business And Social Events</title>
                <meta name="description" content="Discover BASE's distinguished event services. From corporate conferences to social galas, we deliver extraordinary experiences." />
                <link rel="canonical" href="YOUR_DOMAIN_HERE/services" />
            </Helmet>

            {/* Hero */}
            <section className="hero" style={{ minHeight: '50vh' }}>
                <div className="hero-content">
                    <span className="hero-badge animate-fade-in">What We Offer</span>
                    <h1 className="heading-display hero-title animate-fade-in-up">
                        Our <span className="text-gold">Services</span>
                    </h1>
                    <p className="hero-subtitle animate-fade-in-up animate-delay-1">
                        Comprehensive event solutions for discerning clientele
                    </p>
                </div>
            </section>

            {/* Services Grid */}
            <section className="section section-lg" style={{ background: 'var(--color-brown-medium)' }}>
                <div className="container">
                    <div className="grid" style={{ gridTemplateColumns: 'repeat(2, 1fr)', gap: 'var(--space-8)' }}>
                        {services.map((service, index) => (
                            <div key={index} className="royal-border" style={{
                                background: 'var(--color-cream)',
                                padding: 'var(--space-6)'
                            }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)', marginBottom: 'var(--space-4)' }}>
                                    <div className="feature-icon" style={{ width: '60px', height: '60px', fontSize: 'var(--font-size-2xl)' }}>
                                        {service.icon}
                                    </div>
                                    <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--font-size-xl)', color: 'var(--color-forest-green)' }}>
                                        {service.title}
                                    </h3>
                                </div>

                                <p style={{ color: 'var(--color-text-body)', marginBottom: 'var(--space-4)', lineHeight: '1.7' }}>
                                    {service.description}
                                </p>

                                <ul style={{ padding: 0, listStyle: 'none' }}>
                                    {service.features.map((feature, i) => (
                                        <li key={i} style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: 'var(--space-2)',
                                            marginBottom: 'var(--space-2)',
                                            color: 'var(--color-text-dark)',
                                            fontSize: 'var(--font-size-sm)'
                                        }}>
                                            <span style={{ color: 'var(--color-gold)', fontSize: '12px' }}>◆</span>
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Process */}
            <section className="section section-lg" style={{ background: 'var(--color-forest-green)', position: 'relative' }}>
                <div style={{
                    position: 'absolute',
                    top: '20px',
                    left: '20px',
                    right: '20px',
                    bottom: '20px',
                    border: '1px solid rgba(201, 162, 39, 0.2)',
                    pointerEvents: 'none'
                }} />

                <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                    <div className="text-center mb-12">
                        <div className="ornament">
                            <span className="ornament-icon">✦</span>
                        </div>
                        <h2 className="heading-2 text-white">
                            Our <span className="text-gold">Process</span>
                        </h2>
                        <p style={{ color: 'var(--color-champagne)', fontStyle: 'italic', marginTop: 'var(--space-4)' }}>
                            A refined approach to creating extraordinary experiences
                        </p>
                    </div>

                    <div className="grid grid-cols-4 gap-6">
                        {process.map((step, index) => (
                            <div key={index} style={{ textAlign: 'center' }}>
                                <div style={{
                                    width: '70px',
                                    height: '70px',
                                    margin: '0 auto var(--space-4)',
                                    background: 'rgba(201, 162, 39, 0.1)',
                                    border: '2px solid var(--color-gold)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontFamily: 'var(--font-display)',
                                    fontSize: 'var(--font-size-2xl)',
                                    fontWeight: '700',
                                    color: 'var(--color-gold)'
                                }}>
                                    {step.step}
                                </div>
                                <h3 style={{ color: 'var(--color-gold)', marginBottom: 'var(--space-2)', fontFamily: 'var(--font-display)' }}>
                                    {step.title}
                                </h3>
                                <p style={{ color: 'var(--color-champagne)', fontSize: 'var(--font-size-sm)', lineHeight: '1.6' }}>
                                    {step.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="section section-lg" style={{ background: 'var(--color-brown-medium)', textAlign: 'center' }}>
                <div className="container">
                    <div className="ornament">
                        <span className="ornament-icon">✦</span>
                    </div>
                    <h2 className="heading-2" style={{ marginBottom: 'var(--space-4)' }}>
                        Ready to Begin Your <span className="text-gold">Event</span>?
                    </h2>
                    <p style={{
                        color: 'var(--color-text-body)',
                        maxWidth: '500px',
                        margin: '0 auto var(--space-8)',
                        fontFamily: 'var(--font-display)',
                        fontStyle: 'italic',
                        fontSize: 'var(--font-size-lg)'
                    }}>
                        Contact us today and let us transform your vision into reality.
                    </p>
                    <Link to="/contact" className="btn btn-primary btn-lg">
                        Request Consultation
                    </Link>
                </div>
            </section>
        </>
    )
}

export default Services
