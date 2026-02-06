import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

const Header = () => {
    const [isScrolled, setIsScrolled] = useState(false)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const location = useLocation()

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50)
        }

        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    useEffect(() => {
        setIsMobileMenuOpen(false)
    }, [location])

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'About', path: '/about' },
        { name: 'Services', path: '/services' },
        { name: 'Events', path: '/events' },
        { name: 'Contact', path: '/contact' },
    ]

    return (
        <header className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
            <div className="container navbar-content">
                <Link to="/" className="navbar-brand">
                    <img
                        src="/assets/logo.png"
                        alt="BASE - Business And Social Events"
                        className="navbar-logo"
                        style={{ height: isScrolled ? '50px' : '60px', transition: 'height 0.3s ease' }}
                    />
                </Link>

                <nav className={`navbar-links ${isMobileMenuOpen ? 'active' : ''}`}>
                    {navLinks.map(link => (
                        <Link
                            key={link.path}
                            to={link.path}
                            className={`navbar-link ${location.pathname === link.path ? 'active' : ''}`}
                        >
                            {link.name}
                        </Link>
                    ))}
                    <Link to="/contact" className="btn btn-primary" style={{ marginLeft: 'var(--space-4)' }}>
                        Book Now
                    </Link>
                </nav>

                <button
                    className="mobile-menu-btn"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    aria-label="Toggle menu"
                >
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
            </div>
        </header>
    )
}

export default Header
