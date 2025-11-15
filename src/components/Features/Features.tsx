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
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-black">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            {title}
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            {subtitle}
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-gray-900 p-8 rounded-xl border border-gray-800 hover:border-primary-400/50 transition-all duration-300 hover:transform hover:scale-105"
            >
              {/* Icon */}
              <div className="w-12 h-12 bg-primary-400/20 rounded-lg flex items-center justify-center mb-6">
                <span className="text-2xl">{feature.icon}</span>
              </div>
              
              {/* Service Content */}
              <h3 className="text-xl font-semibold text-white mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-400 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
