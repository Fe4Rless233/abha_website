// React import removed - using new JSX transform

function Header() {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <h1 className="text-2xl font-bold text-primary tracking-tight">
                🌟 ABHA ✨
              </h1>
              <p className="text-xs text-gray-600 -mt-1">
                🎭 Bangladesh Heritage 🎪
              </p>
            </div>
          </div>
          
          <nav className="hidden md:flex space-x-8">
            <a 
              href="/" 
              className="text-gray-700 hover:text-primary transition-colors duration-200 font-medium"
            >
              🏠 Home
            </a>
            <a 
              href="/events" 
              className="text-gray-700 hover:text-primary transition-colors duration-200 font-medium"
            >
              🎪 Events
            </a>
            <a 
              href="/gallery" 
              className="text-gray-700 hover:text-primary transition-colors duration-200 font-medium"
            >
              📸 Gallery
            </a>
            <a 
              href="/magazine" 
              className="text-gray-700 hover:text-primary transition-colors duration-200 font-medium"
            >
              📖 Magazine
            </a>
            <a 
              href="/about" 
              className="text-gray-700 hover:text-primary transition-colors duration-200 font-medium"
            >
              ℹ️ About
            </a>
            <a 
              href="/contact" 
              className="text-gray-700 hover:text-primary transition-colors duration-200 font-medium"
            >
              📞 Contact
            </a>
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              type="button"
              className="text-gray-700 hover:text-primary transition-colors duration-200"
              aria-label="Toggle menu"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
