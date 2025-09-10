// Data types for admin panel
export interface AdminEvent {
  id: string;
  title: string;
  date: string;
  description: string;
  location: string;
  image?: string;
  category: 'festival' | 'cultural' | 'community' | 'other';
  createdAt: string;
}

export interface AdminPhoto {
  id: string;
  src: string;
  alt: string;
  category: string;
  event: string;
  uploadDate: string;
}

// Local storage keys
const EVENTS_KEY = 'abha_admin_events';
const PHOTOS_KEY = 'abha_admin_photos';

// Events management
export const getEvents = (): AdminEvent[] => {
  try {
    const stored = localStorage.getItem(EVENTS_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

export const saveEvents = (events: AdminEvent[]): void => {
  try {
    localStorage.setItem(EVENTS_KEY, JSON.stringify(events));
  } catch (error) {
    console.error('Failed to save events:', error);
  }
};

export const addEvent = (event: Omit<AdminEvent, 'id' | 'createdAt'>): AdminEvent => {
  const newEvent: AdminEvent = {
    ...event,
    id: Date.now().toString(),
    createdAt: new Date().toISOString()
  };
  
  const events = getEvents();
  const updatedEvents = [...events, newEvent];
  saveEvents(updatedEvents);
  
  return newEvent;
};

export const deleteEvent = (id: string): void => {
  const events = getEvents();
  const updatedEvents = events.filter(e => e.id !== id);
  saveEvents(updatedEvents);
};

// Photos management
export const getPhotos = (): AdminPhoto[] => {
  try {
    const stored = localStorage.getItem(PHOTOS_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

export const savePhotos = (photos: AdminPhoto[]): void => {
  try {
    localStorage.setItem(PHOTOS_KEY, JSON.stringify(photos));
  } catch (error) {
    console.error('Failed to save photos:', error);
  }
};

export const addPhoto = (photo: Omit<AdminPhoto, 'id' | 'uploadDate'>): AdminPhoto => {
  const newPhoto: AdminPhoto = {
    ...photo,
    id: Date.now().toString(),
    uploadDate: new Date().toISOString()
  };
  
  const photos = getPhotos();
  const updatedPhotos = [...photos, newPhoto];
  savePhotos(updatedPhotos);
  
  return newPhoto;
};

export const deletePhoto = (id: string): void => {
  const photos = getPhotos();
  const updatedPhotos = photos.filter(p => p.id !== id);
  savePhotos(updatedPhotos);
};

// Export all data
export const exportAllData = () => {
  const data = {
    events: getEvents(),
    photos: getPhotos(),
    exportDate: new Date().toISOString(),
    version: '1.0'
  };
  
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `abha_admin_data_${new Date().toISOString().split('T')[0]}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

// Import data
export const importData = (jsonData: string): { success: boolean; message: string } => {
  try {
    const data = JSON.parse(jsonData);
    
    if (data.events && Array.isArray(data.events)) {
      saveEvents(data.events);
    }
    
    if (data.photos && Array.isArray(data.photos)) {
      savePhotos(data.photos);
    }
    
    return { success: true, message: 'Data imported successfully!' };
  } catch (error) {
    return { success: false, message: 'Failed to import data. Please check the file format.' };
  }
};

// Clear all data (with confirmation)
export const clearAllData = (): void => {
  if (confirm('Are you sure you want to delete ALL events and photos? This cannot be undone.')) {
    localStorage.removeItem(EVENTS_KEY);
    localStorage.removeItem(PHOTOS_KEY);
  }
};
