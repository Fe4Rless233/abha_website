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
