import React, { useState } from 'react';

interface MenuItem {
  id: string;
  label: string;
  icon: string;
}

interface AdminNavigationProps {
  menuItems: MenuItem[];
  activeItem: string;
  onItemSelect: (itemId: string) => void;
  isExpanded: boolean;
  onToggleExpand: () => void;
  onLogout: () => void;
}

const AdminNavigation: React.FC<AdminNavigationProps> = ({
  menuItems,
  activeItem,
  onItemSelect,
  isExpanded,
  onToggleExpand,
  onLogout,
}) => {
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);

  const handleMobileItemSelect = (id: string) => {
    onItemSelect(id);
    setIsMobileDrawerOpen(false);
  };

  const bottomNavItems = menuItems.filter(item => ['home', 'calendar'].includes(item.id));
  const drawerItems = menuItems.filter(item => !['home', 'calendar'].includes(item.id));

  return (
    <>
      {/* DESKTOP SIDEBAR */}
      <div className="hidden md:block fixed left-8 top-24 bottom-8 z-30">
        <div className={`${isExpanded ? 'w-64 px-4' : 'w-20'} h-full flex flex-col bg-black/80 backdrop-blur-xl rounded-2xl border border-white/10 transition-all duration-300 ease-in-out shadow-[0_0_30px_rgba(0,0,0,0.5)]`}>
          {/* Arrow toggle button */}
          <div className="flex justify-center p-4 border-b border-white/5 mb-2">
            <button
              onClick={onToggleExpand}
              className="w-10 h-10 flex items-center justify-center bg-white/5 rounded-xl hover:bg-primary-400/20 hover:text-primary-400 transition-all duration-300 border border-white/5 hover:border-primary-400/30"
            >
              <svg
                className={`w-5 h-5 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Menu items */}
          <nav className={`${isExpanded ? 'px-2 pb-6' : 'px-2 pb-4'} space-y-3 pt-4 flex-1`}>
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onItemSelect(item.id)}
                className={`w-full h-12 flex items-center ${isExpanded ? 'justify-start px-4' : 'justify-center'} ${!isExpanded ? 'text-center' : ''} rounded-xl transition-all duration-300 group relative overflow-hidden ${activeItem === item.id
                  ? 'bg-primary-400 text-black font-semibold shadow-gold'
                  : 'text-gray-400 hover:text-white hover:bg-white/10'
                  }`}
                title={item.label}
              >
                <div className={`inline-flex items-center justify-center transition-transform duration-300 ${activeItem === item.id ? 'scale-110' : 'group-hover:scale-110'}`}>
                  <span className="text-xl leading-none">{item.icon}</span>
                </div>
                <span className={`font-medium tracking-wide transition-all duration-300 whitespace-nowrap ${isExpanded ? 'ml-4 opacity-100 w-auto translate-x-0' : 'opacity-0 w-0 -translate-x-4 overflow-hidden'}`}>
                  {item.label}
                </span>

                {/* Active Indicator for collapsed state */}
                {!isExpanded && activeItem === item.id && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-black/20 rounded-r-full" />
                )}
              </button>
            ))}
          </nav>

          {/* Logout */}
          <div className={`${isExpanded ? 'px-2 pb-6 pt-4 border-t border-white/5' : 'px-2 pb-4 pt-2'} `}>
            <button
              onClick={onLogout}
              className={`w-full h-12 flex items-center ${isExpanded ? 'justify-start px-4' : 'justify-center'} text-gray-400 hover:text-red-400 hover:bg-red-400/10 rounded-xl transition-all duration-300 group border border-transparent hover:border-red-400/20`}
              title="Odhlásit se"
            >
              <div className="inline-flex items-center justify-center group-hover:-translate-x-1 transition-transform duration-300">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
              </div>
              <span className={`font-medium transition-all duration-300 whitespace-nowrap ${isExpanded ? 'ml-4 opacity-100 w-auto' : 'opacity-0 w-0 overflow-hidden'}`}>
                Odhlásit se
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE BOTTOM NAVIGATION */}
      <div className="md:hidden fixed bottom-0 left-0 w-full z-50 px-4 pb-6 pt-2 bg-gradient-to-t from-black via-black/95 to-transparent pointer-events-none">
        <div className="pointer-events-auto bg-white/10 backdrop-blur-xl rounded-2xl border border-white/10 shadow-[0_0_30px_rgba(0,0,0,0.5)] flex justify-between items-center p-2 px-4">
          {bottomNavItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleMobileItemSelect(item.id)}
              className={`flex flex-col items-center justify-center w-12 h-12 rounded-xl transition-all duration-300 ${activeItem === item.id
                ? 'bg-primary-400 text-black shadow-gold-sm'
                : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
            >
              <span className="text-xl mb-0.5">{item.icon}</span>
            </button>
          ))}

          {/* More / Menu Button */}
          <button
            onClick={() => setIsMobileDrawerOpen(true)}
            className={`flex flex-col items-center justify-center w-12 h-12 rounded-xl transition-all duration-300 ${isMobileDrawerOpen
              ? 'bg-white/20 text-white'
              : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      {/* MOBILE RIGHT DRAWER */}
      {/* Backdrop */}
      <div
        className={`md:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-50 transition-opacity duration-300 ${isMobileDrawerOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
          }`}
        onClick={() => setIsMobileDrawerOpen(false)}
      />

      {/* Drawer Panel */}
      <div
        className={`md:hidden fixed inset-y-0 right-0 w-72 bg-[#0a0a0a] border-l border-white/10 z-50 transform transition-transform duration-300 ease-out flex flex-col ${isMobileDrawerOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
      >
        <div className="p-6 border-b border-white/5 flex justify-between items-center">
          <h3 className="text-xl font-serif font-bold text-white">Menu</h3>
          <button
            onClick={() => setIsMobileDrawerOpen(false)}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="flex-1 p-4 space-y-2 overflow-y-auto">
          {/* Drawer Items (Settings, etc.) */}
          {drawerItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleMobileItemSelect(item.id)}
              className={`w-full flex items-center p-4 rounded-xl transition-all duration-300 ${activeItem === item.id
                ? 'bg-primary-400 text-black font-semibold'
                : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
            >
              <span className="text-2xl mr-4">{item.icon}</span>
              <span className="text-lg">{item.label}</span>
            </button>
          ))}
        </div>

        <div className="p-4 border-t border-white/5">
          <button
            onClick={onLogout}
            className="w-full flex items-center justify-center p-4 rounded-xl text-red-400 hover:bg-red-400/10 border border-red-400/20 hover:border-red-400/40 transition-all duration-300"
          >
            <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            <span className="font-medium">Odhlásit se</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default AdminNavigation;
