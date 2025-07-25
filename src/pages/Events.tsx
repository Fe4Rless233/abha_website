import React, { useState, useEffect } from 'react';

interface Event {
  title: string;
  description: string;
  category: string;
  date: string;
  time: string;
  venue: string;
  details: string;
  highlights: string[];
  image: string;
  fallbackImage: string;
}

interface EventsPageProps {
  initialExpandedEvent?: string;
}

const EventsPage: React.FC<EventsPageProps> = ({ initialExpandedEvent }) => {
  const [expandedEvent, setExpandedEvent] = useState<number | null>(null);
  const [selectedYear, setSelectedYear] = useState<number>(2025);
  const [hasProcessedInitialEvent, setHasProcessedInitialEvent] = useState(false);

  const eventsByYear: { [year: number]: Event[] } = {
    2025: [
    {
      title: "Durga Puja 2025",
      description: "Our grandest annual celebration with cultural programs and community feasts.",
      category: "Festival",
      date: "September 27-28, 2025",
      time: "10:00 AM - 10:00 PM",
      venue: "Community Center, Harrisburg PA",
      details: "Join us for the most significant Bengali festival! Experience traditional puja rituals, mesmerizing cultural performances including classical dance and music, authentic Bengali delicacies, kids' activities, and community bonding. Free for all families.",
      highlights: ["Traditional Puja Rituals", "Cultural Dance & Music", "Authentic Bengali Food", "Kids Activities", "Community Fellowship"],
      image: "/assets/images/events/durga-puja.jpg",
      fallbackImage: "🏛️"
    },
    {
      title: "Annual Summer Picnic",
      description: "A fun-filled day for families with games, food, and social activities.",
      category: "Social",
      date: "July 20, 2025",
      time: "11:00 AM - 6:00 PM",
      venue: "Riverside Park, Harrisburg",
      details: "Bring your family for a day of outdoor fun! Enjoy traditional games, potluck feast, volleyball, cricket, and activities for all ages. A perfect opportunity to connect with fellow Bengali families in a relaxed outdoor setting.",
      highlights: ["Outdoor Games", "Potluck Feast", "Cricket & Volleyball", "Face Painting for Kids", "Photography Contest"],
      image: "/assets/images/events/summer-picnic.jpg",
      fallbackImage: "🌳"
    },
    {
      title: "Boishakhi (Bengali New Year)",
      description: "Celebrate the Bengali New Year with traditional music, dance, and food.",
      category: "Festival",
      date: "April 15, 2025",
      time: "6:00 PM - 10:00 PM",
      venue: "ABHA Community Hall",
      details: "Welcome the Bengali New Year 1432 with joy and tradition! Enjoy cultural programs featuring traditional Rabindra Sangeet, folk dances, poetry recitation, and a special New Year feast with traditional Bengali sweets.",
      highlights: ["Rabindra Sangeet Performance", "Traditional Folk Dance", "Poetry Recitation", "Bengali New Year Feast", "Cultural Quiz Competition"],
      image: "/assets/images/events/Boishakhi.jpg",
      fallbackImage: "🎊"
    },
    {
      title: "Saraswati Puja",
      description: "A celebration of knowledge, music, and the arts.",
      category: "Festival",
      date: "February 2, 2025",
      time: "4:00 PM - 9:00 PM",
      venue: "Community Center, Harrisburg PA",
      details: "Honor Goddess Saraswati, the deity of knowledge and arts. The celebration includes puja ceremonies, classical music performances, art exhibitions by community members, and educational activities for children.",
      highlights: ["Saraswati Puja Ceremony", "Classical Music Concert", "Art Exhibition", "Children's Drawing Competition", "Traditional Prasad Distribution"],
      image: "/assets/images/events/saraswati-puja.jpg",
      fallbackImage: "📚"
    }
  ],
  2024: [
    {
      title: "Durga Puja 2024",
      description: "Our magnificent annual celebration with traditional puja and cultural programs.",
      category: "Festival",
      date: "October 8-12, 2024",
      time: "10:00 AM - 10:00 PM",
      venue: "Community Center, Harrisburg PA",
      details: "Our most cherished festival brought together over 300 community members! Featured traditional puja ceremonies, spectacular cultural performances including classical dance recitals, folk music, authentic Bengali feast, children's competitions, and memorable community bonding moments.",
      highlights: ["Traditional Puja Ceremonies", "Classical Dance Performances", "Authentic Bengali Feast", "Children's Cultural Competition", "Community Photo Sessions"],
      image: "/assets/images/events/durga-puja-2024.jpg",
      fallbackImage: "🏛️"
    },
    {
      title: "Summer Family Picnic 2024",
      description: "A memorable day of outdoor fun, games, and delicious food for all families.",
      category: "Social",
      date: "July 21, 2024",
      time: "11:00 AM - 6:00 PM",
      venue: "City Island Park, Harrisburg",
      details: "Perfect weather welcomed 150+ families for our most successful picnic yet! Enjoyed cricket matches, volleyball tournaments, traditional games for kids, amazing potluck spread, and strengthened community bonds under the beautiful summer sky.",
      highlights: ["Cricket Tournament", "Volleyball Matches", "Kids Traditional Games", "Community Potluck", "Family Photography"],
      image: "/assets/images/events/summer-picnic-2024.jpg",
      fallbackImage: "🌳"
    },
    {
      title: "Boishakhi 2024 (Bengali New Year 1431)",
      description: "Welcomed the Bengali New Year with traditional celebrations and joy.",
      category: "Festival",
      date: "April 14, 2024",
      time: "6:00 PM - 10:00 PM",
      venue: "ABHA Community Hall",
      details: "Celebrated the arrival of Bengali New Year 1431 with tremendous enthusiasm! Featured soul-stirring Rabindra Sangeet performances, mesmerizing traditional folk dances, poetry recitations, cultural quiz, and feast of traditional Bengali New Year delicacies.",
      highlights: ["Rabindra Sangeet Concert", "Traditional Folk Dance", "Poetry & Literature", "Cultural Quiz Competition", "Traditional New Year Feast"],
      image: "/assets/images/events/Boishakhi-2024.jpg",
      fallbackImage: "🎊"
    },
    {
      title: "Saraswati Puja 2024",
      description: "Honored the goddess of knowledge, music, and arts with reverence.",
      category: "Festival",
      date: "February 14, 2024",
      time: "4:00 PM - 9:00 PM",
      venue: "Community Center, Harrisburg PA",
      details: "A spiritually enriching celebration of Goddess Saraswati! The event featured beautiful puja ceremonies, inspiring classical music performances, stunning art exhibitions by community artists, educational activities for children, and distribution of blessed prasad.",
      highlights: ["Sacred Puja Ceremony", "Classical Music Concert", "Community Art Exhibition", "Children's Art Competition", "Prasad Distribution"],
      image: "/assets/images/events/saraswati-puja-2024.jpg",
      fallbackImage: "📚"
    }
  ]
};

  // Handle initial event expansion
  useEffect(() => {
    if (initialExpandedEvent && !hasProcessedInitialEvent) {
      // Find the event index by matching the event identifier
      const eventIndex = eventsByYear[selectedYear]?.findIndex(event => 
        event.title.toLowerCase().replace(/\s+/g, '-') === initialExpandedEvent.toLowerCase()
      );
      
      if (eventIndex !== undefined && eventIndex !== -1) {
        setExpandedEvent(eventIndex);
        setHasProcessedInitialEvent(true);
      }
    }
    
    // Scroll to events grid when navigating from another page
    if (initialExpandedEvent && !hasProcessedInitialEvent) {
      setTimeout(() => {
        const eventsGrid = document.querySelector('.all-events-section');
        if (eventsGrid) {
          eventsGrid.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    }
  }, [initialExpandedEvent, selectedYear, eventsByYear, hasProcessedInitialEvent]);

  // Scroll to top when component mounts (only for direct navigation)
  useEffect(() => {
    if (!initialExpandedEvent) {
      window.scrollTo(0, 0);
    }
  }, [initialExpandedEvent]);

  const currentEvents = eventsByYear[selectedYear] || [];
  const availableYears = Object.keys(eventsByYear).map(Number).sort((a, b) => b - a);

  // Reorder events to put expanded event at top
  const getOrderedEvents = () => {
    if (expandedEvent === null) {
      return currentEvents;
    }
    
    const expandedEventData = currentEvents[expandedEvent];
    const otherEvents = currentEvents.filter((_, index) => index !== expandedEvent);
    return [expandedEventData, ...otherEvents];
  };

  const orderedEvents = getOrderedEvents();

  const toggleExpand = (clickedIndex: number) => {
    // If there's an expanded event and we click on it (always at index 0), collapse it
    if (expandedEvent !== null && clickedIndex === 0) {
      setExpandedEvent(null);
      return;
    }
    
    // Find the original index of the clicked event
    const originalIndex = currentEvents.findIndex(event => event === orderedEvents[clickedIndex]);
    
    // If we're clicking on a different event, expand it
    if (originalIndex !== expandedEvent) {
      setExpandedEvent(originalIndex);
    }
  };

  return (
    <div className="page-container hbcu-style">
      {/* Hero Section - HBCU Style */}
      <section className="hbcu-hero-section">
        <div className="hero-video-container">
          <video 
            className="hero-video" 
            autoPlay 
            muted 
            loop 
            playsInline
          >
            <source src="/assets/videos/community-events.mp4" type="video/mp4" />
          </video>
          <div className="hero-video-overlay"></div>
        </div>
        <div className="container hero-content-hbcu">
          <div className="hero-logo-container-hbcu">
            <img 
              src="/assets/images/abha-logo.jpg" 
              alt="ABHA Logo" 
              className="hero-logo-hbcu"
            />
            <div className="hero-logo-fallback" style={{ display: 'none', fontSize: '3rem', color: '#D4AF37' }}>
              🏛️ ABHA
            </div>
          </div>
          <h1 className="hero-title-hbcu">
            Community Events
          </h1>
          <p className="hero-subtitle-hbcu">
            Join us for a variety of cultural, social, and educational events throughout the year.
          </p>
          <div className="hero-bengali-text">
            "সম্প্রদায়িক অনুষ্ঠান"
          </div>
        </div>
        
        {/* Hero Stats */}
        <div className="hero-stats-hbcu">
          <div className="container">
            <div className="stats-grid-hbcu">
              <div className="stat-item-hbcu">
                <div className="stat-number-hbcu">4</div>
                <div className="stat-label-hbcu">Annual Events</div>
              </div>
              <div className="stat-item-hbcu">
                <div className="stat-number-hbcu">300+</div>
                <div className="stat-label-hbcu">Event Attendees</div>
              </div>
              <div className="stat-item-hbcu">
                <div className="stat-number-hbcu">10+</div>
                <div className="stat-label-hbcu">Years of Celebrations</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="hbcu-mission-section">
        <div className="container">
          <h2 className="hbcu-section-title">OUR EVENT CALENDAR</h2>
          <p className="hbcu-mission-text">
            Browse through our events by year to see how our community has grown and celebrated together. 
            From traditional festivals to modern gatherings, each event strengthens our Bengali heritage 
            while building lasting connections.
          </p>
        </div>
      </section>

      {/* Events Section - HBCU Style */}
      <section className="hbcu-investment-section all-events-section">
        <div className="container">
          <h2 className="hbcu-section-title-dark">Annual Events</h2>
          <p className="hbcu-heritage-description">
            Explore our year-round celebrations and community gatherings
          </p>
          
          {/* Year Navigation */}
          <div className="events-year-navigation">
            <div className="year-selector-container">
              {availableYears.map((year) => (
                <button
                  key={year}
                  onClick={() => {
                    setSelectedYear(year);
                    setExpandedEvent(null);
                  }}
                  className={`year-selector-btn ${selectedYear === year ? 'active' : ''}`}
                >
                  {year}
                </button>
              ))}
            </div>
          </div>

          {/* Year Indicator */}
          <div className="year-indicator-card">
            <h3 className="year-indicator-title">
              {selectedYear === 2025 ? '🌟 Upcoming Events ' + selectedYear : '📸 Past Events ' + selectedYear}
            </h3>
            <p className="year-indicator-description">
              {selectedYear === 2025 
                ? 'Join us for these exciting upcoming celebrations and community gatherings!'
                : `Relive the wonderful memories from our ${selectedYear} celebrations and community events.`
              }
            </p>
          </div>

          {/* Events Grid */}
          <div className="events-grid">
            {orderedEvents.map((event, index) => (
              <div 
                key={`${event.title}-${selectedYear}-${index}`} 
                className={`event-card ${(expandedEvent !== null && index === 0) ? 'expanded' : ''}`}
                onClick={() => toggleExpand(index)}
              >
                {/* Event Image Header */}
                <div className={`event-image-header ${event.category.toLowerCase()}`}>
                  <img 
                    src={event.image}
                    alt={event.title}
                    className="event-image"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                    onLoad={(e) => {
                      const fallbackElement = e.currentTarget.nextElementSibling as HTMLElement;
                      if (fallbackElement) {
                        fallbackElement.style.display = 'none';
                      }
                    }}
                  />
                  
                  <div className="event-image-fallback">
                    <span className="event-emoji">
                      {event.fallbackImage}
                    </span>
                  </div>
                </div>

                {/* Event Content */}
                <div className="event-content">
                  <div className="event-header">
                    <span className="event-category-badge">
                      {event.category}
                    </span>
                    <span className="event-expand-icon">
                      {(expandedEvent !== null && index === 0) ? '−' : '+'}
                    </span>
                  </div>
                  
                  <h3 className="event-title">{event.title}</h3>
                  <p className="event-description">{event.description}</p>

                  {(expandedEvent !== null && index === 0) && (
                    <div className="event-expanded-content">
                      <div className="event-meta">
                        <div className="meta-item">
                          <span className="meta-icon">📅</span>
                          <strong>Date:</strong>
                          <span>{event.date}</span>
                        </div>
                        <div className="meta-item">
                          <span className="meta-icon">⏰</span>
                          <strong>Time:</strong>
                          <span>{event.time}</span>
                        </div>
                        <div className="meta-item">
                          <span className="meta-icon">📍</span>
                          <strong>Venue:</strong>
                          <span>{event.venue}</span>
                        </div>
                      </div>
                      
                      <p className="event-details">{event.details}</p>
                      
                      <div className="event-highlights">
                        <h4>Event Highlights:</h4>
                        <ul>
                          {event.highlights.map((highlight, i) => (
                            <li key={i}>
                              <span className="highlight-icon">✦</span>
                              {highlight}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="event-cta">
                        <a 
                          href="https://www.facebook.com/ABHAweb" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="btn-hbcu-primary"
                          onClick={(e) => e.stopPropagation()}
                        >
                          Get More Info & Register
                        </a>
                      </div>
                    </div>
                  )}

                  <div className="event-expand-hint">
                    Click to {(expandedEvent !== null && index === 0) ? 'collapse' : 'expand'} details
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section - HBCU Style */}
      <section className="hbcu-mission-section">
        <div className="container">
          <h2 className="hbcu-section-title">Join Our Community Events</h2>
          <p className="hbcu-mission-text">
            "সবার উপরে মানুষ সত্য, তাহার উপরে নাই" - Chandidas
            <br />
            <em>Above all, humanity is truth, nothing is above it</em>
          </p>
          <div className="hero-cta-container">
            <a href="https://www.facebook.com/ABHAweb" target="_blank" rel="noopener noreferrer" className="btn-hbcu-primary">
              Follow Us on Facebook
            </a>
            <a href="/contact" className="btn-hbcu-secondary">
              Contact Us
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default EventsPage;
