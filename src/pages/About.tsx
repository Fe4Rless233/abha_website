import React from 'react';
import CountUp from '../components/ui/CountUp';

interface AboutPageProps {
  onPageChange?: (page: string) => void;
}

const AboutPage: React.FC<AboutPageProps> = ({ onPageChange }) => {
  return (
    <div className="page-container hbcu-style">
      {/* Hero Section - HBCU Style */}
      <section className="hbcu-hero-section">
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
          <h1 className="hero-title-hbcu">About ABHA</h1>
          <p className="hero-subtitle-hbcu">
            Preserving Bengali Heritage and Fostering Community in Pennsylvania's Capital Region since 2010.
          </p>
          <div className="hero-bengali-text">
            হ্যারিসবার্গ শহরে বিগত দশকের ধরে বাংলা সংস্কৃতি এবং ঐতিহ্য উদযাপন করার জন্য একটি সংগঠন
          </div>
        </div>
        
        {/* Hero Stats */}
        <div className="hero-stats-hbcu">
          <div className="container">
            <div className="stats-grid-hbcu">
              <div className="stat-item-hbcu">
                <div className="stat-number-hbcu"><CountUp end={10} suffix="+" duration={800} /></div>
                <div className="stat-label-hbcu">Years of Service</div>
              </div>
              <div className="stat-item-hbcu">
                <div className="stat-number-hbcu"><CountUp end={200} suffix="+" duration={800} /></div>
                <div className="stat-label-hbcu">Family Members</div>
              </div>
              <div className="stat-item-hbcu">
                <div className="stat-number-hbcu"><CountUp end={50} suffix="+" duration={800} /></div>
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
            At ABHA, we are devoted to preserving, celebrating, and sharing the vibrant legacy of Bengali culture. Through inclusive community engagement, we foster appreciation for our rich traditions in literature, music, art, and Natok (drama). We empower future generations to embrace their heritage while promoting cross-cultural dialogue, unity, and creative expression.
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
              <button onClick={() => onPageChange && onPageChange('contact')} className="hbcu-card-link">
                Join Community
              </button>
            </div>
            <div className="hbcu-investment-card">
              <h3 className="hbcu-card-title">Cultural Programs</h3>
              <p className="hbcu-card-description">
                We organize Natok (drama) performances and drawing competitions to teach our youth about Bengali history, literature, and arts.
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
              <div className="hbcu-heritage-icon">🌟</div>
              <h3 className="hbcu-heritage-title">Cultural Focus</h3>
              <p className="hbcu-heritage-text">
                Our cultural programs including Natok (drama) and drawing competitions ensure that Bengali traditions are passed down to future generations.
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

      {/* 2026 Operational Committee Section */}
      <section className="announcement-section" style={{ background: '#fafafa' }}>
        <div className="container">
          <h2 className="hbcu-section-title">2026 ABHA Operational Committee</h2>
          <div className="announcement-card" style={{ textAlign: 'left' }}>
             <div className="announcement-body">
                <p className="announcement-greeting">Dear Friends,</p>
                <p className="announcement-text">
                  As we step into 2026, we are delighted to welcome our 2026 Operational Committee members.
                </p>
                
                <h3 className="committee-title" style={{ marginTop: '2rem', borderBottom: '2px solid #f0f0f0', paddingBottom: '0.5rem' }}>Committee Members</h3>
                <ul className="committee-list">
                  {[
                    'Shatarupa Podder',
                    'Mahua Bhattacharya',
                    'Sriya Chattopadhyay',
                    'Somosree Dutta Gupta',
                    'Ishana Bandyopadhyay',
                    'Rahul Roy',
                    'Soumya (Kanti) Das',
                    'Kausik Bandyopadhyay'
                  ].map(name => (
                    <li key={name} className="committee-member" style={{ fontSize: '1.1rem' }}>
                      <span className="committee-bullet">✦</span> {name}
                    </li>
                  ))}
                </ul>

                <div className="webmaster-note">
                   <strong>Web Master:</strong> Aklavya Kumar
                </div>

                <p className="announcement-text" style={{ marginTop: '2rem' }}>
                  Collective experience, dedication, and insights of the Operational Committee members will be invaluable as we work together to drive our initiatives forward and achieve our goals this year. This committee is not just about planning and execution—it’s about collaboration, innovation, and making a positive impact on our community.
                </p>
                
                <div className="announcement-event-alert" style={{ background: 'transparent', padding: '1.5rem 0 0 0' }}>
                  <p style={{ fontStyle: 'italic', fontWeight: 'normal', color: '#666' }}>We will soon publish our event list for the year.</p>
                </div>

                <div className="announcement-footer">
                  <p className="announcement-signature">Sincerely,</p>
                  <p className="announcement-sign-name">ABHA Operational Committee</p>
                </div>
                
                <div className="announcement-links" style={{ background: 'transparent', marginTop: '2rem', border: 'none' }}>
                  Please visit <a href="http://abhaweb.org" className="link-abha">abhaweb.org</a> and ABHA on Facebook for all community events
                </div>
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
            <button onClick={() => onPageChange && onPageChange('contact')} className="btn-hbcu-primary">
              Join Our Community
            </button>
            <button onClick={() => onPageChange && onPageChange('contact')} className="btn-hbcu-secondary">
              Learn More
            </button>
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
