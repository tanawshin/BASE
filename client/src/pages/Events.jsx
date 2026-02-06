import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'

const Events = () => {
    const [filter, setFilter] = useState('all')
    const [events, setEvents] = useState([])
    const [loading, setLoading] = useState(true)

    const sampleEvents = [
        {
            id: 1,
            slug: 'annual-business-summit-2024',
            title: 'Annual Business Summit 2024',
            category: 'corporate',
            date: '2024-03-15',
            location: 'The Grand Ballroom, London',
            description: 'A prestigious gathering of industry leaders discussing the future of global enterprise.',
            featured: true
        },
        {
            id: 2,
            slug: 'spring-gala-charity-ball',
            title: 'Spring Gala Charity Ball',
            category: 'social',
            date: '2024-04-20',
            location: 'Majestic Estate, Cambridge',
            description: 'An elegant evening of philanthropy and celebration under the stars.',
            featured: true
        },
        {
            id: 3,
            slug: 'executive-networking-evening',
            title: 'Executive Networking Evening',
            category: 'networking',
            date: '2024-03-28',
            location: 'The Regency Club, Manchester',
            description: 'An exclusive opportunity to connect with fellow executives.',
            featured: false
        },
        {
            id: 4,
            slug: 'innovation-leadership-workshop',
            title: 'Innovation Leadership Workshop',
            category: 'workshop',
            date: '2024-05-10',
            location: 'Churchill Conference Centre',
            description: 'Transform your leadership approach with cutting-edge strategies.',
            featured: false
        },
        {
            id: 5,
            slug: 'midsummer-celebration',
            title: 'Midsummer Celebration',
            category: 'social',
            date: '2024-06-21',
            location: 'Pembroke Gardens',
            description: 'A magical evening celebrating the longest day with distinguished guests.',
            featured: true
        },
        {
            id: 6,
            slug: 'tech-leaders-conference',
            title: 'Tech Leaders Conference',
            category: 'conference',
            date: '2024-07-15',
            location: 'Innovation Hub, Birmingham',
            description: 'Where technology visionaries gather to shape the digital future.',
            featured: false
        }
    ]

    useEffect(() => {
        setEvents(sampleEvents)
        setLoading(false)
    }, [])

    const categories = [
        { value: 'all', label: 'All Events' },
        { value: 'corporate', label: 'Corporate' },
        { value: 'social', label: 'Social Galas' },
        { value: 'networking', label: 'Networking' },
        { value: 'conference', label: 'Conferences' },
        { value: 'workshop', label: 'Workshops' }
    ]

    const filteredEvents = filter === 'all' ? events : events.filter(e => e.category === filter)

    const formatDate = (dateString) => {
        const date = new Date(dateString)
        return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
    }

    const getCategoryLabel = (cat) => categories.find(c => c.value === cat)?.label || cat

    return (
        <>
            <Helmet>
                <title>Events | BASE - Business And Social Events</title>
                <meta name="description" content="Explore upcoming distinguished events curated by BASE. From corporate summits to elegant galas." />
                <link rel="canonical" href="YOUR_DOMAIN_HERE/events" />
            </Helmet>

            {/* Hero */}
            <section className="hero" style={{ minHeight: '50vh' }}>
                <div className="hero-content">
                    <span className="hero-badge animate-fade-in">Upcoming Occasions</span>
                    <h1 className="heading-display hero-title animate-fade-in-up">
                        Our <span className="text-gold">Events</span>
                    </h1>
                    <p className="hero-subtitle animate-fade-in-up animate-delay-1">
                        Distinguished gatherings that inspire, connect, and create lasting memories
                    </p>
                </div>
            </section>

            {/* Events Listing */}
            <section className="section section-lg" style={{ background: 'var(--color-brown-medium)' }}>
                <div className="container">
                    {/* Filters */}
                    <div style={{ display: 'flex', justifyContent: 'center', gap: 'var(--space-3)', flexWrap: 'wrap', marginBottom: 'var(--space-10)' }}>
                        {categories.map(cat => (
                            <button
                                key={cat.value}
                                onClick={() => setFilter(cat.value)}
                                style={{
                                    padding: 'var(--space-3) var(--space-5)',
                                    background: filter === cat.value ? 'var(--color-forest-green)' : 'transparent',
                                    color: filter === cat.value ? 'var(--color-gold)' : 'var(--color-forest-green)',
                                    border: '2px solid var(--color-gold)',
                                    cursor: 'pointer',
                                    fontSize: 'var(--font-size-sm)',
                                    fontWeight: '600',
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.1em',
                                    transition: 'all 0.3s ease'
                                }}
                            >
                                {cat.label}
                            </button>
                        ))}
                    </div>

                    {/* Events Grid */}
                    {loading ? (
                        <div className="text-center" style={{ padding: 'var(--space-16)' }}>
                            <p style={{ color: 'var(--color-text-muted)' }}>Loading events...</p>
                        </div>
                    ) : filteredEvents.length === 0 ? (
                        <div className="text-center" style={{ padding: 'var(--space-16)' }}>
                            <p style={{ color: 'var(--color-text-muted)', fontStyle: 'italic' }}>
                                No events found in this category.
                            </p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-3 gap-8">
                            {filteredEvents.map((event) => (
                                <div key={event.id} className="event-card">
                                    <div className="event-card-header">
                                        {event.featured && (
                                            <span style={{
                                                position: 'absolute',
                                                top: 'var(--space-3)',
                                                right: 'var(--space-3)',
                                                background: 'var(--color-gold)',
                                                color: 'var(--color-forest-dark)',
                                                padding: '2px 8px',
                                                fontSize: 'var(--font-size-xs)',
                                                fontWeight: '700',
                                                textTransform: 'uppercase'
                                            }}>
                                                Featured
                                            </span>
                                        )}
                                        <div className="event-card-category">{getCategoryLabel(event.category)}</div>
                                        <h3 className="event-card-title">{event.title}</h3>
                                    </div>

                                    <div className="event-card-content">
                                        <div className="event-card-date">
                                            <span style={{ color: 'var(--color-gold)' }}>◆</span>
                                            {formatDate(event.date)}
                                        </div>
                                        <p className="event-card-location">{event.location}</p>
                                        <p className="event-card-description">{event.description}</p>
                                        <Link to={`/events/${event.slug}`} className="btn btn-primary" style={{ width: '100%' }}>
                                            View Details
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* CTA */}
            <section className="section section-lg" style={{ background: 'var(--color-forest-green)', textAlign: 'center', position: 'relative' }}>
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
                    <div className="ornament">
                        <span className="ornament-icon">✦</span>
                    </div>
                    <h2 className="heading-2 text-white" style={{ marginBottom: 'var(--space-4)' }}>
                        Planning a <span className="text-gold">Private Event</span>?
                    </h2>
                    <p style={{
                        color: 'var(--color-champagne)',
                        maxWidth: '500px',
                        margin: '0 auto var(--space-8)',
                        fontFamily: 'var(--font-display)',
                        fontStyle: 'italic',
                        fontSize: 'var(--font-size-lg)'
                    }}>
                        Let us create a bespoke experience tailored exclusively to your vision.
                    </p>
                    <Link to="/contact" className="btn btn-primary btn-lg">
                        Request Consultation
                    </Link>
                </div>
            </section>
        </>
    )
}

export default Events
