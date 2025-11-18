import React, { useState } from 'react';
import { NavItem } from '../../types';

interface HeaderProps {
  navItems: NavItem[];
  logo?: string;
}

const Header: React.FC<HeaderProps> = ({ navItems, logo = "Nail Artistry" }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-black/50 backdrop-blur-md border-b border-white/5">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <img
              src="/final.svg"
              alt="Nail Artistry Logo"
              className="h-32 w-auto p-2 transition-transform duration-300 hover:scale-105"
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
            <a
              href="#book"
              className="btn-primary text-sm px-6 py-2"
            >
              Rezervovat
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-300 hover:text-white p-2 transition-colors duration-200"
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

        {/* Mobile Navigation - Right Sidebar Overlay */}
        {isMenuOpen && (
          <>
            {/* Backdrop */}
            <div className="md:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity duration-300" onClick={() => setIsMenuOpen(false)}></div>

            {/* Sidebar */}
            <div className="md:hidden fixed right-0 top-0 h-full w-80 z-50 transform transition-transform duration-300 ease-in-out bg-black/95 border-l border-white/10">
              <div className="flex flex-col h-full">
                {/* Close button - connected to header */}
                <div className="flex justify-end p-6">
                  <button
                    onClick={() => setIsMenuOpen(false)}
                    className="text-gray-300 hover:text-white p-2 transition-colors duration-200"
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
                      <path d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                {/* Navigation links with dark background */}
                <div className="flex-1 px-8 py-4 space-y-4">
                  {navItems.map((item) => (
                    <a
                      key={item.href}
                      href={item.href}
                      className="text-gray-300 hover:text-primary-400 block px-4 py-3 text-lg font-medium tracking-wide uppercase transition-all duration-200 border-b border-white/5 hover:border-primary-400/30 hover:pl-6"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.label}
                    </a>
                  ))}
                  <a
                    href="#book"
                    className="btn-primary block text-center mt-8 w-full"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Rezervovat
                  </a>
                </div>
              </div>
            </div>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
