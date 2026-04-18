import type { AdminEvent } from '../utils/adminData';

// Returns seed events based on curated Annual Events for 2025 and 2024.
// Dates use the first day of the event range when applicable (YYYY-MM-DD).
export const getAdminSeedEvents = (): Array<Omit<AdminEvent, 'id' | 'createdAt'>> => [
  // 2026
  {
    title: 'Boishakhi 2026 (Bengali New Year 1433)',
    date: '2026-05-09',
    description: 'Save the date. Let\'s sing, dance, eat, and enjoy as we welcome the Bengali New Year with delicious traditional cuisine, live music and cultural performances, community gathering and festive spirit. Cash only for Kolkata Street Food.',
    location: 'Lemoyne Community Hall, 510 Herman Avenue, Lemoyne, PA 17043',
    category: 'festival',
    image: '/assets/images/events/Boishakhi.jpg'
  },
  {
    title: 'Saraswati Puja 2026',
    date: '2026-02-08',
    description: 'ABHA is geared up to celebrate the First Event of the year - Saraswati Puja on Feb 8th.',
    location: 'Community Center, Harrisburg PA (TBC)',
    category: 'festival',
    image: 'https://res.cloudinary.com/dbudtzzfe/image/upload/v1768884838/WhatsApp_Image_2026-01-19_at_11.48.04_PM_p6xjfk.jpg',
    archived: true
  },
  // 2025
  {
    title: 'A Musical Extravaganza with Rathijit & Shreya',
    date: '2025-09-26',
    description: "ABHA's 10th Year celebration featuring renowned artists Rathijit & Shreya with musical performances.",
    location: 'Enola Fire Company, 118 Chester Rd, Enola, PA 17025',
    category: 'cultural',
    image: '/assets/images/events/a-musical-extravaganza-with-rathijit-and-shreya.jpg'
  },
  {
    title: 'Durga Puja 2025',
    date: '2025-09-27',
    description: 'Our grandest annual celebration with cultural programs and community feasts.',
    location: 'Community Center, Harrisburg PA',
    category: 'festival',
    image: '/assets/images/events/durga-puja.jpg'
  },
  {
    title: 'Annual Summer Picnic 2025',
    date: '2025-07-20',
    description: 'A fun-filled day for families with games, food, and social activities.',
    location: 'Riverside Park, Harrisburg',
    category: 'community',
    image: '/assets/images/events/summer-picnic.jpg'
  },
  {
    title: 'Boishakhi 2025 (Bengali New Year 1432)',
    date: '2025-04-15',
    description: 'Celebrated the Bengali New Year with traditional music, dance, and food.',
    location: 'ABHA Community Hall',
    category: 'festival',
    image: '/assets/images/events/Boishakhi.jpg'
  },
  {
    title: 'Saraswati Puja 2025',
    date: '2025-02-02',
    description: 'A celebration of knowledge, music, and the arts.',
    location: 'Community Center, Harrisburg PA',
    category: 'festival',
    image: '/assets/images/events/saraswati-puja.jpg'
  },
  // 2024
  {
    title: 'Durga Puja 2024',
    date: '2024-10-08',
    description: 'Our magnificent annual celebration with traditional puja and cultural programs.',
    location: 'Community Center, Harrisburg PA',
    category: 'festival',
    image: '/assets/images/events/durga-puja-2024.jpg'
  },
  {
    title: 'Summer Family Picnic 2024',
    date: '2024-07-21',
    description: 'A memorable day of outdoor fun, games, and delicious food for all families.',
    location: 'City Island Park, Harrisburg',
    category: 'community',
    image: '/assets/images/events/summer-picnic-2024.jpg'
  },
  {
    title: 'Boishakhi 2024 (Bengali New Year 1431)',
    date: '2024-04-14',
    description: 'Welcomed the Bengali New Year with traditional celebrations and joy.',
    location: 'ABHA Community Hall',
    category: 'festival',
    image: '/assets/images/events/Boishakhi-2024.jpg'
  },
  {
    title: 'Saraswati Puja 2024',
    date: '2024-02-14',
    description: 'Honored the goddess of knowledge, music, and arts with reverence.',
    location: 'Community Center, Harrisburg PA',
    category: 'festival',
    image: '/assets/images/events/saraswati-puja-2024.jpg'
  }
];
