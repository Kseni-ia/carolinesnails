import React, { useState } from 'react';
import { NavItem } from '../../types';
import BookingModal from '../Booking/BookingModal';

interface HeaderProps {
  navItems: NavItem[];
  logo?: string;
}

const Header: React.FC<HeaderProps> = ({ navItems, logo = "Nail Artistry" }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-black border-b border-white/5">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 md:h-24">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <img
              src="/final.svg"
              alt="Nail Artistry Logo"
              className="h-16 md:h-20 w-auto p-2 transition-transform duration-300 hover:scale-105"
            />
          </div>

          {/* Desktop Navigation - Centered */}
          <div className="hidden md:block flex-1">
            <div className="flex items-center justify-center space-x-12">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="text-gray-300 hover:text-primary-400 px-3 py-2 text-sm font-medium tracking-widest uppercase transition-colors duration-200 relative group"
                >
                  {item.label}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary-400 transition-all duration-300 group-hover:w-full"></span>
                </a>
              ))}
            </div>
          </div>

          {/* Book Now Button - Right */}
          <div className="hidden md:block flex-shrink-0">
            <button
              onClick={() => setIsBookingOpen(true)}
              className="btn-primary text-sm px-6 py-2"
            >
              Rezervovat
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-300 hover:text-white p-2 transition-colors duration-200 relative z-50"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMenuOpen ? (
                  <path d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation - Full Screen Overlay */}
        {/* Mobile Navigation - Sidebar Drawer */}
        <div className={`md:hidden fixed inset-0 z-50 ${isMenuOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}>
          {/* Backdrop - Made more transparent as requested */}
          <div
            className={`absolute inset-0 bg-black/20 backdrop-blur-[2px] transition-opacity duration-500 ${isMenuOpen ? 'opacity-100' : 'opacity-0'}`}
            onClick={() => setIsMenuOpen(false)}
          />

          {/* Sidebar Panel - Narrower and with gradient transparency on the left side */}
          <div
            className={`absolute top-0 right-0 h-full w-[70%] max-w-sm bg-gradient-to-l from-black via-black/90 to-transparent backdrop-blur-xl border-l border-white/5 shadow-2xl transform transition-transform duration-500 cubic-bezier(0.4, 0, 0.2, 1) ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}
          >
            {/* Decorative Elements inside sidebar */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary-400/5 rounded-full blur-[80px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary-400/5 rounded-full blur-[80px] pointer-events-none" />

            <div className="flex flex-col h-full relative z-10">
              {/* Close Button */}
              <div className="flex justify-end p-6">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsMenuOpen(false);
                  }}
                  className="text-gray-400 hover:text-white p-2 transition-colors duration-200 relative z-50 cursor-pointer"
                  aria-label="Close menu"
                >
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Menu Items - Moved more to the top */}
              <div className="flex-1 flex flex-col items-center justify-start pt-2 space-y-6">
                {navItems.map((item, index) => (
                  <div
                    key={item.href}
                    className={`transform transition-all duration-500 delay-${index * 100} ${isMenuOpen ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'}`}
                  >
                    <a
                      href={item.href}
                      className="text-2xl font-serif text-white hover:text-primary-400 transition-colors duration-300 block py-2"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.label}
                    </a>
                  </div>
                ))}
                <div className={`pt-6 transform transition-all duration-500 delay-500 ${isMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                  <button
                    onClick={() => {
                      setIsMenuOpen(false);
                      setIsBookingOpen(true);
                    }}
                    className="btn-primary text-base px-8 py-2 shadow-lg shadow-primary-400/20"
                  >
                    Rezervovat
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
      />
    </header>
  );
};

export default Header;
