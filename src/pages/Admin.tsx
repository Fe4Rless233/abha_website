import React, { useState, useRef } from 'react';
import { getEvents, saveEvents, addEvent, getPhotos, savePhotos, addPhoto, AdminEvent, AdminPhoto, migrateOldData } from '../utils/adminData';
import { galleryItems } from '../data/galleryItems';
import { getAdminSeedEvents } from '../data/adminSeedEvents';

// Use the types from adminData
type Event = AdminEvent;
type Photo = AdminPhoto;

const AdminPanel: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'events' | 'photos'>('events');
  const [events, setEvents] = useState<Event[]>([]);
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  
  // Edit state
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  
  // Event form state
  const [eventForm, setEventForm] = useState({
    title: '',
    date: '',
    description: '',
    location: '',
    category: 'festival' as Event['category'],
    image: ''
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

    try {
      // Normalize input formatting
      const cleaned = {
        title: eventForm.title.trim(),
        date: eventForm.date.trim(),
        description: eventForm.description.trim(),
        location: eventForm.location.trim(),
        category: eventForm.category,
        image: eventForm.image
      };
      if (isEditing && editingEvent) {
        // Update existing event
        const updatedEvents = events.map(event => 
          event.id === editingEvent.id 
            ? { ...editingEvent, ...cleaned }
            : event
        );
        setEvents(updatedEvents);
        saveEvents(updatedEvents);
        
        // Reset edit state
        setIsEditing(false);
        setEditingEvent(null);
        alert('Event updated successfully!');
      } else {
        // Add new event
  const newEvent = addEvent(cleaned);

        setEvents([...events, newEvent]);
        alert('Event added successfully!');
      }
      
      // Reset form
      setEventForm({
        title: '',
        date: '',
        description: '',
        location: '',
        category: 'festival',
        image: ''
      });
      
      // Trigger storage event for real-time updates
      window.dispatchEvent(new Event('storage'));
      
    } catch (error) {
      console.error('Failed to save event:', error);
      alert('Failed to save event. Please try again.');
    }
  };

  const startEditEvent = (event: Event) => {
    setEditingEvent(event);
    setIsEditing(true);
    setEventForm({
      title: event.title,
      date: event.date,
      description: event.description,
      location: event.location,
      category: event.category,
      image: event.image || ''
    });
  };

  const cancelEdit = () => {
    setIsEditing(false);
    setEditingEvent(null);
    setEventForm({
      title: '',
      date: '',
      description: '',
      location: '',
      category: 'festival',
      image: ''
    });
  };

  const handleAddPhoto = () => {
    const file = fileInputRef.current?.files?.[0];
    if (!file || !photoForm.alt) {
      alert('Please select a file and provide alt text');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const newPhoto = addPhoto({
          src: e.target?.result as string,
          alt: photoForm.alt,
          category: photoForm.category,
          event: photoForm.event
        });

        setPhotos([...photos, newPhoto]);
        setPhotoForm({ alt: '', category: '', event: '' });
        
        alert('Photo added successfully!');
        
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
      } catch (error) {
        console.error('Failed to add photo:', error);
        alert('Failed to add photo. Please try again.');
      }
    };
    reader.readAsDataURL(file);
  };

  const exportData = () => {
    const data = {
      events: getEvents(),
      photos: getPhotos(),
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
      saveEvents(updatedEvents);
      
      // Trigger storage event for real-time updates
      window.dispatchEvent(new Event('storage'));
    }
  };

  const deletePhoto = (id: string) => {
    if (confirm('Are you sure you want to delete this photo?')) {
      const updatedPhotos = photos.filter(p => p.id !== id);
      setPhotos(updatedPhotos);
      savePhotos(updatedPhotos);
    }
  };

  // Load data on component mount
  React.useEffect(() => {
    // First try to migrate any old data
    const { eventsMigrated, photosMigrated } = migrateOldData();
    
    // Then load the current data
    const savedEvents = getEvents();
    const savedPhotos = getPhotos();
    
    // If no events exist, seed from curated Annual Events so admin shows data
    if (savedEvents.length === 0 && eventsMigrated === 0) {
      const seeds = getAdminSeedEvents();
      const created = seeds.map(s => addEvent(s));
      setEvents(created);
      console.log(`Seeded ${created.length} events into admin storage`);
    } else {
      setEvents(savedEvents);
    }
    
    // Load gallery photos if no photos exist
    if (savedPhotos.length === 0 && photosMigrated === 0) {
      console.log('Loading gallery images into admin panel...');
      
      // Process gallery items and add them to photos
      const galleryPhotos = galleryItems.slice(0, 200).map((item, index) => {
        // Extract event/category from the path for better organization
        let category = 'Community';
        let event = 'Gallery Collection';
        
        const pathLower = item.src.toLowerCase();
        
        if (pathLower.includes('saraswati')) {
          category = 'Festival';
          event = 'Saraswati Puja';
        } else if (pathLower.includes('durga')) {
          category = 'Festival';
          event = 'Durga Puja';
        } else if (pathLower.includes('boishakhi') || pathLower.includes('newyear')) {
          category = 'Festival';
          event = 'Boishakhi - Bengali New Year';
        } else if (pathLower.includes('picnic')) {
          category = 'Community';
          event = 'Summer Picnic';
        } else if (pathLower.includes('musical') || pathLower.includes('concert') || pathLower.includes('performance')) {
          category = 'Cultural Events';
          event = 'Musical Performances';
        } else if (pathLower.includes('dance')) {
          category = 'Cultural Events';
          event = 'Dance Performances';
        } else if (pathLower.includes('food') || pathLower.includes('feast')) {
          category = 'Community';
          event = 'Community Feasts';
        } else {
          // Use folder name as event if available
          const folderMatch = item.src.match(/\/gallery\/media\/([^\/]+)\//);
          if (folderMatch) {
            event = folderMatch[1].replace(/[_-]/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
          }
        }
        
        return {
          src: item.src,
          alt: `Community Photo - ${event} (${index + 1})`,
          category,
          event
        };
      });
      
      // Add gallery photos to admin panel
      const createdPhotos = galleryPhotos.map(photo => addPhoto(photo));
      setPhotos(createdPhotos);
      console.log(`Added ${createdPhotos.length} gallery photos to admin panel`);
    } else {
      setPhotos(savedPhotos);
    }
    
    if (eventsMigrated > 0 || photosMigrated > 0) {
      console.log(`Migration complete: ${eventsMigrated} events, ${photosMigrated} photos`);
    }
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
              <h3 style={{ marginTop: 0, marginBottom: '1.5rem', color: '#7a1b1b' }}>
                {isEditing ? 'Edit Event' : 'Add New Event'}
              </h3>
              
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

              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>Description</label>
                <textarea
                  value={eventForm.description}
                  onChange={(e) => setEventForm({...eventForm, description: e.target.value})}
                  style={{ width: '100%', padding: '0.75rem', border: '1px solid #ddd', borderRadius: '6px', minHeight: '100px', resize: 'vertical' }}
                  placeholder="Event description..."
                />
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>Event Image (Optional)</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onload = (event) => {
                        setEventForm({...eventForm, image: event.target?.result as string});
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                  style={{ width: '100%', padding: '0.75rem', border: '1px solid #ddd', borderRadius: '6px' }}
                />
                {eventForm.image && (
                  <div style={{ marginTop: '0.5rem' }}>
                    <img 
                      src={eventForm.image} 
                      alt="Preview" 
                      style={{ width: '100%', maxHeight: '120px', objectFit: 'cover', borderRadius: '6px' }}
                    />
                  </div>
                )}
              </div>

              <div style={{ display: 'flex', gap: '1rem' }}>
                <button
                  onClick={handleAddEvent}
                  style={{
                    flex: 1,
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
                  {isEditing ? 'Update Event' : 'Add Event'}
                </button>
                {isEditing && (
                  <button
                    onClick={cancelEdit}
                    style={{
                      flex: 1,
                      padding: '0.75rem',
                      background: '#6c757d',
                      color: 'white',
                      border: 'none',
                      borderRadius: '6px',
                      fontSize: '16px',
                      fontWeight: '600',
                      cursor: 'pointer'
                    }}
                  >
                    Cancel
                  </button>
                )}
              </div>
            </div>

            {/* Events List */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', marginBottom: '1rem' }}>
                <h3 style={{ margin: 0, color: '#7a1b1b' }}>Current Events</h3>
                <div>
                  <label style={{ marginRight: '.5rem', fontSize: '0.9rem' }}>Sort</label>
                  <select
                    onChange={(e) => {
                      const val = e.target.value;
                      const sorted = [...events].sort((a, b) => {
                        const ta = new Date(a.date).getTime();
                        const tb = new Date(b.date).getTime();
                        return val === 'newest' ? tb - ta : ta - tb;
                      });
                      setEvents(sorted);
                    }}
                    defaultValue="newest"
                    style={{ padding: '0.4rem 0.6rem', border: '1px solid #ddd', borderRadius: '6px' }}
                  >
                    <option value="newest">Newest first</option>
                    <option value="oldest">Oldest first</option>
                  </select>
                </div>
              </div>
              {events.length === 0 ? (
                <p style={{ color: '#666', fontStyle: 'italic' }}>No events added yet.</p>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {events.map((event) => (
                    <div key={event.id} style={{ background: 'white', padding: '1.5rem', borderRadius: '8px', border: '1px solid #ddd' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                        <h4 style={{ margin: 0, color: '#7a1b1b' }}>{event.title}</h4>
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                          <button
                            onClick={() => startEditEvent(event)}
                            style={{ background: '#28a745', color: 'white', border: 'none', padding: '0.25rem 0.5rem', borderRadius: '4px', cursor: 'pointer', fontSize: '12px' }}
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => deleteEvent(event.id)}
                            style={{ background: '#dc3545', color: 'white', border: 'none', padding: '0.25rem 0.5rem', borderRadius: '4px', cursor: 'pointer', fontSize: '12px' }}
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                      <p style={{ margin: '0.5rem 0', color: '#666' }}>
                        <strong>Date:</strong> {new Date(event.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: '2-digit' })} | 
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
