import React from 'react';

const ContactPage: React.FC = () => {
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
          <h1 className="hero-title-hbcu">Get In Touch</h1>
          <p className="hero-subtitle-hbcu">
            We'd love to hear from you. Whether you have questions about our events, membership, or anything else, our team is ready to help.
          </p>
          <div className="hero-bengali-text">
            "যোগাযোগ করুন আমাদের সাথে"
          </div>
        </div>
        
        {/* Hero Stats */}
        <div className="hero-stats-hbcu">
          <div className="container">
            <div className="stats-grid-hbcu">
              <div className="stat-item-hbcu">
                <div className="stat-number-hbcu">24/7</div>
                <div className="stat-label-hbcu">Community Support</div>
              </div>
              <div className="stat-item-hbcu">
                <div className="stat-number-hbcu">15+</div>
                <div className="stat-label-hbcu">Board Members</div>
              </div>
              <div className="stat-item-hbcu">
                <div className="stat-number-hbcu">100%</div>
                <div className="stat-label-hbcu">Response Rate</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Statement Section */}
      <section className="hbcu-mission-section">
        <div className="container">
          <h2 className="hbcu-section-title">CONNECT WITH US</h2>
          <p className="hbcu-mission-text">
            Your questions, suggestions, and feedback help us serve our community better. Reach out to us through Facebook or send us a message below.
          </p>
        </div>
      </section>

      {/* Contact Options - HBCU Style */}
      <section className="hbcu-investment-section">
        <div className="container">
          <h2 className="hbcu-section-title-dark">Ways to connect with ABHA</h2>
          <div className="hbcu-investment-grid">
            <div className="hbcu-investment-card">
              <h3 className="hbcu-card-title">Facebook Community</h3>
              <p className="hbcu-card-description">
                Join our active Facebook community for real-time updates, discussions, and connections with fellow members.
              </p>
              <a href="https://www.facebook.com/ABHAweb" target="_blank" rel="noopener noreferrer" className="hbcu-card-link">
                Visit Facebook
              </a>
            </div>
            <div className="hbcu-investment-card">
              <h3 className="hbcu-card-title">Event Inquiries</h3>
              <p className="hbcu-card-description">
                Have questions about upcoming events, volunteer opportunities, or want to suggest new program ideas?
              </p>
              <a href="https://www.facebook.com/ABHAweb" target="_blank" rel="noopener noreferrer" className="hbcu-card-link">
                Ask Questions
              </a>
            </div>
            <div className="hbcu-investment-card">
              <h3 className="hbcu-card-title">Membership Support</h3>
              <p className="hbcu-card-description">
                Get help with membership questions, community resources, or support services available to our families.
              </p>
              <a href="https://www.facebook.com/ABHAweb" target="_blank" rel="noopener noreferrer" className="hbcu-card-link">
                Get Support
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form - HBCU Style */}
      <section className="hbcu-heritage-section">
        <div className="container">
          <h2 className="hbcu-section-title">Send us a message</h2>
          <p className="hbcu-heritage-description">
            Fill out the form below and we'll get back to you as soon as possible. We value your input and look forward to hearing from you.
          </p>
          
          <div style={{ maxWidth: '600px', margin: '0 auto' }}>
            <div className="hbcu-heritage-card" style={{ padding: '3rem' }}>
              <form className="space-y-6">
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div>
                    <label htmlFor="name" style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--primary-red)', fontWeight: '600' }}>
                      Full Name
                    </label>
                    <input 
                      type="text" 
                      id="name" 
                      name="name" 
                      required 
                      style={{ 
                        width: '100%',
                        padding: '0.75rem',
                        border: '2px solid rgba(212, 175, 55, 0.3)',
                        borderRadius: '8px',
                        fontSize: '1rem',
                        transition: 'border-color 0.3s ease'
                      }}
                      onFocus={(e) => e.target.style.borderColor = 'var(--primary-red)'}
                      onBlur={(e) => e.target.style.borderColor = 'rgba(212, 175, 55, 0.3)'}
                    />
                  </div>
                  <div>
                    <label htmlFor="email" style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--primary-red)', fontWeight: '600' }}>
                      Email Address
                    </label>
                    <input 
                      type="email" 
                      id="email" 
                      name="email" 
                      required 
                      style={{ 
                        width: '100%',
                        padding: '0.75rem',
                        border: '2px solid rgba(212, 175, 55, 0.3)',
                        borderRadius: '8px',
                        fontSize: '1rem',
                        transition: 'border-color 0.3s ease'
                      }}
                      onFocus={(e) => e.target.style.borderColor = 'var(--primary-red)'}
                      onBlur={(e) => e.target.style.borderColor = 'rgba(212, 175, 55, 0.3)'}
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="subject" style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--primary-red)', fontWeight: '600' }}>
                    Subject
                  </label>
                  <input 
                    type="text" 
                    id="subject" 
                    name="subject" 
                    required 
                    style={{ 
                      width: '100%',
                      padding: '0.75rem',
                      border: '2px solid rgba(212, 175, 55, 0.3)',
                      borderRadius: '8px',
                      fontSize: '1rem',
                      transition: 'border-color 0.3s ease'
                    }}
                    onFocus={(e) => e.target.style.borderColor = 'var(--primary-red)'}
                    onBlur={(e) => e.target.style.borderColor = 'rgba(212, 175, 55, 0.3)'}
                  />
                </div>
                <div>
                  <label htmlFor="message" style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--primary-red)', fontWeight: '600' }}>
                    Message
                  </label>
                  <textarea 
                    id="message" 
                    name="message" 
                    rows={4} 
                    required 
                    style={{ 
                      width: '100%',
                      padding: '0.75rem',
                      border: '2px solid rgba(212, 175, 55, 0.3)',
                      borderRadius: '8px',
                      fontSize: '1rem',
                      resize: 'vertical',
                      transition: 'border-color 0.3s ease'
                    }}
                    onFocus={(e) => e.target.style.borderColor = 'var(--primary-red)'}
                    onBlur={(e) => e.target.style.borderColor = 'rgba(212, 175, 55, 0.3)'}
                  />
                </div>
                <div style={{ textAlign: 'center', marginTop: '2rem' }}>
                  <button 
                    type="submit" 
                    className="btn-hbcu-primary"
                    style={{ padding: '1rem 2rem', fontSize: '1.1rem' }}
                  >
                    Send Message
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section - HBCU Style */}
      <section className="hbcu-cta-section">
        <div className="container">
          <h2 className="hbcu-cta-title">Join Our Community Today</h2>
          <p className="hbcu-cta-description">
            Ready to become part of the ABHA family? Connect with us on Facebook or reach out directly.<br />
            We're excited to welcome you to our vibrant Bengali community.
          </p>
          <div className="hbcu-cta-buttons">
            <a href="https://www.facebook.com/ABHAweb" target="_blank" rel="noopener noreferrer" className="btn-hbcu-primary">
              Join Facebook Group
            </a>
            <a href="https://www.facebook.com/ABHAweb" target="_blank" rel="noopener noreferrer" className="btn-hbcu-secondary">
              Learn More
            </a>
          </div>
          <div className="hbcu-cta-quote">
            <p className="hbcu-quote-text">
              "Every conversation is a step toward building a stronger, more connected community."
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
