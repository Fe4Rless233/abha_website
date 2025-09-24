import React from 'react';

interface FooterProps {
  onPageChange: (page: string) => void;
}

const Footer: React.FC<FooterProps> = ({ onPageChange }) => {
  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, page: string) => {
    e.preventDefault();
    onPageChange(page);
  };

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-column">
          <h3>Quick Links</h3>
          <ul className="footer-links">
            <li><a href="#home" onClick={(e) => handleLinkClick(e, 'home')}>Home</a></li>
            <li><a href="#about" onClick={(e) => handleLinkClick(e, 'about')}>About Us</a></li>
            <li><a href="#culture" onClick={(e) => handleLinkClick(e, 'culture')}>Culture</a></li>
            <li><a href="#events" onClick={(e) => handleLinkClick(e, 'events')}>Events</a></li>
            <li><a href="#community" onClick={(e) => handleLinkClick(e, 'community')}>Community</a></li>
          </ul>
        </div>

        <div className="footer-column">
          <h3>Programs</h3>
          <ul className="footer-links">
            <li><a href="#">Cultural Events</a></li>
            <li><a href="#">Natok & Drama</a></li>
            <li><a href="#">Community Support</a></li>
            <li><a href="#">New Family Welcome</a></li>
            <li><a href="#">Volunteer Opportunities</a></li>
          </ul>
        </div>

        <div className="footer-column">
          <h3>Contact Info</h3>
          <ul className="footer-links">
            <li className="footer-contact-item">
              <span>📍</span>
              <span>Central Pennsylvania Area</span>
            </li>
            <li className="footer-contact-item">
              <span>📧</span>
              <a href="mailto:associationbengalisharrisburg@hotmail.com">associationbengalisharrisburg@hotmail.com</a>
            </li>
            <li className="footer-contact-item">
              <span>�</span>
              <a href="https://www.facebook.com/ABHAweb" target="_blank" rel="noopener noreferrer">Follow us on Facebook</a>
            </li>
          </ul>
        </div>

        <div className="footer-column">
          <h3>Follow Us</h3>
          <div className="footer-social-links">
            <a href="https://www.facebook.com/ABHAweb" target="_blank" rel="noopener noreferrer" aria-label="Facebook">📘</a>
            <a href="#" aria-label="Instagram">📸</a>
            <a href="#" aria-label="Twitter">🐦</a>
            <a href="#" aria-label="YouTube">📺</a>
          </div>
          <p style={{ marginTop: '1rem', fontSize: '0.9rem', color: 'var(--text-light)' }}>
            Stay connected with our community updates and events!
          </p>
        </div>
      </div>

      {/* Sponsors (site-wide) */}
      <div
        className="footer-sponsors"
        style={{
          marginTop: '2rem',
          padding: '1.5rem 0',
          background: 'var(--footer-sponsor-bg, rgba(0,0,0,0.04))',
          borderTop: '1px solid rgba(0,0,0,0.06)'
        }}
      >
        <div
          className="container"
          style={{ maxWidth: 1100, margin: '0 auto', padding: '0 1rem' }}
        >
          <h3 style={{ margin: '0 0 .75rem', fontSize: '1.15rem' }}>Our Sponsors</h3>
          <p style={{ margin: '0 0 1rem', color: 'var(--text-light, #666)', fontSize: '.95rem' }}>
            We’re grateful to our sponsors for supporting ABHA’s community programs. View the latest sponsor list below.
          </p>
          <div
            style={{
              position: 'relative',
              width: '100%',
              height: 'min(75vh, 700px)',
              borderRadius: 12,
              overflow: 'hidden',
              boxShadow: '0 6px 20px -8px rgba(0,0,0,.25)',
              background: '#fff'
            }}
          >
            <iframe
              title="ABHA Sponsors PDF"
              aria-label="ABHA Sponsors PDF"
              src="https://drive.google.com/file/d/1htnhEk_MwCclaE9ldire4-4o2Dyz4dYC/preview"
              allow="autoplay"
              style={{ width: '100%', height: '100%', border: 0 }}
              loading="lazy"
            />
          </div>
          <div style={{ marginTop: '.75rem' }}>
            <a
              href="https://drive.google.com/file/d/1htnhEk_MwCclaE9ldire4-4o2Dyz4dYC/view"
              target="_blank"
              rel="noopener noreferrer"
              style={{ fontSize: '.9rem' }}
            >
              Open full PDF in new tab ↗
            </a>
          </div>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Association of Bengalis in Harrisburg Area (ABHA). All rights reserved.</p>
        <div className="footer-bottom-links">
          <a href="#" onClick={(e) => { e.preventDefault(); /* Implement policy page or modal */ }}>Privacy Policy</a>
          <a href="#" onClick={(e) => { e.preventDefault(); /* Implement terms page or modal */ }}>Terms of Service</a>
          <a href="#" onClick={(e) => { e.preventDefault(); /* Implement guidelines page or modal */ }}>Community Guidelines</a>
          <a href="#admin" onClick={(e) => handleLinkClick(e, 'admin')} style={{ fontSize: '0.8rem', opacity: 0.7 }}>Admin</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
