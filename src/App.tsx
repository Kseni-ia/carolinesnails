import React from 'react';
import Header from './components/Header/Header';
import Hero from './components/Hero/Hero';
import Features from './components/Features/Features';
import Footer from './components/Footer/Footer';
import { NavItem, Feature, HeroSection } from './types';

const App: React.FC = () => {
  // Navigation data
  const navItems: NavItem[] = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Services', href: '#services' },
    { label: 'Portfolio', href: '#portfolio' },
    { label: 'Reviews', href: '#reviews' },
  ];

  // Hero section data
  const heroData: HeroSection = {
    subtitle: 'Welcome to Luxury',
    title: 'Luxury Nail Artistry',
    description: 'Transform your nails into works of art. Professional manicure, gel polish, extensions, and custom nail art in a luxurious setting.',
    primaryButton: {
      text: 'Book Appointment',
      href: '#book',
    },
    secondaryButton: {
      text: 'View Portfolio',
      href: '#portfolio',
    },
  };

  // Services data
  const servicesData: Feature[] = [
    {
      title: 'Classic Manicure',
      description: 'Traditional manicure with cuticle care, nail shaping, and premium polish application for a clean, elegant look.',
      icon: '💅',
    },
    {
      title: 'Gel Polish',
      description: 'Long-lasting gel polish application that provides chip-free color for up to 3 weeks with a glossy finish.',
      icon: '✨',
    },
    {
      title: 'Nail Extensions',
      description: 'Professional nail extensions using high-quality materials to create the length and shape you desire.',
      icon: '📏',
    },
    {
      title: 'Custom Nail Art',
      description: 'Unique, hand-painted designs and artistic creations tailored to your personal style and preferences.',
      icon: '🎨',
    },
    {
      title: 'Spa Pedicure',
      description: 'Luxurious foot treatment with exfoliation, massage, and perfect polish application for complete pampering.',
      icon: '🦶',
    },
    {
      title: 'Nail Repair',
      description: 'Expert repair services for broken, cracked, or damaged nails to restore their natural beauty.',
      icon: '🔧',
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      <Header navItems={navItems} />
      <main>
        <Hero data={heroData} />
        <Features 
          features={servicesData}
          title="Our Services"
          subtitle="Professional nail care and artistry services"
        />
      </main>
      <Footer 
        companyName="Nail Artistry"
        companyDescription="Transform your nails into works of art. Professional nail care and custom designs in a luxurious setting."
      />
    </div>
  );
};

export default App;
