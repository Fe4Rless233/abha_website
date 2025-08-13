import React, { useState, useEffect } from 'react';
import CountUp from '../components/ui/CountUp';
import LoadingSpinner from '../components/ui/LoadingSpinner';

interface HomePageProps {
  onPageChange?: (page: string, eventToExpand?: string) => void;
}

const HomePage: React.FC<HomePageProps> = ({ onPageChange }) => {
  const [videoLoaded, setVideoLoaded] = useState(false);

  // Fallback timeout in case video load stalls
  useEffect(() => {
    const timeout = setTimeout(() => {
      setVideoLoaded(true); // allow content even if video not fully loaded
    }, 4000);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="page-container hbcu-style">
      {/* Hero Section - HBCU Style with Video Background */}
      <section className="hbcu-hero-section">
        <div className="hero-video-container fade-in">
          {!videoLoaded && (
            <div className="hero-video-loading">
              <LoadingSpinner color="white" size="lg" />
              <span className="loading-text">Loading cultural experience…</span>
            </div>
          )}
          <video 
            className={`hero-video ${videoLoaded ? 'visible' : 'hidden'}`}
            autoPlay 
            muted 
            loop 
            playsInline
            poster="/assets/images/hero-poster.jpg"
            onLoadedData={() => setVideoLoaded(true)}
          >
            <source src="/assets/videos/bengali-culture-hero.mp4" type="video/mp4" />
            <source src="/assets/videos/bengali-culture-hero.webm" type="video/webm" />
            Your browser does not support the video tag.
          </video>
          <div className="hero-video-overlay"></div>
        </div>
  <div className="container hero-content-hbcu slide-up">
          <div className="hero-logo-container-hbcu">
            <img 
              src="/assets/images/abha-logo.png" 
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
            Bringing the Spirit of Bengal to Central Pennsylvania. We believe that culture is the thread that binds us—not only to our roots but to each other.
          </p>
          <div className="hero-bengali-text">
            সংস্কৃতিতে ঐক্য। সম্প্রদায়ে শক্তি। উদযাপনে আনন্দ
          </div>
          <div className="hero-cta-container">
            <button onClick={() => onPageChange?.('contact')} className="btn-hbcu-primary">
              Contact Us
            </button>
            <button onClick={() => onPageChange?.('events')} className="btn-hbcu-secondary">
              View Events
            </button>
          </div>
        </div>
        
        {/* Hero Stats - HBCU Style */}
  <div className="hero-stats-hbcu fade-in">
          <div className="container">
            <div className="stats-grid-hbcu">
              <div className="stat-item-hbcu">
    <div className="stat-number-hbcu"><CountUp end={200} suffix="+" duration={900} /></div>
                <div className="stat-label-hbcu">Active Members</div>
              </div>
              <div className="stat-item-hbcu">
    <div className="stat-number-hbcu"><CountUp end={10} suffix="+" duration={900} /></div>
                <div className="stat-label-hbcu">Years Strong</div>
              </div>
              <div className="stat-item-hbcu">
    <div className="stat-number-hbcu"><CountUp end={4} duration={700} /></div>
                <div className="stat-label-hbcu">Annual Events</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Statement Section */}
      <section className="hbcu-mission-section">
        <div className="container">
          <h2 className="hbcu-section-title">UNITY IN CULTURE. STRENGTH IN COMMUNITY. JOY IN CELEBRATION.</h2>
          <p className="hbcu-mission-text">
            Join us in honoring the rich tapestry of Bengali heritage—music, dance, literature, and culinary arts. Together, we embrace our roots and illuminate our future.
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
              <div className="hbcu-event-image">
                <img 
                  src="/assets/images/events/a-musical-extravaganza-with-rathijit-and-shreya.jpg" 
                  alt="Musical Extravaganza with Rathijit & Shreya" 
                  className="hbcu-event-poster"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
              </div>
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
                  <button 
                    onClick={() => onPageChange?.('contact')}
                    className="btn-hbcu-primary"
                  >
                    Get Tickets
                  </button>
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
            </div>

            {/* Durga Puja Event */}
            <div className="hbcu-event-container">
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
                  <button 
                    onClick={() => onPageChange?.('contact')}
                    className="btn-hbcu-primary"
                  >
                    Get Tickets
                  </button>
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
              <button onClick={() => onPageChange?.('contact')} className="hbcu-card-link">
                Contact Us
              </button>
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
              <div className="hbcu-heritage-icon">🎭</div>
              <h3 className="hbcu-heritage-title">Natok & Drama</h3>
              <p className="hbcu-heritage-text">
                Engaging drama performances and drawing competitions that showcase creativity and preserve our storytelling traditions.
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
                Expanded to 100+ members with regular cultural events
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
            <button onClick={() => onPageChange?.('contact')} className="btn-hbcu-primary">
              Contact Us
            </button>
            <button onClick={() => onPageChange?.('events')} className="btn-hbcu-secondary">
              View Events
            </button>
          </div>
          <div className="hbcu-cta-quote">
            <p className="hbcu-quote-text">
              "We believe that culture is the thread that binds us—not only to our roots but to each other."
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
