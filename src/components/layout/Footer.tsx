// React import removed - using new JSX transform

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-column">
          <h3>Quick Links</h3>
          <ul className="footer-links">
            <li><a href="#home">Home</a></li>
            <li><a href="#about">About Us</a></li>
            <li><a href="#culture">Culture</a></li>
            <li><a href="#events">Events</a></li>
            <li><a href="#community">Community</a></li>
          </ul>
        </div>

        <div className="footer-column">
          <h3>Programs</h3>
          <ul className="footer-links">
            <li><a href="#">Cultural Events</a></li>
            <li><a href="#">Bengali Language Classes</a></li>
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
              <a href="mailto:contact.abha.pa@gmail.com">contact.abha.pa@gmail.com</a>
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
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
          <a href="#">Community Guidelines</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
