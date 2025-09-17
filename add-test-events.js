// Test script to add sample events to localStorage
console.log('Adding test events...');

const testEvents = [
  {
    id: '1',
    title: 'Durga Puja 2025',
    date: '2025-10-15',
    description: 'Join us for the grand celebration of Durga Puja with traditional Bengali cultural programs, delicious food, and community bonding.',
    location: 'ABHA Community Center, Harrisburg',
    category: 'festival',
    image: '/assets/images/events/durga-puja-2024.jpg',
    createdAt: new Date().toISOString()
  },
  {
    id: '2',
    title: 'Bengali New Year Celebration',
    date: '2025-04-14',
    description: 'Celebrate Poila Boishakh with cultural performances, traditional Bengali food, and folk music.',
    location: 'Community Hall',
    category: 'cultural',
    image: '/assets/images/events/Boishakhi-2024.jpg',
    createdAt: new Date().toISOString()
  },
  {
    id: '3',
    title: 'Community Meeting',
    date: '2025-09-20',
    description: 'Monthly community meeting to discuss upcoming events and community initiatives.',
    location: 'ABHA Office',
    category: 'community',
    image: '',
    createdAt: new Date().toISOString()
  }
];

// Save to the correct localStorage key
localStorage.setItem('abha_admin_events', JSON.stringify(testEvents));

console.log('Test events added:', testEvents);
console.log('Current localStorage events:', JSON.parse(localStorage.getItem('abha_admin_events') || '[]'));

// Trigger storage event to update displays
window.dispatchEvent(new Event('storage'));

alert('Test events added successfully! Check the home page and events page.');
