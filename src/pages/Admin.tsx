import React, { useState, useRef } from 'react';

interface Event {
  id: string;
  title: string;
  date: string;
  description: string;
  location: string;
  image?: string;
  category: 'festival' | 'cultural' | 'community' | 'other';
}

interface Photo {
  id: string;
  src: string;
  alt: string;
  category: string;
  event: string;
  uploadDate: string;
}

const AdminPanel: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'events' | 'photos'>('events');
  const [events, setEvents] = useState<Event[]>([]);
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  
  // Event form state
  const [eventForm, setEventForm] = useState({
    title: '',
    date: '',
    description: '',
    location: '',
    category: 'festival' as Event['category']
  });
  
  // Photo form state
  const [photoForm, setPhotoForm] = useState({
    alt: '',
    category: '',
    event: ''
  });
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Simple authentication (in production, use proper auth)
  const handleLogin = () => {
    if (password === 'abha2025') { // Change this password
      setIsAuthenticated(true);
    } else {
      alert('Incorrect password');
    }
  };

  const handleAddEvent = () => {
    if (!eventForm.title || !eventForm.date) {
      alert('Please fill in title and date');
      return;
    }

    const newEvent: Event = {
      id: Date.now().toString(),
      ...eventForm
    };

    setEvents([...events, newEvent]);
    setEventForm({
      title: '',
      date: '',
      description: '',
      location: '',
      category: 'festival'
    });
    
    // Save to localStorage for persistence
    localStorage.setItem('abha_events', JSON.stringify([...events, newEvent]));
    alert('Event added successfully!');
  };

  const handleAddPhoto = () => {
    const file = fileInputRef.current?.files?.[0];
    if (!file || !photoForm.alt) {
      alert('Please select a file and provide alt text');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const newPhoto: Photo = {
        id: Date.now().toString(),
        src: e.target?.result as string,
        alt: photoForm.alt,
        category: photoForm.category,
        event: photoForm.event,
        uploadDate: new Date().toISOString()
      };

      setPhotos([...photos, newPhoto]);
      setPhotoForm({ alt: '', category: '', event: '' });
      
      // Save to localStorage
      localStorage.setItem('abha_photos', JSON.stringify([...photos, newPhoto]));
      alert('Photo added successfully!');
      
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    };
    reader.readAsDataURL(file);
  };

  const exportData = () => {
    const data = {
      events: JSON.parse(localStorage.getItem('abha_events') || '[]'),
      photos: JSON.parse(localStorage.getItem('abha_photos') || '[]'),
      exportDate: new Date().toISOString()
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `abha_data_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const deleteEvent = (id: string) => {
    if (confirm('Are you sure you want to delete this event?')) {
      const updatedEvents = events.filter(e => e.id !== id);
      setEvents(updatedEvents);
      localStorage.setItem('abha_events', JSON.stringify(updatedEvents));
    }
  };

  const deletePhoto = (id: string) => {
    if (confirm('Are you sure you want to delete this photo?')) {
      const updatedPhotos = photos.filter(p => p.id !== id);
      setPhotos(updatedPhotos);
      localStorage.setItem('abha_photos', JSON.stringify(updatedPhotos));
    }
  };

  // Load data on component mount
  React.useEffect(() => {
    const savedEvents = localStorage.getItem('abha_events');
    const savedPhotos = localStorage.getItem('abha_photos');
    
    if (savedEvents) setEvents(JSON.parse(savedEvents));
    if (savedPhotos) setPhotos(JSON.parse(savedPhotos));
  }, []);

  if (!isAuthenticated) {
    return (
      <div className="page-container" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ maxWidth: '400px', width: '100%', padding: '2rem', background: '#fff', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
          <h2 style={{ textAlign: 'center', marginBottom: '2rem', color: '#7a1b1b' }}>ABHA Admin Panel</h2>
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
              style={{ 
                width: '100%', 
                padding: '0.75rem', 
                border: '1px solid #ddd', 
                borderRadius: '6px',
                fontSize: '16px'
              }}
            />
          </div>
          <button 
            onClick={handleLogin}
            style={{
              width: '100%',
              padding: '0.75rem',
              background: '#7a1b1b',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              fontSize: '16px',
              fontWeight: '600',
              cursor: 'pointer'
            }}
          >
            Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container" style={{ padding: '2rem 1rem' }}>
      <div className="container" style={{ maxWidth: '1200px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <h1 style={{ color: '#7a1b1b', margin: 0 }}>ABHA Admin Panel</h1>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <button onClick={exportData} style={{ padding: '0.5rem 1rem', background: '#28a745', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>
              Export Data
            </button>
            <button onClick={() => setIsAuthenticated(false)} style={{ padding: '0.5rem 1rem', background: '#dc3545', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>
              Logout
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', borderBottom: '1px solid #ddd' }}>
          <button
            onClick={() => setActiveTab('events')}
            style={{
              padding: '0.75rem 1.5rem',
              background: activeTab === 'events' ? '#7a1b1b' : 'transparent',
              color: activeTab === 'events' ? 'white' : '#7a1b1b',
              border: 'none',
              borderBottom: activeTab === 'events' ? 'none' : '1px solid transparent',
              cursor: 'pointer',
              fontWeight: '600'
            }}
          >
            Events ({events.length})
          </button>
          <button
            onClick={() => setActiveTab('photos')}
            style={{
              padding: '0.75rem 1.5rem',
              background: activeTab === 'photos' ? '#7a1b1b' : 'transparent',
              color: activeTab === 'photos' ? 'white' : '#7a1b1b',
              border: 'none',
              cursor: 'pointer',
              fontWeight: '600'
            }}
          >
            Photos ({photos.length})
          </button>
        </div>

        {activeTab === 'events' && (
          <div style={{ display: 'grid', gap: '2rem', gridTemplateColumns: '1fr 2fr' }}>
            {/* Add Event Form */}
            <div style={{ background: '#f8f9fa', padding: '2rem', borderRadius: '12px' }}>
              <h3 style={{ marginTop: 0, marginBottom: '1.5rem', color: '#7a1b1b' }}>Add New Event</h3>
              
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>Event Title *</label>
                <input
                  type="text"
                  value={eventForm.title}
                  onChange={(e) => setEventForm({...eventForm, title: e.target.value})}
                  style={{ width: '100%', padding: '0.75rem', border: '1px solid #ddd', borderRadius: '6px' }}
                  placeholder="e.g., Durga Puja 2025"
                />
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>Date *</label>
                <input
                  type="date"
                  value={eventForm.date}
                  onChange={(e) => setEventForm({...eventForm, date: e.target.value})}
                  style={{ width: '100%', padding: '0.75rem', border: '1px solid #ddd', borderRadius: '6px' }}
                />
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>Category</label>
                <select
                  value={eventForm.category}
                  onChange={(e) => setEventForm({...eventForm, category: e.target.value as Event['category']})}
                  style={{ width: '100%', padding: '0.75rem', border: '1px solid #ddd', borderRadius: '6px' }}
                >
                  <option value="festival">Festival</option>
                  <option value="cultural">Cultural Event</option>
                  <option value="community">Community Service</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>Location</label>
                <input
                  type="text"
                  value={eventForm.location}
                  onChange={(e) => setEventForm({...eventForm, location: e.target.value})}
                  style={{ width: '100%', padding: '0.75rem', border: '1px solid #ddd', borderRadius: '6px' }}
                  placeholder="e.g., Harrisburg Community Center"
                />
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>Description</label>
                <textarea
                  value={eventForm.description}
                  onChange={(e) => setEventForm({...eventForm, description: e.target.value})}
                  style={{ width: '100%', padding: '0.75rem', border: '1px solid #ddd', borderRadius: '6px', minHeight: '100px', resize: 'vertical' }}
                  placeholder="Event description..."
                />
              </div>

              <button
                onClick={handleAddEvent}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  background: '#7a1b1b',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  fontSize: '16px',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}
              >
                Add Event
              </button>
            </div>

            {/* Events List */}
            <div>
              <h3 style={{ marginTop: 0, marginBottom: '1.5rem', color: '#7a1b1b' }}>Current Events</h3>
              {events.length === 0 ? (
                <p style={{ color: '#666', fontStyle: 'italic' }}>No events added yet.</p>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {events.map((event) => (
                    <div key={event.id} style={{ background: 'white', padding: '1.5rem', borderRadius: '8px', border: '1px solid #ddd' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                        <h4 style={{ margin: 0, color: '#7a1b1b' }}>{event.title}</h4>
                        <button
                          onClick={() => deleteEvent(event.id)}
                          style={{ background: '#dc3545', color: 'white', border: 'none', padding: '0.25rem 0.5rem', borderRadius: '4px', cursor: 'pointer', fontSize: '12px' }}
                        >
                          Delete
                        </button>
                      </div>
                      <p style={{ margin: '0.5rem 0', color: '#666' }}>
                        <strong>Date:</strong> {new Date(event.date).toLocaleDateString()} | 
                        <strong> Category:</strong> {event.category} |
                        <strong> Location:</strong> {event.location || 'Not specified'}
                      </p>
                      {event.description && (
                        <p style={{ margin: '0.5rem 0 0 0', color: '#333' }}>{event.description}</p>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'photos' && (
          <div style={{ display: 'grid', gap: '2rem', gridTemplateColumns: '1fr 2fr' }}>
            {/* Add Photo Form */}
            <div style={{ background: '#f8f9fa', padding: '2rem', borderRadius: '12px' }}>
              <h3 style={{ marginTop: 0, marginBottom: '1.5rem', color: '#7a1b1b' }}>Add New Photo</h3>
              
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>Photo File *</label>
                <input
                  type="file"
                  ref={fileInputRef}
                  accept="image/*"
                  style={{ width: '100%', padding: '0.75rem', border: '1px solid #ddd', borderRadius: '6px' }}
                />
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>Description *</label>
                <input
                  type="text"
                  value={photoForm.alt}
                  onChange={(e) => setPhotoForm({...photoForm, alt: e.target.value})}
                  style={{ width: '100%', padding: '0.75rem', border: '1px solid #ddd', borderRadius: '6px' }}
                  placeholder="e.g., Durga Puja celebration moment"
                />
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>Category</label>
                <input
                  type="text"
                  value={photoForm.category}
                  onChange={(e) => setPhotoForm({...photoForm, category: e.target.value})}
                  style={{ width: '100%', padding: '0.75rem', border: '1px solid #ddd', borderRadius: '6px' }}
                  placeholder="e.g., Festival, Cultural, Community"
                />
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>Event Name</label>
                <input
                  type="text"
                  value={photoForm.event}
                  onChange={(e) => setPhotoForm({...photoForm, event: e.target.value})}
                  style={{ width: '100%', padding: '0.75rem', border: '1px solid #ddd', borderRadius: '6px' }}
                  placeholder="e.g., Durga Puja 2025"
                />
              </div>

              <button
                onClick={handleAddPhoto}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  background: '#7a1b1b',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  fontSize: '16px',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}
              >
                Add Photo
              </button>
            </div>

            {/* Photos List */}
            <div>
              <h3 style={{ marginTop: 0, marginBottom: '1.5rem', color: '#7a1b1b' }}>Current Photos</h3>
              {photos.length === 0 ? (
                <p style={{ color: '#666', fontStyle: 'italic' }}>No photos added yet.</p>
              ) : (
                <div style={{ display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))' }}>
                  {photos.map((photo) => (
                    <div key={photo.id} style={{ background: 'white', borderRadius: '8px', overflow: 'hidden', border: '1px solid #ddd' }}>
                      <img 
                        src={photo.src} 
                        alt={photo.alt}
                        style={{ width: '100%', height: '150px', objectFit: 'cover' }}
                      />
                      <div style={{ padding: '1rem' }}>
                        <p style={{ margin: '0 0 0.5rem 0', fontWeight: '600', fontSize: '14px' }}>{photo.alt}</p>
                        <p style={{ margin: '0 0 0.5rem 0', fontSize: '12px', color: '#666' }}>
                          {photo.category && `Category: ${photo.category}`}
                          {photo.event && ` | Event: ${photo.event}`}
                        </p>
                        <button
                          onClick={() => deletePhoto(photo.id)}
                          style={{ 
                            background: '#dc3545', 
                            color: 'white', 
                            border: 'none', 
                            padding: '0.25rem 0.5rem', 
                            borderRadius: '4px', 
                            cursor: 'pointer', 
                            fontSize: '12px',
                            width: '100%'
                          }}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;
