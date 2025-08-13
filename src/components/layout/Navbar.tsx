import React, { useState, useEffect } from 'react';
import MobileMenu from './MobileMenu';

interface NavbarProps {
  currentPage: string;
  onPageChange: (page: string, eventId?: string) => void;
  onMobileMenuToggle: () => void;
  isMobileMenuOpen: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ currentPage, onPageChange, onMobileMenuToggle, isMobileMenuOpen }) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', label: 'Home', icon: '🏠' },
    { id: 'about', label: 'About', icon: '📖' },
    { id: 'culture', label: 'Culture', icon: '🎭' },
    { id: 'events', label: 'Events', icon: '🎪' },
    { id: 'community', label: 'Community', icon: '👥' },
    { id: 'contact', label: 'Contact', icon: '📞' }
  ];

  const handleLinkClick = (page: string) => {
    onPageChange(page);
  };

  return (
    <>
      <header className={`floating-navbar ${isScrolled ? 'scrolled' : ''}`}>
        <div className="container navbar-container">
          {/* Logo/Brand */}
          <div className="navbar-brand" onClick={() => handleLinkClick('home')}>
            <img 
              src="/assets/images/abha-logo.png" 
              alt="ABHA Logo" 
              className="navbar-logo"
              onError={(e) => {
                // Fallback if logo doesn't exist yet
                e.currentTarget.style.display = 'none';
              }}
            />
            <div className="navbar-brand-text">
              <span className="navbar-title">ABHA</span>
              <span className="navbar-subtitle">Harrisburg, PA</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="navbar-links desktop">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick(item.id);
                }}
                className={`navbar-link ${currentPage === item.id ? 'active' : ''}`}
              >
                <span className="navbar-link-icon">{item.icon}</span>
                {item.label}
              </a>
            ))}
          </nav>

          {/* Mobile Menu Toggle */}
          <button 
            className="mobile-menu-toggle"
            onClick={onMobileMenuToggle}
            aria-label="Toggle menu"
          >
            <div className={`hamburger-icon ${isMobileMenuOpen ? 'open' : ''}`}>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </button>
        </div>
      </header>
      <MobileMenu 
        isOpen={isMobileMenuOpen}
        navItems={navItems}
        currentPage={currentPage}
        onLinkClick={handleLinkClick}
        onClose={onMobileMenuToggle}
      />
    </>
  );
};

export default Navbar;
