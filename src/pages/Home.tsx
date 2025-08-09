import React from 'react';

interface HomePageProps {
  onPageChange?: (page: string, eventToExpand?: string) => void;
}

const HomePage: React.FC<HomePageProps> = ({ onPageChange }) => {
  return (
    <div className="page-container hbcu-style">
      {/* Upcoming Events Banner */}
      <section className="upcoming-events-banner">
        <div className="container">
          <div className="banner-content">
            <div className="banner-icon">🎵</div>
            <div className="banner-text">
              <h3>New Upcoming Events!</h3>
              <p>Musical Extravaganza with Rathijit & Shreya + Durga Puja 2025</p>
            </div>
            <button 
              onClick={() => {
                const upcomingSection = document.querySelector('.upcoming-events-section');
                if (upcomingSection) {
                  upcomingSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
              }}
              className="banner-cta-btn"
            >
              View Events
            </button>
          </div>
        </div>
      </section>

      {/* Hero Section - HBCU Style with Video Background */}
      <section className="hbcu-hero-section">
        <div className="hero-video-container">
          <video 
            className="hero-video"
            autoPlay 
            muted 
            loop 
            playsInline
            poster="/assets/images/hero-poster.jpg"
          >
            <source src="/assets/videos/bengali-culture-hero.mp4" type="video/mp4" />
            <source src="/assets/videos/bengali-culture-hero.webm" type="video/webm" />
            Your browser does not support the video tag.
          </video>
          <div className="hero-video-overlay"></div>
        </div>
        <div className="container hero-content-hbcu">
          <div className="hero-logo-container-hbcu">
            <img 
              src="/assets/images/abha-logo.jpg" 
              alt="ABHA Logo" 
              className="hero-logo-hbcu"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
          </div>
          <h1 className="hero-title-hbcu">
            Association of Bengalis in Harrisburg Area
          </h1>
          <p className="hero-subtitle-hbcu">
            Preserving Bengali culture and fostering community bonds in Central Pennsylvania since 2010.
          </p>
          <div className="hero-bengali-text">
            হ্যারি‌সবর্গে বিগত দশক ধরে বাংলা সংস্কৃতি এবং ঐতিহ্য উদযাপন করার জন্য একটি সংগঠন
          </div>
          <div className="hero-cta-container">
            <a href="https://www.facebook.com/ABHAweb" target="_blank" rel="noopener noreferrer" className="btn-hbcu-primary">
              Join Our Community
            </a>
            <button onClick={() => onPageChange?.('events')} className="btn-hbcu-secondary">
              View Events
            </button>
          </div>
        </div>
        
        {/* Hero Stats - HBCU Style */}
        <div className="hero-stats-hbcu">
          <div className="container">
            <div className="stats-grid-hbcu">
              <div className="stat-item-hbcu">
                <div className="stat-number-hbcu">200+</div>
                <div className="stat-label-hbcu">Active Members</div>
              </div>
              <div className="stat-item-hbcu">
                <div className="stat-number-hbcu">10+</div>
                <div className="stat-label-hbcu">Years Strong</div>
              </div>
              <div className="stat-item-hbcu">
                <div className="stat-number-hbcu">4</div>
                <div className="stat-label-hbcu">Annual Events</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Statement Section */}
      <section className="hbcu-mission-section">
        <div className="container">
          <h2 className="hbcu-section-title">COMMUNITY FIRST</h2>
          <p className="hbcu-mission-text">
            Access authentic Bengali culture, traditions, and community connections adapted to modern life in Central Pennsylvania
          </p>
        </div>
      </section>

      {/* Upcoming Events Section - HBCU Style */}
      <section className="hbcu-event-section upcoming-events-section">
        <div className="container">
          <h2 className="hbcu-section-title-dark">Upcoming Events 2025</h2>
          <p className="hbcu-heritage-description">
            Join us for these exciting upcoming celebrations and community gatherings!
          </p>
          
          <div className="upcoming-events-grid">
            {/* Musical Extravaganza Event */}
            <div className="hbcu-event-container">
              <div className="hbcu-event-content">
                <div className="hbcu-event-badge">SEPTEMBER 26</div>
                <h3 className="hbcu-event-title">Musical Extravaganza</h3>
                <h4 className="hbcu-event-subtitle">with Rathijit & Shreya</h4>
                <p className="hbcu-event-description">
                  ABHA's 10th anniversary celebration featuring renowned Bengali artists in an unforgettable musical evening.
                </p>
                <div className="hbcu-event-details">
                  <div className="hbcu-event-detail">
                    <span className="hbcu-detail-label">Time:</span>
                    <span className="hbcu-detail-value">7:00 PM - 11:00 PM</span>
                  </div>
                  <div className="hbcu-event-detail">
                    <span className="hbcu-detail-label">Venue:</span>
                    <span className="hbcu-detail-value">Enola Fire Company, Enola PA</span>
                  </div>
                </div>
                <div className="hbcu-event-actions">
                  <a href="https://www.facebook.com/ABHAweb" target="_blank" rel="noopener noreferrer" className="btn-hbcu-primary">
                    Get Tickets
                  </a>
                  <button 
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      onPageChange?.('events', 'a-musical-extravaganza-with-rathijit-shreya');
                    }} 
                    className="btn-hbcu-secondary"
                  >
                    View Details
                  </button>
                </div>
              </div>
              <div className="hbcu-event-image">
                <img 
                  src="/assets/images/events/musical-extravaganza-2025.jpg" 
                  alt="Musical Extravaganza with Rathijit & Shreya" 
                  className="hbcu-event-poster"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
              </div>
            </div>

            {/* Durga Puja Event */}
            <div className="hbcu-event-container">
              <div className="hbcu-event-content">
                <div className="hbcu-event-badge">SEPTEMBER 27-28</div>
                <h3 className="hbcu-event-title">Durga Puja 2025</h3>
                <h4 className="hbcu-event-subtitle">শারদীয় দুর্গোৎসব ২০২৫</h4>
                <p className="hbcu-event-description">
                  Join ABHA for our annual celebration of tradition, culture, and community. Experience authentic Bengali festivities.
                </p>
                <div className="hbcu-event-details">
                  <div className="hbcu-event-detail">
                    <span className="hbcu-detail-label">Time:</span>
                    <span className="hbcu-detail-value">10:00 AM - 10:00 PM</span>
                  </div>
                  <div className="hbcu-event-detail">
                    <span className="hbcu-detail-label">Venue:</span>
                    <span className="hbcu-detail-value">Community Center, Harrisburg PA</span>
                  </div>
                </div>
                <div className="hbcu-event-actions">
                  <a href="https://www.facebook.com/ABHAweb" target="_blank" rel="noopener noreferrer" className="btn-hbcu-primary">
                    Get Tickets
                  </a>
                  <button 
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      onPageChange?.('events', 'durga-puja-2025');
                    }} 
                    className="btn-hbcu-secondary"
                  >
                    View Details
                  </button>
                </div>
              </div>
              <div className="hbcu-event-image">
                <img 
                  src="/assets/images/events/durga-puja.jpg" 
                  alt="Durga Puja 2025" 
                  className="hbcu-event-poster"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
              </div>
            </div>
          </div>
          
          <div className="section-cta-center">
            <button 
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onPageChange?.('events');
              }} 
              className="btn-hbcu-primary"
            >
              View All Events
            </button>
          </div>
        </div>
      </section>

      {/* Community Investment Section - HBCU Style */}
      <section className="hbcu-investment-section">
        <div className="container">
          <h2 className="hbcu-section-title-dark">Invest in Bengali heritage today</h2>
          <div className="hbcu-investment-grid">
            <div className="hbcu-investment-card">
              <h3 className="hbcu-card-title">For Families</h3>
              <p className="hbcu-card-description">
                Join a thriving community that celebrates Bengali culture and provides support for families settling in Central Pennsylvania.
              </p>
              <a href="https://www.facebook.com/ABHAweb" target="_blank" rel="noopener noreferrer" className="hbcu-card-link">
                Join Us
              </a>
            </div>
            <div className="hbcu-investment-card">
              <h3 className="hbcu-card-title">For Volunteers</h3>
              <p className="hbcu-card-description">
                Become part of a larger movement that preserves Bengali heritage and builds bridges between cultures.
              </p>
              <a href="https://www.facebook.com/ABHAweb" target="_blank" rel="noopener noreferrer" className="hbcu-card-link">
                Get Involved
              </a>
            </div>
            <div className="hbcu-investment-card">
              <h3 className="hbcu-card-title">For Students</h3>
              <p className="hbcu-card-description">
                Access Bengali language classes, cultural education, and connections that help preserve our beautiful traditions.
              </p>
              <a href="https://www.facebook.com/ABHAweb" target="_blank" rel="noopener noreferrer" className="hbcu-card-link">
                Learn More
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Heritage & Culture Section - HBCU Style */}
      <section className="hbcu-heritage-section">
        <div className="container">
          <h2 className="hbcu-section-title">Harnessing the legacy, community, and culture of Bengal</h2>
          <p className="hbcu-heritage-description">
            Our defining characteristics drive the foundation of our work, derived from decades of experience 
            preserving Bengali heritage in Central Pennsylvania.
          </p>
          <div className="hbcu-heritage-grid">
            <div className="hbcu-heritage-card">
              <div className="hbcu-heritage-icon">🎭</div>
              <h3 className="hbcu-heritage-title">Cultural Celebrations</h3>
              <p className="hbcu-heritage-text">
                Authentic Bengali festivals with traditional rituals, music, dance, and food that connect generations.
              </p>
            </div>
            <div className="hbcu-heritage-card">
              <div className="hbcu-heritage-icon">👨‍👩‍👧‍👦</div>
              <h3 className="hbcu-heritage-title">Family Community</h3>
              <p className="hbcu-heritage-text">
                A welcoming space for Bengali families to connect, support each other, and build lasting friendships.
              </p>
            </div>
            <div className="hbcu-heritage-card">
              <div className="hbcu-heritage-icon">📚</div>
              <h3 className="hbcu-heritage-title">Language & Heritage</h3>
              <p className="hbcu-heritage-text">
                Bengali language classes and cultural education programs to preserve our traditions for future generations.
              </p>
            </div>
            <div className="hbcu-heritage-card">
              <div className="hbcu-heritage-icon">🍛</div>
              <h3 className="hbcu-heritage-title">Food & Fellowship</h3>
              <p className="hbcu-heritage-text">
                Authentic Bengali cuisine at events where recipes and stories are shared across generations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline Section - HBCU Style */}
      <section className="hbcu-timeline-section">
        <div className="container">
          <h2 className="hbcu-section-title-dark">THE FUTURE OF BENGALI HERITAGE IS NOW</h2>
          <p className="hbcu-timeline-description">
            ABHA continues to grow and evolve, preserving Bengali culture while embracing modern community building.
          </p>
          <div className="hbcu-timeline-grid">
            <div className="hbcu-timeline-item">
              <div className="hbcu-timeline-year">2010</div>
              <div className="hbcu-timeline-title">Foundation</div>
              <div className="hbcu-timeline-description">
                Established ABHA with founding Bengali families in Harrisburg area
              </div>
            </div>
            <div className="hbcu-timeline-item">
              <div className="hbcu-timeline-year">2015</div>
              <div className="hbcu-timeline-title">Growth</div>
              <div className="hbcu-timeline-description">
                Expanded to 100+ members with regular cultural events and language classes
              </div>
            </div>
            <div className="hbcu-timeline-item">
              <div className="hbcu-timeline-year">2025</div>
              <div className="hbcu-timeline-title">Future</div>
              <div className="hbcu-timeline-description">
                Building digital community and reaching Bengali families across Central Pennsylvania
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section - HBCU Style */}
      <section className="hbcu-cta-section">
        <div className="container">
          <h2 className="hbcu-cta-title">Join the ABHA Movement</h2>
          <p className="hbcu-cta-description">
            Cultural preservation begins with each of us—and we can't do it without your help.<br />
            Become a champion for Bengali heritage.
          </p>
          <div className="hbcu-cta-buttons">
            <a href="https://www.facebook.com/ABHAweb" target="_blank" rel="noopener noreferrer" className="btn-hbcu-primary">
              Join Our Community
            </a>
            <button onClick={() => onPageChange?.('events')} className="btn-hbcu-secondary">
              View Events
            </button>
          </div>
          <div className="hbcu-cta-quote">
            <p className="hbcu-quote-text">
              "We can't simply believe in preserving our heritage. We have to actively create spaces for it to flourish."
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
