import { useState } from 'react';
import './styles/index.css';

// Import components
import Navbar from './components/layout/Navbar';
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

  const handlePageChange = (page: string, eventId?: string) => {
    setCurrentPage(page);
    setEventToExpand(eventId);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onPageChange={handlePageChange} />;
      case 'about':
        return <AboutPage />;
      case 'culture':
        return <CulturePage />;
      case 'events':
        return <EventsPage initialExpandedEvent={eventToExpand} />;
      case 'community':
        return <CommunityPage />;
      case 'contact':
        return <ContactPage />;
      default:
        return <HomePage onPageChange={handlePageChange} />;
    }
  };

  return (
    <div className="app">
      <Navbar currentPage={currentPage} onPageChange={handlePageChange} />
      <main className="main-content">
        {renderPage()}
      </main>
      <Footer />
    </div>
  );
}

export default App;
