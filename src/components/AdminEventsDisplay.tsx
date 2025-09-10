import React, { useEffect, useState } from 'react';
import { getEvents, AdminEvent } from '../utils/adminData';

interface AdminEventsDisplayProps {
  onEventSelect?: (event: AdminEvent) => void;
}

const AdminEventsDisplay: React.FC<AdminEventsDisplayProps> = ({ onEventSelect }) => {
  const [events, setEvents] = useState<AdminEvent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadEvents = () => {
      try {
        const adminEvents = getEvents();
        // Sort by date (newest first)
        const sortedEvents = adminEvents.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        setEvents(sortedEvents);
      } catch (error) {
        console.error('Failed to load admin events:', error);
      } finally {
        setLoading(false);
      }
    };

    loadEvents();
  }, []);

  if (loading) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <div style={{ color: '#666' }}>Loading events...</div>
      </div>
    );
  }

  if (events.length === 0) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <div style={{ color: '#666', fontStyle: 'italic' }}>
          No events have been added yet. 
          <br />
          <small>Use the admin panel to add events.</small>
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

  return (
    <div className="admin-events-display">
      <div style={{ marginBottom: '1.5rem' }}>
        <h3 style={{ color: '#7a1b1b', margin: '0 0 0.5rem 0' }}>Community Events</h3>
        <p style={{ color: '#666', margin: 0, fontSize: '0.9rem' }}>
          Events added through the admin panel
        </p>
      </div>

      <div style={{ display: 'grid', gap: '1.5rem', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
        {events.map((event) => (
          <div
            key={event.id}
            className="admin-event-card"
            style={{
              background: 'white',
              borderRadius: '12px',
              padding: '1.5rem',
              border: '1px solid #e0e0e0',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              transition: 'transform 0.2s ease, box-shadow 0.2s ease',
              cursor: onEventSelect ? 'pointer' : 'default'
            }}
            onClick={() => onEventSelect?.(event)}
            onMouseEnter={(e) => {
              if (onEventSelect) {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.15)';
              }
            }}
            onMouseLeave={(e) => {
              if (onEventSelect) {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
              }
            }}
          >
            {/* Category Badge */}
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
              <div style={{ fontSize: '0.8rem', color: '#999' }}>
                {formatDate(event.date)}
              </div>
            </div>

            {/* Event Title */}
            <h4 style={{ 
              margin: '0 0 0.75rem 0', 
              color: '#2c3e50', 
              fontSize: '1.2rem',
              fontWeight: '700',
              lineHeight: '1.3'
            }}>
              {event.title}
            </h4>

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
                    height: '150px',
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
    </div>
  );
};

export default AdminEventsDisplay;
