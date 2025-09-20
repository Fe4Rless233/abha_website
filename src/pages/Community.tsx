import React from 'react';
import CountUp from '../components/ui/CountUp';

interface CommunityPageProps {
  onPageChange?: (page: string) => void;
}

const CommunityPage: React.FC<CommunityPageProps> = ({ onPageChange }) => {
  return (
    <div className="page-container hbcu-style">
      {/* Hero Section - HBCU Style */}
      <section
        className="hbcu-hero-section"
        style={{
          backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('/assets/images/community-hero.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundBlendMode: 'multiply',
          position: 'relative'
        }}
      >
        {/* Fallback image layer in case CSS background fails to load */}
        <img
          src="/assets/images/community-hero.jpg"
          alt="Community hero background"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0, pointerEvents: 'none' }}
          onLoad={(e) => { e.currentTarget.style.display = 'none'; }}
          onError={(e) => { e.currentTarget.style.opacity = '0.2'; }}
        />
        <div className="container hero-content-hbcu">
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
          <h1 className="hero-title-hbcu">Our Community</h1>
          <p className="hero-subtitle-hbcu">
            ABHA is more than an association; it's a family. We provide a supportive and engaging environment for all members.
          </p>
          <div className="hero-bengali-text">
            "একা আমরা খুব কমই করতে পারি; একসাথে আমরা অনেক কিছু করতে পারি।" - হেলেন কেলার
          </div>
        </div>
        
        {/* Hero Stats */}
        <div className="hero-stats-hbcu">
          <div className="container">
            <div className="stats-grid-hbcu">
              <div className="stat-item-hbcu">
                <div className="stat-number-hbcu"><CountUp end={50} suffix="+" duration={750} /></div>
                <div className="stat-label-hbcu">Active Volunteers</div>
              </div>
              <div className="stat-item-hbcu">
                <div className="stat-number-hbcu"><CountUp end={10} suffix="+" duration={750} /></div>
                <div className="stat-label-hbcu">Support Programs</div>
              </div>
              <div className="stat-item-hbcu">
                <div className="stat-number-hbcu"><CountUp end={100} suffix="+" duration={750} /></div>
                <div className="stat-label-hbcu">Families Helped</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Statement Section */}
      <section className="hbcu-mission-section">
        <div className="container">
          <h2 className="hbcu-section-title">BUILDING CONNECTIONS</h2>
          <p className="hbcu-mission-text">
            We offer a comprehensive range of programs and services designed to build meaningful connections and support the well-being of our growing community.
          </p>
        </div>
      </section>

      {/* Programs Section - HBCU Style */}
      <section className="hbcu-investment-section">
        <div className="container">
          <h2 className="hbcu-section-title-dark">How we support our members</h2>
          <div className="hbcu-investment-grid">
            <div className="hbcu-investment-card">
              <h3 className="hbcu-card-title">New Family Welcome</h3>
              <p className="hbcu-card-description">
                We help new families from Bengal settle into the Harrisburg area with guidance, resources, and a warm welcome.
              </p>
              <a href="https://www.facebook.com/ABHAweb" target="_blank" rel="noopener noreferrer" className="hbcu-card-link">
                Get Support
              </a>
            </div>
            <div className="hbcu-investment-card">
              <h3 className="hbcu-card-title">Community Support</h3>
              <p className="hbcu-card-description">
                Our programs include Natok (drama) performances and drawing competitions that showcase creativity and cultural expression.
              </p>
              <a href="https://www.facebook.com/ABHAweb" target="_blank" rel="noopener noreferrer" className="hbcu-card-link">
                Learn More
              </a>
            </div>
            <div className="hbcu-investment-card">
              <h3 className="hbcu-card-title">Professional Network</h3>
              <p className="hbcu-card-description">
                We facilitate networking events to help professionals connect and grow their careers in Central Pennsylvania.
              </p>
              <a href="https://www.facebook.com/ABHAweb" target="_blank" rel="noopener noreferrer" className="hbcu-card-link">
                Network
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Additional Programs - HBCU Style */}
      <section className="hbcu-heritage-section">
        <div className="container">
          <h2 className="hbcu-section-title">Community partnerships</h2>
          <p className="hbcu-heritage-description">
            We work with local organizations to strengthen our community and support those in need throughout Central Pennsylvania.
          </p>
          <div className="hbcu-heritage-grid">
            <div className="hbcu-heritage-card">
              <div className="hbcu-heritage-icon">🍲</div>
              <h3 className="hbcu-heritage-title">PA Food Bank Support</h3>
              <p className="hbcu-heritage-text">
                We partner with local food banks to support families in need and organize food drives for the broader Central PA community.
              </p>
            </div>
            <div className="hbcu-heritage-card">
              <div className="hbcu-heritage-icon">🏪</div>
              <h3 className="hbcu-heritage-title">Local Business Network</h3>
              <p className="hbcu-heritage-text">
                Supporting local small businesses and connecting community members with entrepreneurial opportunities in the area.
              </p>
            </div>
            <div className="hbcu-heritage-card">
              <div className="hbcu-heritage-icon">�</div>
              <h3 className="hbcu-heritage-title">Volunteer Opportunities</h3>
              <p className="hbcu-heritage-text">
                Get involved and make a difference by volunteering for our events and community initiatives.
              </p>
            </div>
            <div className="hbcu-heritage-card">
              <div className="hbcu-heritage-icon">💬</div>
              <h3 className="hbcu-heritage-title">Community Forums</h3>
              <p className="hbcu-heritage-text">
                Regular meetings and discussion groups where members can share experiences and build relationships.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section - HBCU Style */}
      <section className="hbcu-cta-section">
        <div className="container">
          <h2 className="hbcu-cta-title">Become Part of Our Family</h2>
          <p className="hbcu-cta-description">
            Join a community that supports, celebrates, and grows together.<br />
            Your participation makes our community stronger and more vibrant.
          </p>
          <div className="hbcu-cta-buttons">
            <button onClick={() => onPageChange && onPageChange('contact')} className="btn-hbcu-primary">
              Join Community
            </button>
            <button onClick={() => onPageChange && onPageChange('contact')} className="btn-hbcu-secondary">
              Volunteer
            </button>
          </div>
          <div className="hbcu-cta-quote">
            <p className="hbcu-quote-text">
              "Together we are stronger, together we preserve our heritage, together we build our future."
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CommunityPage;
