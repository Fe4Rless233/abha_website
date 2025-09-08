import React, { useEffect } from 'react';
import CountUp from '../components/ui/CountUp';
import HorizontalInfiniteStrip from '../components/ui/HorizontalInfiniteStrip';
import Gallery from '../components/Gallery';
import { galleryItems } from '../data/galleryItems';

interface CulturePageProps {
  onPageChange?: (page: string) => void;
}

const CulturePage: React.FC<CulturePageProps> = ({ onPageChange }) => {
  // Test with a few sample items first to debug
  const testGalleryItems = [
    { type: 'image', src: '/assets/images/abha-logo.png', alt: 'Test Image 1' },
    { type: 'image', src: '/assets/images/community-hero.jpg', alt: 'Test Image 2' },
  ];
  
  // Log to see if items are loading
  console.log('Gallery items count:', galleryItems.length);
  console.log('Test items:', testGalleryItems);
  console.log('Sample gallery item:', galleryItems[0]);
  
  // Test if images load at all
  useEffect(() => {
    const testImg = new Image();
    testImg.onload = () => console.log('✅ Basic image loads successfully');
    testImg.onerror = () => console.error('❌ Basic image failed to load');
    testImg.src = '/assets/images/abha-logo.png';
  }, []);
  
  // Dynamically generated galleryItems array for all images and videos in /gallery/media
  // galleryItems is now imported from an auto-generated file
  return (
    <div className="page-container hbcu-style">
      {/* Hero Section - HBCU Style */}
      <section className="hbcu-hero-section">
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
          <h1 className="hero-title-hbcu">Our Rich Culture</h1>
          <p className="hero-subtitle-hbcu">
            Exploring the vibrant tapestry of Bengali arts, traditions, and festivals that we celebrate in Harrisburg.
          </p>
          <div className="hero-bengali-text">
            আমাদের সংস্কৃতি আমাদের অহংকার
          </div>
        </div>
        
        {/* Hero Stats */}
  <div className="hero-stats-hbcu fade-in">
          <div className="container">
            <div className="stats-grid-hbcu">
              <div className="stat-item-hbcu">
    <div className="stat-number-hbcu"><CountUp end={4} duration={700} /></div>
                <div className="stat-label-hbcu">Cultural Events</div>
              </div>
              <div className="stat-item-hbcu">
    <div className="stat-number-hbcu"><CountUp end={4} duration={700} /></div>
                <div className="stat-label-hbcu">Major Festivals</div>
              </div>
              <div className="stat-item-hbcu">
    <div className="stat-number-hbcu"><CountUp end={100} suffix="+" duration={900} /></div>
                <div className="stat-label-hbcu">Artists & Performers</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Horizontal Gallery Strip + View All */}
      <section className="hbcu-heritage-section" style={{ paddingTop: '2.2rem', paddingBottom: '2.2rem' }}>
        <div className="container" style={{ maxWidth: 1140 }}>
          <h2 className="hbcu-section-title">Cultural Moments</h2>
          <p className="hbcu-heritage-description" style={{ marginBottom: '0.85rem' }}>
            A glimpse into our performances, festivals and community life. Swipe left or right.
          </p>
          
          {/* Debug: Direct image test */}
          <div style={{ marginBottom: '1rem', padding: '1rem', background: '#f0f0f0', borderRadius: '8px' }}>
            <h3>Debug: Direct Image Test</h3>
            <img 
              src="/assets/images/abha-logo.png" 
              alt="Direct test" 
              style={{ width: '100px', height: '100px', objectFit: 'cover' }}
              onLoad={() => console.log('✅ Direct JSX image loaded')}
              onError={() => console.error('❌ Direct JSX image failed')}
            />
            <p>Gallery items count: {galleryItems.length}</p>
            <p>Test items count: {testGalleryItems.length}</p>
          </div>
          
          <HorizontalInfiniteStrip items={testGalleryItems as any} height={130} gap={10} />
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '0.9rem' }}>
            <Gallery items={testGalleryItems as any} triggerLabel="View All (Grid)" hideList triggerStyle={{ color: '#000' }} />
          </div>
        </div>
      </section>

      {/* Mission Statement Section */}
      <section className="hbcu-mission-section">
        <div className="container">
          <h2 className="hbcu-section-title">CELEBRATING BENGALI HERITAGE & CULTURE</h2>
          <p className="hbcu-mission-text">
            Rooted in love for Bengali heritage, our mission is to bring people together through celebration and understanding. We nurture a welcoming space for all to experience the richness of Bengali art, music, Natok (drama), and values—strengthening bonds and inspiring pride across our local community.
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
              <div className="hbcu-heritage-icon">📖</div>
              <h3 className="hbcu-heritage-title">Arts & Magazines</h3>
              <p className="hbcu-heritage-text">
                Traditional Bengali arts, handicrafts, and our Sheuli magazine showcase the artistic heritage and literary creativity of our community.
              </p>
              <div style={{ marginTop: '1rem' }}>
                <div className="sheuli-links fade-in" style={{display:'flex',flexDirection:'column',gap:'0.4rem'}}>
                  <a 
                    href="/assets/images/documents/Sheuli-2023.pdf" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    style={{ 
                      color: 'var(--primary-red)', 
                      textDecoration: 'none', 
                      fontWeight: '700',
                      fontSize: '1.05rem'
                    }}
                  >
                    📖 Sheuli 2023
                  </a>
                </div>
              </div>
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
            <button onClick={() => onPageChange && onPageChange('contact')} className="btn-hbcu-primary">
              Join Cultural Events
            </button>
            <button onClick={() => onPageChange && onPageChange('contact')} className="btn-hbcu-secondary">
              Experience Natok
            </button>
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
