import React from 'react';

interface NavItem {
  id: string;
  label: string;
  icon: string;
}

interface MobileMenuProps {
  isOpen: boolean;
  navItems: NavItem[];
  currentPage: string;
  onLinkClick: (page: string) => void;
  onClose: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, navItems, currentPage, onLinkClick, onClose }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <>
      <div className="mobile-menu-overlay" aria-hidden="true" onClick={onClose} />
      <div className={`mobile-menu ${isOpen ? 'open' : ''}`}>
        {navItems.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            onClick={(e) => {
              e.preventDefault();
              onLinkClick(item.id);
            }}
            className={`navbar-link mobile ${currentPage === item.id ? 'active' : ''}`}
          >
            <span className="navbar-link-icon">{item.icon}</span>
            {item.label}
          </a>
        ))}
      </div>
    </>
  );
};

export default MobileMenu;
