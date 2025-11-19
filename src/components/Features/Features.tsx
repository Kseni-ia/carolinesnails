import React from 'react';
import { Feature } from '../../types';

interface FeaturesProps {
  features: Feature[];
  title?: string;
  subtitle?: string;
}

const Features: React.FC<FeaturesProps> = ({
  features,
  title = "Our Services",
  subtitle = "Professional nail care and artistry services"
}) => {
  return (
    <section id="services" className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-black relative overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute top-1/4 left-0 w-full h-1/2 bg-gradient-radial from-primary-900/10 to-transparent opacity-30 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-20">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6 font-serif">
            {title}
          </h2>
          <div className="w-24 h-1 bg-primary-400 mx-auto mb-8 rounded-full" />
          <p className="text-xl text-gray-400 max-w-2xl mx-auto font-light tracking-wide">
            {subtitle}
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`group p-8 rounded-2xl border border-white/5 bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-all duration-500 hover:-translate-y-2 ${feature.status === 'coming-soon' ? 'border-primary-400/30' : ''
                }`}
            >
              <div className="flex flex-col h-full">
                {/* Icon Header */}
                <div className="flex justify-between items-start mb-6">
                  <div className={`w-14 h-14 rounded-xl flex items-center justify-center text-3xl bg-black/50 border border-white/10 group-hover:border-primary-400/50 group-hover:text-primary-400 transition-colors duration-300`}>
                    {feature.icon}
                  </div>
                  {feature.status === 'coming-soon' && (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary-400/20 text-primary-300 border border-primary-400/20">
                      NOVINKA
                    </span>
                  )}
                </div>

                {/* Content */}
                <h3 className="text-2xl font-semibold text-white mb-4 font-serif group-hover:text-primary-400 transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-gray-400 leading-relaxed mb-6 flex-grow font-light">
                  {feature.description}
                </p>

                {/* Learn More Link (Optional) */}
                <div className="pt-4 border-t border-white/5">
                  <span className="text-sm text-primary-400/80 group-hover:text-primary-400 uppercase tracking-widest font-medium flex items-center gap-2">
                    Více info
                    <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
