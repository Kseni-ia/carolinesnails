import React from 'react';
import { HeroSection } from '../../types';

interface HeroProps {
  data: HeroSection;
}

const Hero: React.FC<HeroProps> = ({ data }) => {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <div className="w-full h-full bg-gradient-to-b from-black/60 via-black/40 to-black flex items-center justify-center">
          <div className="w-full h-full bg-black/50 absolute inset-0"></div>
          <img 
            src="https://images.unsplash.com/photo-1610992015732-2449b76364fc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
            alt="Nail Artistry Background"
            className="w-full h-full object-cover opacity-30"
          />
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto text-center">
        {/* Subtitle */}
        <p className="text-primary-400 font-semibold text-lg mb-6 tracking-wide">
          {data.subtitle}
        </p>
        
        {/* Main Title with "Artistry" in yellow */}
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-8 leading-tight">
          {data.title.split(' ').map((word, index) => (
            <span key={index} className={word === 'Artistry' ? 'text-primary-400' : ''}>
              {word}{' '}
            </span>
          ))}
        </h1>
        
        {/* Description */}
        <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
          {data.description}
        </p>
        
        {/* Button Group */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <a
            href={data.primaryButton.href}
            className="btn-primary text-lg shadow-lg hover:shadow-primary-400/25 transition-all duration-300"
          >
            {data.primaryButton.text}
          </a>
          <a
            href={data.secondaryButton.href}
            className="btn-secondary text-lg hover:shadow-lg transition-all duration-300"
          >
            {data.secondaryButton.text}
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
