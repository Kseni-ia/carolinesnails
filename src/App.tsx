import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Hero from './components/Hero/Hero';
import Features from './components/Features/Features';
import Footer from './components/Footer/Footer';
import Admin from './components/Admin/Admin';
import Gallery from './components/Gallery/Gallery';
import About from './components/About/About';
import BookingSection from './components/Booking/BookingSection';
import { AdminAuthProvider } from './contexts/AdminAuthContext';
import { NavItem, Feature, HeroSection } from './types';

const App: React.FC = () => {
  // Navigation data
  const navItems: NavItem[] = [
    { label: 'Domů', href: '#home' },
    { label: 'O nás', href: '#about' },
    { label: 'Služby', href: '#services' },
    { label: 'Portfolio', href: '#portfolio' },
    { label: 'Recenze', href: '#reviews' },
  ];

  // Hero section data
  const heroData: HeroSection = {
    subtitle: 'Vítejte v luxusu',
    title: 'Luxusní nehtové umění',
    description: 'Proměňte své nehty v umělecká díla. Profesionální manikúra, gelový lak, prodlužování a vlastní nehtové umění v luxusním prostředí.',
    primaryButton: {
      text: 'Rezervovat termín',
      href: '#book',
    },
    secondaryButton: {
      text: 'Zobrazit portfolio',
      href: '#portfolio',
    },
  };

  // Services data
  const servicesData: Feature[] = [
    {
      title: 'Klasická manikúra',
      description: 'Tradiční manikúra s péčí o kutikuly, tvarováním nehtů a aplikací prémiového laku pro čistý, elegantní vzhled.',
      icon: '💅',
    },
    {
      title: 'Gelový lak',
      description: 'Dlouhotrvající aplikace gelového laku, která poskytuje bezodlupkové barvy až po 3 týdny se lesklým povrchem.',
      icon: '✨',
    },
    {
      title: 'Prodlužování nehtů',
      description: 'Profesionální prodlužování nehtů pomocí vysoce kvalitních materiálů pro vytvoření délky a tvaru, který si přejete.',
      icon: '📏',
    },
    {
      title: 'Vlastní nehtové umění',
      description: 'Jedinečné, ručně malované designy a umělecká tvorba přizpůsobená vašemu osobnímu stylu a preferencím.',
      icon: '🎨',
    },
    {
      title: 'Pedicura',
      description: 'Kompletní péče o nohy včetně ošetření kůže, nehtů a relaxační masáže pro dokonalý vzhled a pohodlí.',
      icon: '💆‍♀️',
      status: 'coming-soon',
    },
    {
      title: 'Oprava nehtů',
      description: 'Expertní opravné služby pro zlomené, prasklé nebo poškozené nehty pro obnovení jejich přirozené krásy.',
      icon: '🔧',
    },
  ];

  return (
    <Router>
      <AdminAuthProvider>
        <Routes>
          <Route path="/admin" element={<Admin />} />
          <Route path="*" element={
            <div className="min-h-screen bg-black text-white">
              <Header navItems={navItems} />
              <main>
                <Hero data={heroData} />
                <About />
                <Features
                  features={servicesData}
                  title="Služby"
                  subtitle="Profesionální péče o nehty a nehtové umění"
                />
                <Gallery />
                <BookingSection />
              </main>
              <Footer
                companyName="Nail Artistry"
                companyDescription="Proměňte své nehty v umělecká díla. Profesionální péče o nehty a vlastní designy v luxusním prostředí."
              />
            </div>
          } />
        </Routes>
      </AdminAuthProvider>
    </Router>
  );
};

export default App;
