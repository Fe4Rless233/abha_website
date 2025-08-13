import { useState } from 'react';
import './styles/index.css';

// Import components
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';

// Import pages
import HomePage from './pages/Home';
import AboutPage from './pages/About';
import CulturePage from './pages/Culture';
import EventsPage from './pages/Events';
import CommunityPage from './pages/Community';
import ContactPage from './pages/Contact';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [eventToExpand, setEventToExpand] = useState<string | undefined>(undefined);
  const [pageVisitToken, setPageVisitToken] = useState(0); // increments to force remount
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handlePageChange = (page: string, eventId?: string) => {
    setCurrentPage(page);
    setEventToExpand(eventId);
    setPageVisitToken(v => v + 1);
    setIsMobileMenuOpen(false); // Close menu on page change
  };

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage key={`home-${pageVisitToken}`} onPageChange={handlePageChange} />;
      case 'about':
        return <AboutPage key={`about-${pageVisitToken}`} onPageChange={handlePageChange} />;
      case 'culture':
        return <CulturePage key={`culture-${pageVisitToken}`} onPageChange={handlePageChange} />;
      case 'events':
        return <EventsPage key={`events-${pageVisitToken}`} initialExpandedEvent={eventToExpand} onPageChange={handlePageChange} />;
      case 'community':
        return <CommunityPage key={`community-${pageVisitToken}`} onPageChange={handlePageChange} />;
      case 'contact':
        return <ContactPage key={`contact-${pageVisitToken}`} onPageChange={handlePageChange} />;
      default:
        return <HomePage onPageChange={handlePageChange} />;
    }
  };

  return (
    <div className={`app ${isMobileMenuOpen ? 'mobile-menu-is-open' : ''}`}>
      <Header 
        currentPage={currentPage} 
        onPageChange={handlePageChange} 
        onMobileMenuToggle={handleMobileMenuToggle}
        isMobileMenuOpen={isMobileMenuOpen}
      />
      <main>
        {renderPage()}
      </main>
      <Footer onPageChange={handlePageChange} />
    </div>
  );
}

export default App;
