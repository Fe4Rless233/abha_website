/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Bengali Cultural Colors
        'bengali-red': '#DC143C',      // Traditional Sindoor red
        'bengali-gold': '#FFD700',     // Auspicious gold
        'bengali-saffron': '#FF9933',  // Marigold orange
        'bengali-green': '#228B22',    // Prosperity green
        'bengali-vermillion': '#FF4136', // Sindoor red
        'bengali-turmeric': '#FFD700',   // Haldi yellow
        'bengali-alta': '#DC143C',       // Alta red
        'bengali-shyama': '#000080',     // Krishna blue
        'bengali-basanti': '#FF9933',    // Marigold orange
        'bengali-krishnachura': '#FF6347', // Flame tree
        'bengali-kadam': '#98FB98',       // Kadam green
        'bengali-ranga': '#CD853F',       // Ranga brown
        
        // Primary brand colors
        'primary': '#001f3f',          // Deep Navy
        'primary-dark': '#001128',     // Darker Navy
        'primary-light': '#003366',    // Lighter Navy
        'secondary': '#FFD700',        // Saffron Accent
        'accent': '#FF4136',           // Energetic Red Accent
      },
      fontFamily: {
        'bengali': ['Noto Serif Bengali', 'Noto Sans Bengali', 'serif'],
        'display': ['Playfair Display', 'serif'],
        'body': ['Inter', 'sans-serif'],
      },
      backgroundImage: {
        'sunset-gradient': 'linear-gradient(135deg, #FF6B35 0%, #F7931E 50%, #FFD700 100%)',
        'river-gradient': 'linear-gradient(180deg, #87CEEB 0%, #4682B4 100%)',
        'festival-gradient': 'linear-gradient(45deg, #DC143C 0%, #FFD700 50%, #228B22 100%)',
        'durga-gradient': 'linear-gradient(135deg, #FF4136 0%, #FFD700 50%, #FF9933 100%)',
        'kali-gradient': 'linear-gradient(135deg, #000080 0%, #DC143C 50%, #FFD700 100%)',
      }
    },
  },
  plugins: [],
}
