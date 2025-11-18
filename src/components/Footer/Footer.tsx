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
    <footer className="bg-black text-white border-t border-white/10 relative overflow-hidden">
      {/* Background decorative glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-64 bg-primary-400/5 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-3xl font-bold mb-6 text-white font-serif">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">Caroline's</span>
              <span className="text-primary-400"> Nails</span>
            </h3>
            <p className="text-gray-400 mb-8 max-w-md font-light leading-relaxed">
              {companyDescription}
            </p>

            {/* Social Links */}
            <div className="flex space-x-6">
              {socialLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-gray-400 hover:text-black hover:bg-primary-400 hover:border-primary-400 transition-all duration-300"
                  aria-label={link.name}
                >
                  <span className="text-lg">{link.icon}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6 font-serif text-primary-400">Rychlé odkazy</h4>
            <ul className="space-y-4">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-white hover:translate-x-2 transition-all duration-300 inline-block"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-6 font-serif text-primary-400">Rezervace</h4>
            <p className="text-gray-400 mb-6 font-light">
              Připraveni na změnu?
            </p>
            <div className="space-y-4 text-sm text-gray-300">
              <p className="flex items-center gap-3">
                <span className="text-primary-400">📞</span> (555) 123-4567
              </p>
              <p className="flex items-center gap-3">
                <span className="text-primary-400">📧</span> info@nailartistry.com
              </p>
              <p className="flex items-center gap-3">
                <span className="text-primary-400">📍</span> 123 Beauty St, City, ST
              </p>
            </div>
            <button className="btn-primary text-sm mt-8 w-full">
              Rezervovat termín
            </button>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-white/5">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-sm font-light">
              © {new Date().getFullYear()} {companyName}. Všechna práva vyhrazena.
            </p>
            <div className="flex space-x-8">
              <a href="#" className="text-gray-500 hover:text-primary-400 text-sm transition-colors duration-200">
                Ochrana soukromí
              </a>
              <a href="#" className="text-gray-500 hover:text-primary-400 text-sm transition-colors duration-200">
                Obchodní podmínky
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
