import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Phone, MessageCircle } from 'lucide-react';

interface NavbarProps {
  onNavClick: (sectionId: string) => void;
  onQuoteClick: () => void;
}

export default function Navbar({ onNavClick, onQuoteClick }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', id: 'home' },
    { name: 'Categories', id: 'categories' },
    { name: 'Brands', id: 'brands' },
    { name: 'About', id: 'about' },
    { name: 'Contact', id: 'contact' },
  ];

  const handleLinkClick = (id: string) => {
    setIsOpen(false);
    onNavClick(id);
  };

  return (
    <nav className="fixed top-0 inset-x-0 z-50 px-4 py-4 md:px-8">
      <div className={`max-w-7xl mx-auto transition-all duration-300 ${
        isScrolled ? 'translate-y-0' : 'translate-y-2'
      }`}>
        <div className="glassmorphism-premium rounded-full px-6 py-3 flex items-center justify-between border border-gold/25 shadow-[0_10px_35px_rgba(170,124,17,0.08)]">
          
          {/* Logo Brand Title */}
          <div 
            onClick={() => handleLinkClick('home')} 
            className="cursor-pointer flex flex-col justify-center items-start"
          >
            <span className="font-display font-bold tracking-widest text-lg md:text-xl text-gold-gradient">
              SHRI JAIN
            </span>
            <span className="text-[9px] md:text-[10px] tracking-[0.25em] text-luxury-black/70 font-sans font-medium uppercase">
              Stationery Mart
            </span>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleLinkClick(link.id)}
                className="text-luxury-black/80 hover:text-gold transition-colors font-sans text-sm font-semibold tracking-wider uppercase relative group py-1"
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-gold transition-all duration-300 group-hover:w-full" />
              </button>
            ))}
          </div>

          {/* Quick Contact & Quote Buttons */}
          <div className="hidden sm:flex items-center space-x-3">
            {/* Direct Call Button */}
            <a
              href="tel:+919414231059"
              className="flex items-center space-x-2 border border-gold/50 text-luxury-black hover:bg-gold hover:text-white hover:border-gold px-4 py-2 rounded-full font-sans text-xs font-bold tracking-wider uppercase transition-all duration-300 bg-white/45"
            >
              <Phone size={13} className="text-gold" />
              <span>Call Us</span>
            </a>

            {/* Premium WhatsApp Button */}
            <a
              href="https://wa.me/919414231059?text=Hello%20Shri%20Jain%20Stationery%20Mart,%20I'd%20like%20to%20inquire%20about%20wholesale%20stationery."
              target="_blank"
              rel="noreferrer"
              className="flex items-center space-x-2 bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-white px-4 py-2 rounded-full font-sans text-xs font-semibold tracking-wider uppercase transition-all shadow-[0_4px_15px_rgba(16,185,129,0.15)]"
            >
              <MessageCircle size={13} />
              <span>WhatsApp</span>
            </a>
          </div>

          {/* Hamburger Menu Toggle (Mobile) */}
          <div className="lg:hidden flex items-center space-x-2">
            <button
              onClick={onQuoteClick}
              className="gold-gradient-btn hover:bg-gold/80 text-black px-3 py-1.5 rounded-full font-sans text-[11px] font-bold tracking-wider uppercase transition-all sm:hidden shadow-sm"
            >
              Quote
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-luxury-black hover:text-gold transition-colors p-2 rounded-full border border-gold/20"
              aria-label="Toggle Menu"
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Expanded Mobile Navigation Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="absolute top-24 left-4 right-4 z-40 lg:hidden"
          >
            <div className="glassmorphism rounded-3xl p-6 border border-gold/30 shadow-[0_10px_35px_rgba(170,124,17,0.12)] flex flex-col space-y-4">
              <div className="flex flex-col space-y-3 pb-4 border-b border-gold/10">
                {navLinks.map((link) => (
                  <button
                    key={link.id}
                    onClick={() => handleLinkClick(link.id)}
                    className="text-left text-luxury-black/85 hover:text-gold transition-colors font-sans text-base font-semibold tracking-wide py-2"
                  >
                    {link.name}
                  </button>
                ))}
              </div>

              {/* Action Buttons inside mobile drawer */}
              <div className="flex flex-col space-y-3 pt-2">
                <a
                  href="tel:+919414231059"
                  className="flex items-center justify-center space-x-2 border border-gold/40 text-luxury-black hover:bg-gold hover:text-white py-3 rounded-xl font-sans text-sm font-semibold tracking-wider uppercase transition-all"
                >
                  <Phone size={15} className="text-gold" />
                  <span>Call +91 9414231059</span>
                </a>

                <a
                  href="https://wa.me/919414231059?text=Hello%20Shri%20Jain%20Stationery%20Mart,%20I'd%20like%20to%20inquire%20about%20wholesale%20stationery."
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center space-x-2 bg-gradient-to-r from-emerald-600 to-teal-500 text-white py-3 rounded-xl font-sans text-sm font-semibold tracking-wider uppercase transition-all"
                >
                  <MessageCircle size={15} />
                  <span>WhatsApp Contact</span>
                </a>

                <button
                  onClick={() => {
                    setIsOpen(false);
                    onQuoteClick();
                  }}
                  className="gold-gradient-btn text-black py-3 rounded-xl font-sans text-sm font-bold tracking-wider uppercase transition-all text-center shadow-sm"
                >
                  Request Wholesale Quote
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
