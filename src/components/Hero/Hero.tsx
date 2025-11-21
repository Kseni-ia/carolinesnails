import React, { useState } from 'react';
import { HeroSection } from '../../types';
import BookingModal from '../Booking/BookingModal';

interface HeroProps {
  data: HeroSection;
}

const Hero: React.FC<HeroProps> = ({ data }) => {
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  return (
    <section id="home" className="relative h-[100svh] flex items-center px-4 sm:px-6 lg:px-8 overflow-hidden pt-20 md:pt-0">
      {/* Background Image with Smart Overlay */}
      <div className="absolute inset-0 z-0">
        {/* Mobile Background */}
        <img
          src="/IMG_3777.png"
          alt="Nail Artistry Background"
          className="w-full h-full object-cover md:hidden"
        />
        {/* Desktop Background */}
        <img
          src="/test1.jpg"
          alt="Nail Artistry Background"
          className="w-full h-full object-cover hidden md:block"
        />
        {/* Heavy gradient from left to ensure text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent" />
        {/* Additional bottom gradient for smooth transition to next section */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent" />
      </div>

      {/* Content - Aligned Left */}
      <div className="relative z-10 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="text-left space-y-6 md:space-y-8">
          {/* Decorative Line */}
          <div className="w-20 h-1 bg-primary-400 rounded-full animate-[width_1s_ease-out]" />

          {/* Subtitle */}
          <p className="text-primary-400 font-serif italic text-xl md:text-2xl tracking-widest uppercase animate-[fadeIn_1s_ease-out]">
            {data.subtitle}
          </p>

          {/* Main Title - Using Text instead of Image for cleanliness */}
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-white font-serif leading-tight animate-[fadeIn_1s_ease-out_0.3s_both]">
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">
              Caroline's
            </span>
            <span className="block text-primary-400">
              Nails
            </span>
          </h1>

          {/* Description */}
          <p className="text-lg md:text-xl text-gray-300 max-w-xl leading-relaxed font-light tracking-wide animate-[fadeIn_1s_ease-out_0.6s_both]">
            {data.description}
          </p>

          {/* Button Group */}
          <div className="flex flex-col sm:flex-row gap-6 pt-4 animate-[fadeIn_1s_ease-out_0.9s_both]">
            <button
              onClick={() => setIsBookingOpen(true)}
              className="btn-primary text-lg min-w-[180px] text-center"
            >
              {data.primaryButton.text}
            </button>
            <a
              href={data.secondaryButton.href}
              className="btn-secondary text-lg min-w-[180px] text-center"
            >
              {data.secondaryButton.text}
            </a>
          </div>
        </div>

        {/* Right side - Could be empty or have a floating glass card with details/hours */}
        <div className="hidden lg:block relative">
          {/* We leave this empty to let the background image shine on the right side, 
               or we could add a floating 'Latest Work' card here later */}
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce text-white/30">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>

      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
      />
    </section>
  );
};

export default Hero;
