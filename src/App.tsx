import { useEffect, useState } from 'react';
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
    // Update internal state
    setCurrentPage(page);
    setEventToExpand(eventId);
    setPageVisitToken(v => v + 1);
    setIsMobileMenuOpen(false); // Close menu on page change

    // Push browser history/hash for proper back/forward behavior
    try {
      const hash = `#${page}${eventId ? `/${eventId}` : ''}`;
      if (typeof window !== 'undefined') {
        if (window.location.hash !== hash) {
          window.history.pushState({ page, eventId }, '', hash);
        } else {
          // still record a state change without altering the URL
          window.history.pushState({ page, eventId }, '');
        }
      }
    } catch {
      // ignore history errors
    }
  };

  // Initialize from hash and support back/forward via popstate/hashchange
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const parseHash = () => {
      const raw = (window.location.hash || '').replace(/^#/, '');
      if (!raw) return; // keep defaults
      const [pageFromHash, eventIdFromHash] = raw.split('/');
      const page = pageFromHash || 'home';
      setCurrentPage(page);
      setEventToExpand(eventIdFromHash);
      setPageVisitToken(v => v + 1);
    };

    // On first load, set a hash for the current page if none exists
    if (!window.location.hash) {
      try {
        window.history.replaceState({ page: currentPage }, '', `#${currentPage}`);
      } catch {}
    } else {
      parseHash();
    }

    const onNav = () => parseHash();
    window.addEventListener('popstate', onNav);
    window.addEventListener('hashchange', onNav);
    return () => {
      window.removeEventListener('popstate', onNav);
      window.removeEventListener('hashchange', onNav);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
        return <ContactPage key={`contact-${pageVisitToken}`} onPageChange={handlePageChange} scrollToId={eventToExpand} />;
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
