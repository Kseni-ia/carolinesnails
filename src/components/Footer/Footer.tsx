import React from 'react';

interface FooterProps {
  companyName?: string;
  companyDescription?: string;
  socialLinks?: Array<{
    name: string;
    href: string;
    icon: string;
  }>;
  quickLinks?: Array<{
    label: string;
    href: string;
  }>;
}

const Footer: React.FC<FooterProps> = ({
  companyName = "Nail Artistry",
  companyDescription = "Transform your nails into works of art. Professional nail care and custom designs in a luxurious setting.",
  socialLinks = [
    { name: "Instagram", href: "#", icon: "📷" },
    { name: "Facebook", href: "#", icon: "📘" },
    { name: "Twitter", href: "#", icon: "🐦" },
  ],
  quickLinks = [
    { label: "About Us", href: "#" },
    { label: "Services", href: "#" },
    { label: "Portfolio", href: "#" },
    { label: "Contact", href: "#" },
  ],
}) => {
  return (
    <footer className="bg-gray-900 text-white border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-2xl font-bold mb-4 text-primary-400">
              {companyName}
            </h3>
            <p className="text-gray-300 mb-6 max-w-md">
              {companyDescription}
            </p>
            
            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  className="text-gray-400 hover:text-primary-400 transition-colors duration-200"
                  aria-label={link.name}
                >
                  <span className="text-xl">{link.icon}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-gray-300 hover:text-primary-400 transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Book Appointment</h4>
            <p className="text-gray-300 mb-4">
              Ready for your nail transformation?
            </p>
            <div className="space-y-2 text-sm text-gray-400">
              <p>📞 (555) 123-4567</p>
              <p>📧 info@nailartistry.com</p>
              <p>📍 123 Beauty St, City, ST</p>
            </div>
            <button className="btn-primary text-sm mt-4">
              Book Now
            </button>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} {companyName}. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-primary-400 text-sm transition-colors duration-200">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-400 hover:text-primary-400 text-sm transition-colors duration-200">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
