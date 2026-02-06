import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'

const About = () => {
    const values = [
        {
            title: 'Excellence',
            description: 'We pursue perfection in every detail, ensuring each event surpasses expectations.'
        },
        {
            title: 'Elegance',
            description: 'Sophistication is woven into every aspect of our events, from design to execution.'
        },
        {
            title: 'Discretion',
            description: 'Your privacy is paramount. We maintain the highest standards of confidentiality.'
        },
        {
            title: 'Innovation',
            description: 'We blend timeless traditions with contemporary creativity for unique experiences.'
        }
    ]

    const milestones = [
        { year: '2014', event: 'BASE founded with a vision for exceptional events' },
        { year: '2016', event: 'Expanded to corporate event management' },
        { year: '2018', event: 'Established elite networking division' },
        { year: '2020', event: 'Pioneered virtual luxury experiences' },
        { year: '2022', event: 'Celebrated our 500th distinguished event' },
        { year: '2024', event: 'Recognised as premier event management firm' }
    ]

    return (
        <>
            <Helmet>
                <title>About Us | BASE - Business And Social Events</title>
                <meta name="description" content="Discover the story behind BASE Events. We are a distinguished event management company dedicated to creating extraordinary experiences." />
                <link rel="canonical" href="YOUR_DOMAIN_HERE/about" />
            </Helmet>

            {/* Hero */}
            <section className="hero" style={{ minHeight: '60vh' }}>
                <div className="hero-content">
                    <span className="hero-badge animate-fade-in">Our Heritage</span>
                    <h1 className="heading-display hero-title animate-fade-in-up">
                        About <span className="text-gold">BASE</span>
                    </h1>
                    <p className="hero-subtitle animate-fade-in-up animate-delay-1">
                        A legacy of excellence in creating distinguished experiences
                    </p>
                </div>
            </section>

            {/* Mission */}
            <section className="section section-lg" style={{ background: 'var(--color-brown-medium)' }}>
                <div className="container">
                    <div className="split-section-grid">
                        <div className="royal-border logo-showcase">
                            <img src="/assets/logo.png" alt="BASE Events" style={{ maxWidth: '250px', width: '100%' }} />
                        </div>

                        <div>
                            <div className="ornament" style={{ justifyContent: 'flex-start' }}>
                                <span className="ornament-icon">✦</span>
                            </div>
                            <h2 className="heading-2" style={{ marginBottom: 'var(--space-6)' }}>
                                Our <span className="text-gold">Mission</span>
                            </h2>
                            <p style={{
                                color: 'var(--color-text-body)',
                                fontFamily: 'var(--font-display)',
                                fontStyle: 'italic',
                                fontSize: 'var(--font-size-lg)',
                                lineHeight: '1.8',
                                marginBottom: 'var(--space-6)'
                            }}>
                                "To create extraordinary events that inspire, connect, and leave lasting
                                impressions upon the hearts and minds of our distinguished guests."
                            </p>
                            <p style={{ color: 'var(--color-text-body)', lineHeight: '1.8', marginBottom: 'var(--space-4)' }}>
                                Since our founding, BASE has been dedicated to the art of event curation.
                                We believe every gathering is an opportunity to create something magnificent.
                            </p>
                            <p style={{ color: 'var(--color-text-body)', lineHeight: '1.8' }}>
                                Our team of distinguished event architects brings together creativity,
                                precision, and an unwavering commitment to excellence.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Values */}
            <section className="section section-lg" style={{ background: 'var(--color-brown-dark)' }}>
                <div className="container">
                    <div className="text-center mb-12">
                        <div className="ornament">
                            <span className="ornament-icon">✦</span>
                        </div>
                        <h2 className="heading-2">Our Core Values</h2>
                    </div>

                    <div className="grid grid-cols-4 gap-8">
                        {values.map((value, index) => (
                            <div key={index} className="feature-card">
                                <div style={{
                                    width: '60px',
                                    height: '60px',
                                    margin: '0 auto var(--space-4)',
                                    background: 'var(--color-forest-green)',
                                    border: '2px solid var(--color-gold)',
                                    borderRadius: '50%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: 'var(--color-gold)',
                                    fontSize: 'var(--font-size-xl)',
                                    fontWeight: '700'
                                }}>
                                    ◆
                                </div>
                                <h3 className="feature-title">{value.title}</h3>
                                <p className="feature-description">{value.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Timeline */}
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
                            Our <span className="text-gold">Journey</span>
                        </h2>
                    </div>

                    <div style={{ maxWidth: '700px', margin: '0 auto' }}>
                        {milestones.map((milestone, index) => (
                            <div key={index} style={{
                                display: 'flex',
                                gap: 'var(--space-6)',
                                marginBottom: 'var(--space-6)',
                                alignItems: 'center'
                            }}>
                                <div style={{
                                    minWidth: '90px',
                                    fontFamily: 'var(--font-display)',
                                    fontSize: 'var(--font-size-2xl)',
                                    fontWeight: '700',
                                    color: 'var(--color-gold)',
                                    textAlign: 'right'
                                }}>
                                    {milestone.year}
                                </div>
                                <div style={{
                                    width: '16px',
                                    height: '16px',
                                    background: 'var(--color-gold)',
                                    borderRadius: '50%',
                                    flexShrink: 0
                                }} />
                                <div style={{
                                    flex: 1,
                                    padding: 'var(--space-4) var(--space-5)',
                                    background: 'rgba(201, 162, 39, 0.1)',
                                    border: '1px solid var(--color-gold)',
                                    color: 'var(--color-champagne)'
                                }}>
                                    {milestone.event}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="section section-lg" style={{ background: 'var(--color-brown-medium)' }}>
                <div className="container">
                    <div className="ornament">
                        <span className="ornament-icon">✦</span>
                    </div>
                    <h2 className="heading-2" style={{ marginBottom: 'var(--space-4)' }}>
                        Ready to Create Your <span className="text-gold">Vision</span>?
                    </h2>
                    <p style={{
                        color: 'var(--color-text-body)',
                        maxWidth: '500px',
                        margin: '0 auto var(--space-8)',
                        fontFamily: 'var(--font-display)',
                        fontStyle: 'italic',
                        fontSize: 'var(--font-size-lg)'
                    }}>
                        Allow us to transform your event into an extraordinary experience.
                    </p>
                    <Link to="/contact" className="btn btn-primary btn-lg">
                        Begin Your Journey
                    </Link>
                </div>
            </section>
        </>
    )
}

export default About
