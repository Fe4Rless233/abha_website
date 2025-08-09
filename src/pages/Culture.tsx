import React from 'react';

const CulturePage: React.FC = () => {
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
          <h1 className="hero-title-hbcu">Our Rich Culture</h1>
          <p className="hero-subtitle-hbcu">
            Exploring the vibrant tapestry of Bengali arts, traditions, and festivals that we celebrate in Harrisburg.
          </p>
          <div className="hero-bengali-text">
            সংস্কৃতিই আমাদের অহংকার
          </div>
        </div>
        
        {/* Hero Stats */}
        <div className="hero-stats-hbcu">
          <div className="container">
            <div className="stats-grid-hbcu">
              <div className="stat-item-hbcu">
                <div className="stat-number-hbcu">4</div>
                <div className="stat-label-hbcu">Cultural Events</div>
              </div>
              <div className="stat-item-hbcu">
                <div className="stat-number-hbcu">4</div>
                <div className="stat-label-hbcu">Major Festivals</div>
              </div>
              <div className="stat-item-hbcu">
                <div className="stat-number-hbcu">100+</div>
                <div className="stat-label-hbcu">Artists & Performers</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Statement Section */}
      <section className="hbcu-mission-section">
        <div className="container">
          <h2 className="hbcu-section-title">PRESERVING HERITAGE</h2>
          <p className="hbcu-mission-text">
            Our cultural identity is expressed through a diverse range of art forms, culinary traditions, and community celebrations that connect us to our Bengali roots while enriching our adopted home.
          </p>
        </div>
      </section>

      {/* Cultural Elements Section - HBCU Style */}
      <section className="hbcu-investment-section">
        <div className="container">
          <h2 className="hbcu-section-title-dark">Pillars of Bengali heritage</h2>
          <div className="hbcu-investment-grid">
            <div className="hbcu-investment-card">
              <h3 className="hbcu-card-title">Performing Arts</h3>
              <p className="hbcu-card-description">
                From classical dance to folk music, we celebrate the vibrant artistic expressions of Bengal through performances and workshops.
              </p>
              <a href="https://www.facebook.com/ABHAweb" target="_blank" rel="noopener noreferrer" className="hbcu-card-link">
                View Performances
              </a>
            </div>
            <div className="hbcu-investment-card">
              <h3 className="hbcu-card-title">Culinary Traditions</h3>
              <p className="hbcu-card-description">
                Sharing the unique flavors of Bengali cuisine is a cornerstone of our community gatherings and cultural celebrations.
              </p>
              <a href="https://www.facebook.com/ABHAweb" target="_blank" rel="noopener noreferrer" className="hbcu-card-link">
                Explore Cuisine
              </a>
            </div>
            <div className="hbcu-investment-card">
              <h3 className="hbcu-card-title">Literature & Poetry</h3>
              <p className="hbcu-card-description">
                We honor the rich literary history of Bengal, from Rabindranath Tagore to modern contemporary writers and poets.
              </p>
              <a href="https://www.facebook.com/ABHAweb" target="_blank" rel="noopener noreferrer" className="hbcu-card-link">
                Literary Events
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Heritage Section - HBCU Style */}
      <section className="hbcu-heritage-section">
        <div className="container">
          <h2 className="hbcu-section-title">Celebrating our cultural traditions</h2>
          <p className="hbcu-heritage-description">
            Each aspect of our heritage contributes to the rich tapestry of Bengali culture, creating meaningful connections between past and present.
          </p>
          <div className="hbcu-heritage-grid">
            <div className="hbcu-heritage-card">
              <div className="hbcu-heritage-icon">🎭</div>
              <h3 className="hbcu-heritage-title">Festivals & Celebrations</h3>
              <p className="hbcu-heritage-text">
                Major festivals like Durga Puja, Poila Boishakh, and Saraswati Puja connect us to our spiritual and cultural roots.
              </p>
            </div>
            <div className="hbcu-heritage-card">
              <div className="hbcu-heritage-icon">🎵</div>
              <h3 className="hbcu-heritage-title">Music & Dance</h3>
              <p className="hbcu-heritage-text">
                Rabindra Sangeet, folk songs, and classical dances are integral parts of our cultural expression and identity.
              </p>
            </div>
            <div className="hbcu-heritage-card">
              <div className="hbcu-heritage-icon">🖼️</div>
              <h3 className="hbcu-heritage-title">Arts & Crafts</h3>
              <p className="hbcu-heritage-text">
                Traditional Bengali arts, handicrafts, and creative expressions showcase the artistic heritage of our community.
              </p>
            </div>
            <div className="hbcu-heritage-card">
              <div className="hbcu-heritage-icon">📖</div>
              <h3 className="hbcu-heritage-title">Language & Stories</h3>
              <p className="hbcu-heritage-text">
                Bengali language classes and storytelling sessions help preserve our linguistic heritage for future generations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section - HBCU Style */}
      <section className="hbcu-cta-section">
        <div className="container">
          <h2 className="hbcu-cta-title">Experience Bengali Culture</h2>
          <p className="hbcu-cta-description">
            Join us in celebrating the beauty and richness of Bengali heritage through our cultural events and programs.<br />
            Discover the traditions that make our community unique and vibrant.
          </p>
          <div className="hbcu-cta-buttons">
            <a href="https://www.facebook.com/ABHAweb" target="_blank" rel="noopener noreferrer" className="btn-hbcu-primary">
              Join Cultural Events
            </a>
            <a href="https://www.facebook.com/ABHAweb" target="_blank" rel="noopener noreferrer" className="btn-hbcu-secondary">
              Learn Bengali
            </a>
          </div>
          <div className="hbcu-cta-quote">
            <p className="hbcu-quote-text">
              "Culture is the bridge between our past and future, connecting hearts across generations."
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CulturePage;
