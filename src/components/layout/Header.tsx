import React from 'react';
import Navbar from './Navbar';

interface HeaderProps {
  currentPage: string;
  onPageChange: (page: string, eventId?: string) => void;
  onMobileMenuToggle: () => void;
  isMobileMenuOpen: boolean;
}

const Header: React.FC<HeaderProps> = ({ currentPage, onPageChange, onMobileMenuToggle, isMobileMenuOpen }) => {
  // const [showBanner, setShowBanner] = useState(true);

  // const handleViewEventsClick = () => {
  //   onPageChange('events', 'upcoming');
  // };

  return (
    <header className="site-header">
      <Navbar 
        currentPage={currentPage} 
        onPageChange={onPageChange} 
        onMobileMenuToggle={onMobileMenuToggle}
        isMobileMenuOpen={isMobileMenuOpen}
      />
      {/* Banner removed as per request */}
    </header>
  );
};

export default Header;
