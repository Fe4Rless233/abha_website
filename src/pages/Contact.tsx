import React from 'react';

interface ContactPageProps {
  onPageChange?: (page: string) => void;
}

const ContactPage: React.FC<ContactPageProps> = ({ onPageChange: _onPageChange }) => {
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
          <h1 className="hero-title-hbcu">Get In Touch</h1>
          <p className="hero-subtitle-hbcu">
            We'd love to hear from you. Whether you have questions about our events, membership, or anything else, our team is ready to help.
          </p>
          <div className="hero-bengali-text">
            আপনি কি হ্যারিসবার্গে নতুন? আপনি কি কিছু বাঙালি বন্ধু খুঁজছেন? অনুগ্রহ করে আমাদের সাথে যোগাযোগ করতে দ্বিধা করবেন না।
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

      {/* Contact Form - HBCU Style */}
      <section className="hbcu-heritage-section">
        <div className="container">
          <h2 className="hbcu-section-title">Send us a message</h2>
          <p className="hbcu-heritage-description">
            Fill out the form below and we'll get back to you as soon as possible. We value your input and look forward to hearing from you.
          </p>
          
          <div style={{ maxWidth: '600px', margin: '0 auto' }}>
            <div className="hbcu-heritage-card" style={{ padding: '3rem' }}>
              <form 
                className="space-y-6"
                action="mailto:associationbengalisharrisburg@hotmail.com"
                method="post"
                encType="text/plain"
              >
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', alignItems: 'end' }} className="contact-form-grid">
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
                        padding: '12px',
                        border: '2px solid rgba(212, 175, 55, 0.3)',
                        borderRadius: '8px',
                        fontSize: '16px',
                        transition: 'border-color 0.3s ease',
                        boxSizing: 'border-box',
                        height: '52px',
                        outline: 'none',
                        appearance: 'none',
                        WebkitAppearance: 'none',
                        MozAppearance: 'textfield',
                        lineHeight: '1.5',
                        fontFamily: 'inherit'
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
                        padding: '12px',
                        border: '2px solid rgba(212, 175, 55, 0.3)',
                        borderRadius: '8px',
                        fontSize: '16px',
                        transition: 'border-color 0.3s ease',
                        boxSizing: 'border-box',
                        height: '52px',
                        outline: 'none',
                        appearance: 'none',
                        WebkitAppearance: 'none',
                        MozAppearance: 'textfield',
                        lineHeight: '1.5',
                        fontFamily: 'inherit'
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
                  <select 
                    id="subject" 
                    name="subject" 
                    required 
                    style={{ 
                      width: '100%',
                      padding: '0.75rem',
                      border: '2px solid rgba(212, 175, 55, 0.3)',
                      borderRadius: '8px',
                      fontSize: '1rem',
                      transition: 'border-color 0.3s ease',
                      backgroundColor: 'white'
                    }}
                    onFocus={(e) => e.target.style.borderColor = 'var(--primary-red)'}
                    onBlur={(e) => e.target.style.borderColor = 'rgba(212, 175, 55, 0.3)'}
                  >
                    <option value="">Select a topic...</option>
                    <option value="Membership Support">Membership Support</option>
                    <option value="Event Inquiries">Event Inquiries</option>
                    <option value="Volunteer Opportunities">Volunteer Opportunities</option>
                    <option value="Cultural Programs">Cultural Programs</option>
                    <option value="General Questions">General Questions</option>
                    <option value="Other">Other</option>
                  </select>
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
