import React, { useState } from 'react';
import Navbar from './Navbar';

interface HeaderProps {
  currentPage: string;
  onPageChange: (page: string, eventId?: string) => void;
  onMobileMenuToggle: () => void;
  isMobileMenuOpen: boolean;
}

const Header: React.FC<HeaderProps> = ({ currentPage, onPageChange, onMobileMenuToggle, isMobileMenuOpen }) => {
  const [showBanner, setShowBanner] = useState(true);

  const handleViewEventsClick = () => {
    onPageChange('events');
    setTimeout(() => {
      const upcomingSection = document.querySelector('.upcoming-events-section');
      if (upcomingSection) {
        upcomingSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  return (
    <header className="site-header">
      <Navbar 
        currentPage={currentPage} 
        onPageChange={onPageChange} 
        onMobileMenuToggle={onMobileMenuToggle}
        isMobileMenuOpen={isMobileMenuOpen}
      />
      {showBanner && (
        <section className="upcoming-events-banner">
          <div className="container">
            <div className="banner-content">
              <div className="banner-icon">🎵</div>
              <div className="banner-text">
                <h3>New Upcoming Events!</h3>
                <p>Musical Extravaganza with Rathijit & Shreya + Durga Puja 2025</p>
              </div>
              <div className="banner-actions">
                <button 
                  onClick={handleViewEventsClick}
                  className="banner-cta-btn"
                >
                  View Events
                </button>
                <button 
                  onClick={() => setShowBanner(false)}
                  className="banner-close-btn"
                  aria-label="Close banner"
                >
                  ✕
                </button>
              </div>
            </div>
          </div>
        </section>
      )}
    </header>
  );
};

export default Header;
