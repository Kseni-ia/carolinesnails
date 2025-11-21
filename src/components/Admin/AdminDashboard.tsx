import React, { useState } from 'react';
import { useAdminAuth } from '../../contexts/AdminAuthContext';
import PasswordChange from './PasswordChange';
import AdminNavigation from './AdminNavigation';

interface MenuItem {
  id: string;
  label: string;
  icon: string;
}

const AdminDashboard: React.FC = () => {
  const { logout } = useAdminAuth();
  const [activeItem, setActiveItem] = useState('home');
  const [isExpanded, setIsExpanded] = useState(false);

  const menuItems: MenuItem[] = [
    { id: 'home', label: 'Dashboard', icon: '🏠' },
    { id: 'services', label: 'Služby', icon: '💅' },
    { id: 'calendar', label: 'Kalendář', icon: '📅' },
    { id: 'portfolio', label: 'Portfolio', icon: '🖼️' },
    { id: 'settings', label: 'Nastavení', icon: '⚙️' },
  ];

  const renderContent = () => {
    switch (activeItem) {
      case 'home':
        return (
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <h2 className="text-3xl font-bold text-white font-serif">Vítejte zpět, Caroline</h2>
              <div className="text-gray-400 text-sm">{new Date().toLocaleDateString('cs-CZ', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { title: 'Dnešní rezervace', desc: 'Přehled dnešních termínů', icon: '📅', count: '4' },
                { title: 'Aktivní služby', desc: 'Počet nabízených služeb', icon: '💅', count: '8' },
                { title: 'Nové recenze', desc: 'Nepřečtené recenze', icon: '⭐', count: '2' },
                { title: 'Portfolio', desc: 'Fotografií v galerii', icon: '🖼️', count: '24' },
              ].map((item, index) => (
                <div key={index} className="group bg-white/5 backdrop-blur-sm border border-white/10 p-6 rounded-2xl hover:bg-white/10 transition-all duration-300 hover:-translate-y-1 hover:shadow-gold-light cursor-pointer">
                  <div className="flex justify-between items-start mb-4">
                    <div className="w-12 h-12 rounded-xl bg-black/50 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform duration-300 border border-white/5 group-hover:border-primary-400/30">
                      {item.icon}
                    </div>
                    {item.count && (
                      <span className="text-primary-400 font-bold font-serif text-xl">{item.count}</span>
                    )}
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-white font-serif group-hover:text-primary-400 transition-colors">{item.title}</h3>
                  <p className="text-gray-400 text-sm font-light">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        );
      case 'services':
        return (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-white font-serif">Správa služeb</h2>
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-8 rounded-2xl min-h-[400px] flex items-center justify-center text-gray-400">
              <div className="text-center">
                <span className="text-4xl mb-4 block">💅</span>
                <p>Editor služeb a ceníku</p>
              </div>
            </div>
          </div>
        );
      case 'calendar':
        return (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-white font-serif">Kalendář</h2>
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-8 rounded-2xl min-h-[400px] flex items-center justify-center text-gray-400">
              <div className="text-center">
                <span className="text-4xl mb-4 block">📅</span>
                <p>Kalendář rezervací a plánování</p>
              </div>
            </div>
          </div>
        );
      case 'portfolio':
        return (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-white font-serif">Portfolio</h2>
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-8 rounded-2xl min-h-[400px] flex items-center justify-center text-gray-400">
              <div className="text-center">
                <span className="text-4xl mb-4 block">🖼️</span>
                <p>Správa galerie a fotografií</p>
              </div>
            </div>
          </div>
        );
      case 'settings':
        return (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-white font-serif">Nastavení</h2>
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-8 rounded-2xl">
              <h3 className="text-xl font-semibold mb-6 text-white font-serif border-b border-white/10 pb-4">Zabezpečení účtu</h3>
              <PasswordChange />
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Background Gradients */}
      <div className="fixed top-0 right-0 w-[500px] h-[500px] bg-primary-400/5 rounded-full blur-[100px] pointer-events-none -translate-y-1/2 translate-x-1/2" />
      <div className="fixed bottom-0 left-0 w-[500px] h-[500px] bg-primary-400/5 rounded-full blur-[100px] pointer-events-none translate-y-1/2 -translate-x-1/2" />

      {/* Logo in top left corner */}
      <div className="fixed left-8 top-8 z-40">
        <img
          src="/final.svg"
          alt="Nail Artistry Logo"
          className="h-12 w-auto drop-shadow-gold"
        />
      </div>

      {/* Expanding Sidebar */}
      <AdminNavigation
        menuItems={menuItems}
        activeItem={activeItem}
        onItemSelect={setActiveItem}
        isExpanded={isExpanded}
        onToggleExpand={() => setIsExpanded(!isExpanded)}
        onLogout={logout}
      />

      {/* Main content - Full width */}
      <div className="min-h-screen md:pl-36 pl-0 pb-24 md:pb-0 transition-all duration-300 ease-in-out">
        {/* Content */}
        <main className="p-4 md:p-8 pt-24 max-w-7xl mx-auto relative z-10">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
