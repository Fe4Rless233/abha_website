import React, { useEffect, useState } from 'react';
import { getEvents, AdminEvent } from '../utils/adminData';

interface AdminEventsDisplayProps {
  onEventSelect?: (event: AdminEvent) => void;
  showUpcomingOnly?: boolean;
}

const AdminEventsDisplay: React.FC<AdminEventsDisplayProps> = ({ onEventSelect, showUpcomingOnly = false }) => {
  const [events, setEvents] = useState<AdminEvent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadEvents = () => {
      try {
        const adminEvents = getEvents();
        
        let filteredEvents = adminEvents;
        if (showUpcomingOnly) {
          const today = new Date();
          today.setHours(0, 0, 0, 0);
          filteredEvents = adminEvents.filter(event => new Date(event.date) >= today);
        }
        
        // Sort by date (upcoming first, then by date)
        const sortedEvents = filteredEvents.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
        setEvents(sortedEvents);
      } catch (error) {
        console.error('Failed to load admin events:', error);
      } finally {
        setLoading(false);
      }
    };

    loadEvents();
    
    // Listen for storage changes to update in real-time
    const handleStorageChange = () => loadEvents();
    window.addEventListener('storage', handleStorageChange);
    
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [showUpcomingOnly]);

  if (loading) {
    return (
      <div style={{ padding: '1rem', textAlign: 'center' }}>
        <div style={{ color: '#666', fontSize: '0.9rem' }}>Loading community events...</div>
      </div>
    );
  }

  if (events.length === 0) {
    return showUpcomingOnly ? null : (
      <div style={{ padding: '2rem', textAlign: 'center', background: '#f8f9fa', borderRadius: '12px', marginBottom: '2rem' }}>
        <div style={{ color: '#666', fontStyle: 'italic' }}>
          <h4 style={{ margin: '0 0 0.5rem 0', color: '#7a1b1b' }}>Community Events</h4>
          <p style={{ margin: 0 }}>
            No community events have been added yet. 
            <br />
            <small>Use the <a href="#admin" style={{ color: '#7a1b1b' }}>admin panel</a> to add events.</small>
          </p>
        </div>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch {
      return dateString;
    }
  };

  const formatShortDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric'
      });
    } catch {
      return dateString;
    }
  };

  const getCategoryIcon = (category: AdminEvent['category']) => {
    switch (category) {
      case 'festival': return '🎭';
      case 'cultural': return '🎵';
      case 'community': return '👥';
      default: return '📅';
    }
  };

  const getCategoryColor = (category: AdminEvent['category']) => {
    switch (category) {
      case 'festival': return '#e74c3c';
      case 'cultural': return '#9b59b6';
      case 'community': return '#27ae60';
      default: return '#34495e';
    }
  };

  const isUpcoming = (dateString: string) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return new Date(dateString) >= today;
  };

  const upcomingEvents = events.filter(event => isUpcoming(event.date));
  const pastEvents = events.filter(event => !isUpcoming(event.date));

  return (
    <div className="admin-events-display">
      {/* Upcoming Events Section */}
      {(upcomingEvents.length > 0 || !showUpcomingOnly) && (
        <div style={{ marginBottom: upcomingEvents.length > 0 && pastEvents.length > 0 ? '3rem' : '1.5rem' }}>
          <div style={{ marginBottom: '1.5rem' }}>
            <h3 style={{ color: '#7a1b1b', margin: '0 0 0.5rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              {showUpcomingOnly ? '🎪 Upcoming Community Events' : '🎪 Upcoming Events'}
            </h3>
            <p style={{ color: '#666', margin: 0, fontSize: '0.9rem' }}>
              {showUpcomingOnly 
                ? 'Recently added events and announcements'
                : 'Events added through the admin panel'
              }
            </p>
          </div>

          {upcomingEvents.length > 0 ? (
            <div style={{ display: 'grid', gap: '1.5rem', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))' }}>
              {upcomingEvents.map((event) => (
                <div
                  key={event.id}
                  className="admin-event-card upcoming-event"
                  style={{
                    background: 'linear-gradient(135deg, #fff 0%, #f8f9fa 100%)',
                    borderRadius: '12px',
                    padding: '1.5rem',
                    border: '2px solid #7a1b1b',
                    boxShadow: '0 4px 12px rgba(122, 27, 27, 0.1)',
                    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                    cursor: onEventSelect ? 'pointer' : 'default',
                    position: 'relative',
                    overflow: 'hidden'
                  }}
                  onClick={() => onEventSelect?.(event)}
                  onMouseEnter={(e) => {
                    if (onEventSelect) {
                      e.currentTarget.style.transform = 'translateY(-4px)';
                      e.currentTarget.style.boxShadow = '0 8px 24px rgba(122, 27, 27, 0.2)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (onEventSelect) {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 4px 12px rgba(122, 27, 27, 0.1)';
                    }
                  }}
                >
                  {/* New/Upcoming Badge */}
                  <div
                    style={{
                      position: 'absolute',
                      top: '-10px',
                      right: '20px',
                      background: 'linear-gradient(135deg, #e74c3c, #c0392b)',
                      color: 'white',
                      padding: '0.25rem 0.75rem',
                      borderRadius: '0 0 8px 8px',
                      fontSize: '0.7rem',
                      fontWeight: '700',
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px'
                    }}
                  >
                    New
                  </div>

                  {/* Category Badge and Date */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                    <div
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        background: getCategoryColor(event.category),
                        color: 'white',
                        padding: '0.25rem 0.75rem',
                        borderRadius: '20px',
                        fontSize: '0.8rem',
                        fontWeight: '600'
                      }}
                    >
                      <span>{getCategoryIcon(event.category)}</span>
                      {event.category.charAt(0).toUpperCase() + event.category.slice(1)}
                    </div>
                    <div style={{ 
                      background: '#7a1b1b', 
                      color: 'white', 
                      padding: '0.25rem 0.5rem', 
                      borderRadius: '6px',
                      fontSize: '0.8rem',
                      fontWeight: '600'
                    }}>
                      {formatShortDate(event.date)}
                    </div>
                  </div>

                  {/* Event Title */}
                  <h4 style={{ 
                    margin: '0 0 0.75rem 0', 
                    color: '#2c3e50', 
                    fontSize: '1.3rem',
                    fontWeight: '700',
                    lineHeight: '1.3'
                  }}>
                    {event.title}
                  </h4>

                  {/* Full Date */}
                  <div style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '0.5rem', 
                    marginBottom: '0.75rem',
                    color: '#7a1b1b',
                    fontSize: '0.9rem',
                    fontWeight: '600'
                  }}>
                    <span>📅</span>
                    <span>{formatDate(event.date)}</span>
                  </div>

                  {/* Location */}
                  {event.location && (
                    <div style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: '0.5rem', 
                      marginBottom: '0.75rem',
                      color: '#7a1b1b',
                      fontSize: '0.9rem'
                    }}>
                      <span>📍</span>
                      <span>{event.location}</span>
                    </div>
                  )}

                  {/* Description */}
                  {event.description && (
                    <p style={{ 
                      margin: '0', 
                      color: '#555', 
                      fontSize: '0.9rem',
                      lineHeight: '1.5',
                      display: '-webkit-box',
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden'
                    }}>
                      {event.description}
                    </p>
                  )}

                  {/* Event Image */}
                  {event.image && (
                    <div style={{ marginTop: '1rem' }}>
                      <img
                        src={event.image}
                        alt={event.title}
                        style={{
                          width: '100%',
                          height: '160px',
                          objectFit: 'cover',
                          borderRadius: '8px',
                          border: '1px solid #e0e0e0'
                        }}
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            showUpcomingOnly && (
              <div style={{ 
                padding: '1.5rem', 
                background: '#f8f9fa', 
                borderRadius: '8px', 
                textAlign: 'center',
                border: '2px dashed #ddd'
              }}>
                <p style={{ margin: 0, color: '#666', fontStyle: 'italic' }}>
                  No upcoming community events at this time.
                  <br />
                  <small>Check back soon for new announcements!</small>
                </p>
              </div>
            )
          )}
        </div>
      )}

      {/* Past Events Section */}
      {!showUpcomingOnly && pastEvents.length > 0 && (
        <div>
          <div style={{ marginBottom: '1.5rem' }}>
            <h3 style={{ color: '#7a1b1b', margin: '0 0 0.5rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              📚 Past Events
            </h3>
            <p style={{ color: '#666', margin: 0, fontSize: '0.9rem' }}>
              Previous community events and gatherings
            </p>
          </div>

          <div style={{ display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}>
            {pastEvents.map((event) => (
              <div
                key={event.id}
                className="admin-event-card past-event"
                style={{
                  background: 'white',
                  borderRadius: '8px',
                  padding: '1.25rem',
                  border: '1px solid #e0e0e0',
                  boxShadow: '0 2px 6px rgba(0,0,0,0.05)',
                  opacity: 0.8,
                  cursor: onEventSelect ? 'pointer' : 'default'
                }}
                onClick={() => onEventSelect?.(event)}
              >
                {/* Category Badge and Date */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
                  <div
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      background: '#95a5a6',
                      color: 'white',
                      padding: '0.2rem 0.6rem',
                      borderRadius: '16px',
                      fontSize: '0.75rem',
                      fontWeight: '600'
                    }}
                  >
                    <span>{getCategoryIcon(event.category)}</span>
                    {event.category.charAt(0).toUpperCase() + event.category.slice(1)}
                  </div>
                  <div style={{ fontSize: '0.8rem', color: '#999' }}>
                    {formatShortDate(event.date)}
                  </div>
                </div>

                {/* Event Title */}
                <h5 style={{ 
                  margin: '0 0 0.5rem 0', 
                  color: '#2c3e50', 
                  fontSize: '1.1rem',
                  fontWeight: '600',
                  lineHeight: '1.3'
                }}>
                  {event.title}
                </h5>

                {/* Location */}
                {event.location && (
                  <div style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '0.5rem', 
                    marginBottom: '0.5rem',
                    color: '#666',
                    fontSize: '0.8rem'
                  }}>
                    <span>📍</span>
                    <span>{event.location}</span>
                  </div>
                )}

                {/* Description */}
                {event.description && (
                  <p style={{ 
                    margin: '0', 
                    color: '#666', 
                    fontSize: '0.85rem',
                    lineHeight: '1.4',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden'
                  }}>
                    {event.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminEventsDisplay;
