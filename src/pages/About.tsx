import React from 'react';

const AboutPage: React.FC = () => {
  return (
    <div className="page-container hbcu-style">
      {/* Hero Section - HBCU Style */}
      <section className="hbcu-hero-section">
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
          <h1 className="hero-title-hbcu">About ABHA</h1>
          <p className="hero-subtitle-hbcu">
            Preserving Bengali Heritage and Fostering Community in Pennsylvania's Capital Region since 2010.
          </p>
          <div className="hero-bengali-text">
            "আমাদের সংস্কৃতি আমাদের পরিচয়"
          </div>
        </div>
        
        {/* Hero Stats */}
        <div className="hero-stats-hbcu">
          <div className="container">
            <div className="stats-grid-hbcu">
              <div className="stat-item-hbcu">
                <div className="stat-number-hbcu">10+</div>
                <div className="stat-label-hbcu">Years of Service</div>
              </div>
              <div className="stat-item-hbcu">
                <div className="stat-number-hbcu">200+</div>
                <div className="stat-label-hbcu">Family Members</div>
              </div>
              <div className="stat-item-hbcu">
                <div className="stat-number-hbcu">50+</div>
                <div className="stat-label-hbcu">Events Hosted</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Statement Section */}
      <section className="hbcu-mission-section">
        <div className="container">
          <h2 className="hbcu-section-title">OUR MISSION</h2>
          <p className="hbcu-mission-text">
            The Association of Bengalis in Harrisburg Area (ABHA) is dedicated to preserving, promoting, and celebrating Bengali culture while serving as a bridge between tradition and modernity in Pennsylvania's capital region.
          </p>
        </div>
      </section>

      {/* Values Section - HBCU Style */}
      <section className="hbcu-investment-section">
        <div className="container">
          <h2 className="hbcu-section-title-dark">Building bridges between tradition and modernity</h2>
          <div className="hbcu-investment-grid">
            <div className="hbcu-investment-card">
              <h3 className="hbcu-card-title">Cultural Preservation</h3>
              <p className="hbcu-card-description">
                We organize and celebrate traditional Bengali festivals and cultural events to keep our heritage alive for future generations.
              </p>
              <a href="https://www.facebook.com/ABHAweb" target="_blank" rel="noopener noreferrer" className="hbcu-card-link">
                Our Events
              </a>
            </div>
            <div className="hbcu-investment-card">
              <h3 className="hbcu-card-title">Community Building</h3>
              <p className="hbcu-card-description">
                Our goal is to foster unity and create a strong support network for all Bengali families in the greater Harrisburg area.
              </p>
              <a href="https://www.facebook.com/ABHAweb" target="_blank" rel="noopener noreferrer" className="hbcu-card-link">
                Join Community
              </a>
            </div>
            <div className="hbcu-investment-card">
              <h3 className="hbcu-card-title">Educational Programs</h3>
              <p className="hbcu-card-description">
                We offer language classes and educational workshops to teach our youth about Bengali history, literature, and arts.
              </p>
              <a href="https://www.facebook.com/ABHAweb" target="_blank" rel="noopener noreferrer" className="hbcu-card-link">
                Learn More
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Heritage Section - HBCU Style */}
      <section className="hbcu-heritage-section">
        <div className="container">
          <h2 className="hbcu-section-title">What drives our community forward</h2>
          <p className="hbcu-heritage-description">
            Our defining values and principles guide every aspect of our work, creating a foundation that connects generations and builds lasting relationships.
          </p>
          <div className="hbcu-heritage-grid">
            <div className="hbcu-heritage-card">
              <div className="hbcu-heritage-icon">🏛️</div>
              <h3 className="hbcu-heritage-title">Rich History</h3>
              <p className="hbcu-heritage-text">
                Founded in 2010, ABHA has been a cornerstone of Bengali culture in Central Pennsylvania for over a decade.
              </p>
            </div>
            <div className="hbcu-heritage-card">
              <div className="hbcu-heritage-icon">🤝</div>
              <h3 className="hbcu-heritage-title">Strong Network</h3>
              <p className="hbcu-heritage-text">
                We've built a supportive community that helps families integrate while maintaining their cultural identity.
              </p>
            </div>
            <div className="hbcu-heritage-card">
              <div className="hbcu-heritage-icon">🎓</div>
              <h3 className="hbcu-heritage-title">Education Focus</h3>
              <p className="hbcu-heritage-text">
                Our educational programs ensure that Bengali language and culture are passed down to future generations.
              </p>
            </div>
            <div className="hbcu-heritage-card">
              <div className="hbcu-heritage-icon">🌟</div>
              <h3 className="hbcu-heritage-title">Vision Forward</h3>
              <p className="hbcu-heritage-text">
                We continuously evolve to meet the changing needs of our community while preserving our core values.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section - HBCU Style */}
      <section className="hbcu-cta-section">
        <div className="container">
          <h2 className="hbcu-cta-title">Join the ABHA Family</h2>
          <p className="hbcu-cta-description">
            Be part of a vibrant community that celebrates Bengali heritage while building bridges to the future.<br />
            Together, we can preserve our culture for generations to come.
          </p>
          <div className="hbcu-cta-buttons">
            <a href="https://www.facebook.com/ABHAweb" target="_blank" rel="noopener noreferrer" className="btn-hbcu-primary">
              Join Our Community
            </a>
            <a href="https://www.facebook.com/ABHAweb" target="_blank" rel="noopener noreferrer" className="btn-hbcu-secondary">
              Learn More
            </a>
          </div>
          <div className="hbcu-cta-quote">
            <p className="hbcu-quote-text">
              "Our strength lies in our unity, our pride in our heritage, and our commitment to building a better future."
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
