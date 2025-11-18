import React from 'react';

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
  return (
    <div className="fixed left-8 top-24 z-30">
      <div className={`${isExpanded ? 'w-64 px-4' : 'w-20'} bg-black/80 backdrop-blur-xl rounded-2xl border border-white/10 transition-all duration-300 ease-in-out shadow-[0_0_30px_rgba(0,0,0,0.5)]`}>
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
        <nav className={`${isExpanded ? 'px-2 pb-6' : 'px-2 pb-4'} space-y-3 pt-4`}>
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onItemSelect(item.id)}
              className={`w-full h-12 flex items-center ${isExpanded ? 'justify-start px-4' : 'justify-center'} ${!isExpanded ? 'text-center' : ''} rounded-xl transition-all duration-300 group relative overflow-hidden ${activeItem === item.id
                ? 'bg-primary-400 text-black font-semibold shadow-[0_0_20px_rgba(212,175,55,0.3)]'
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
  );
};

export default AdminNavigation;
